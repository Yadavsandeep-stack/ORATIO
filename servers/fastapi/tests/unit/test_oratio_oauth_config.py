from utils.get_env import (
    DEFAULT_oratio_OAUTH_ISSUER,
    get_oratio_oauth_issuer,
)


def test_issuer_is_built_in():
    assert get_oratio_oauth_issuer() == DEFAULT_oratio_OAUTH_ISSUER
