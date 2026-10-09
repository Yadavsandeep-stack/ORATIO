import asyncio

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from models.sql.oratio_cloud_provider import oratioCloudProvider
from services import oratio_cloud


def test_oratio_jwt_is_encrypted_and_used_server_side(monkeypatch, tmp_path):
    monkeypatch.setenv("USER_CONFIG_PATH", str(tmp_path / "userConfig.json"))
    engine = create_async_engine(f"sqlite+aiosqlite:///{tmp_path / 'cloud.db'}")
    session_maker = async_sessionmaker(engine, expire_on_commit=False)
    requests: list[tuple[str, str, dict]] = []

    class FakeAsyncClient:
        def __init__(self, **_kwargs):
            self.closed = False

        def build_request(self, method, url, **kwargs):
            return httpx.Request(method, url, **kwargs)

        async def send(self, request, *, stream):
            requests.append(
                (
                    request.method,
                    str(request.url),
                    {
                        "headers": request.headers,
                        "content": request.content,
                        "stream": stream,
                    },
                )
            )
            assert request.headers["Authorization"] == "Bearer user.jwt.signature"
            return httpx.Response(
                200,
                json={"presentation_id": "cloud-id"},
                request=request,
            )

        async def aclose(self):
            self.closed = True

    monkeypatch.setattr(oratio_cloud.httpx, "AsyncClient", FakeAsyncClient)

    async def run():
        async with engine.begin() as connection:
            await connection.run_sync(oratioCloudProvider.__table__.create)

        async with session_maker() as session:
            await oratio_cloud.store_oratio_credentials(
                session,
                issuer="https://accounts.oratio.test",
                subject="cloud-user",
                email="cloud@example.com",
                access_token="user.jwt.signature",
                expires_in=3600,
            )

            stored = await session.scalar(select(oratioCloudProvider))
            assert stored.subject == "cloud-user"
            assert stored.email == "cloud@example.com"
            assert stored.access_token_encrypted != "user.jwt.signature"

            client, response = await oratio_cloud.open_oratio_cloud_response(
                session,
                issuer="https://accounts.oratio.test",
                method="POST",
                path="/api/v1/ppt/presentation/create",
                query_string="mode=smart",
                headers={"Content-Type": "application/json"},
                content=b'{"content":"Test cloud generation"}',
            )
            assert response.status_code == 200
            assert await response.aread() == b'{"presentation_id":"cloud-id"}'
            await response.aclose()
            await client.aclose()

        await engine.dispose()

    asyncio.run(run())
    assert [request[1] for request in requests] == [
        "https://accounts.oratio.test/api/v1/ppt/presentation/create?mode=smart",
    ]
    assert requests[0][2]["content"] == b'{"content":"Test cloud generation"}'
    assert requests[0][2]["stream"] is True
