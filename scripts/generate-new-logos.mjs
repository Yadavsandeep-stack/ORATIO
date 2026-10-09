import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Sleek Icon Only SVG (Square / Squircle)
const createIconSvg = (size = 1024, hasDarkBg = false, isCircle = false) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024" fill="none">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F0C20" />
      <stop offset="50%" stop-color="#181336" />
      <stop offset="100%" stop-color="#090714" />
    </linearGradient>
    
    <linearGradient id="glowRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#EC4899" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.8" />
    </linearGradient>

    <!-- Slide 1 (Back Deck) -->
    <linearGradient id="slideBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#312E81" />
    </linearGradient>

    <!-- Slide 2 (Middle Deck) -->
    <linearGradient id="slideMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#6366F1" />
    </linearGradient>

    <!-- Slide 3 (Front Hero Deck) -->
    <linearGradient id="slideFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="45%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>

    <!-- Sparkle / Star Gradient -->
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#F43F5E" />
    </linearGradient>

    <!-- Chart Accent Gradient -->
    <linearGradient id="chartGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="chartGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#F472B6" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#F472B6" />
    </linearGradient>
    <linearGradient id="chartGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FBBF24" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>

    <!-- Filters -->
    <filter id="shadowBack" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.45" />
    </filter>
    <filter id="shadowFront" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="30" flood-color="#050314" flood-opacity="0.55" />
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#3B82F6" flood-opacity="0.3" />
    </filter>
    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="28" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  ${hasDarkBg ? `
  <!-- Squircle / Rounded Background -->
  ${isCircle 
    ? `<circle cx="512" cy="512" r="480" fill="url(#bgGrad)" stroke="url(#glowRing)" stroke-width="8" />`
    : `<rect x="32" y="32" width="960" height="960" rx="224" fill="url(#bgGrad)" stroke="url(#glowRing)" stroke-width="8" />`
  }
  <!-- Ambient Inner Glow -->
  <circle cx="512" cy="480" r="320" fill="#7C3AED" opacity="0.25" filter="url(#neonGlow)" />
  <circle cx="680" cy="340" r="180" fill="#06B6D4" opacity="0.2" filter="url(#neonGlow)" />
  ` : `
  <!-- Ambient Glow for transparent canvas -->
  <circle cx="512" cy="512" r="360" fill="#6366F1" opacity="0.22" filter="url(#neonGlow)" />
  `}

  <!-- DECK 1: Back Slide (Isometric Shift Left-Up) -->
  <g transform="translate(190, 200) rotate(-7 260 170)" filter="url(#shadowBack)">
    <rect x="0" y="0" width="460" height="290" rx="36" fill="url(#slideBackGrad)" stroke="#818CF8" stroke-width="3" stroke-opacity="0.6" />
    <!-- Slide Header Line -->
    <rect x="36" y="36" width="140" height="18" rx="9" fill="#C7D2FE" fill-opacity="0.4" />
    <!-- Slide Content Skeleton -->
    <rect x="36" y="76" width="220" height="12" rx="6" fill="#C7D2FE" fill-opacity="0.2" />
    <rect x="36" y="100" width="180" height="12" rx="6" fill="#C7D2FE" fill-opacity="0.2" />
  </g>

  <!-- DECK 2: Middle Slide (Connecting Transition) -->
  <g transform="translate(260, 260) rotate(-2 260 170)" filter="url(#shadowBack)">
    <rect x="0" y="0" width="470" height="300" rx="38" fill="url(#slideMidGrad)" stroke="#C084FC" stroke-width="3.5" stroke-opacity="0.7" />
    <rect x="40" y="40" width="160" height="20" rx="10" fill="#F3E8FF" fill-opacity="0.4" />
    <rect x="40" y="82" width="240" height="14" rx="7" fill="#F3E8FF" fill-opacity="0.2" />
    <rect x="40" y="108" width="190" height="14" rx="7" fill="#F3E8FF" fill-opacity="0.2" />
    <!-- Mini Metric Badge -->
    <rect x="310" y="40" width="110" height="80" rx="18" fill="#581C87" fill-opacity="0.4" stroke="#D8B4FE" stroke-width="2" stroke-opacity="0.4" />
  </g>

  <!-- DECK 3: Front Hero Slide (Vibrant, Glossy Glassmorphic Showcase) -->
  <g transform="translate(310, 340) rotate(5 270 180)" filter="url(#shadowFront)">
    <!-- Main Slide Body -->
    <rect x="0" y="0" width="510" height="330" rx="44" fill="url(#slideFrontGrad)" stroke="#A5F3FC" stroke-width="4.5" />
    
    <!-- Top Glass Gloss Sheen -->
    <path d="M 0 44 C 0 19.7 19.7 0 44 0 L 466 0 C 490.3 0 510 19.7 510 44 L 510 110 C 360 140 160 80 0 170 Z" fill="#FFFFFF" fill-opacity="0.22" />

    <!-- Slide Title Bar -->
    <rect x="44" y="44" width="200" height="26" rx="13" fill="#FFFFFF" fill-opacity="0.95" />
    
    <!-- Slide Subtitle -->
    <rect x="44" y="90" width="150" height="14" rx="7" fill="#FFFFFF" fill-opacity="0.6" />

    <!-- Interactive Visual Elements / Chart on Slide -->
    <!-- Bar 1 -->
    <rect x="44" y="190" width="36" height="85" rx="10" fill="url(#chartGrad1)" stroke="#BAE6FD" stroke-width="2" />
    <!-- Bar 2 -->
    <rect x="94" y="150" width="36" height="125" rx="10" fill="url(#chartGrad2)" stroke="#FBCFE8" stroke-width="2" />
    <!-- Bar 3 -->
    <rect x="144" y="120" width="36" height="155" rx="10" fill="url(#chartGrad3)" stroke="#FEF08A" stroke-width="2" />

    <!-- Card on the right of Slide (AI Insight Bubble) -->
    <g transform="translate(210, 135)">
      <rect x="0" y="0" width="250" height="140" rx="24" fill="#0F172A" fill-opacity="0.65" stroke="#38BDF8" stroke-width="2.5" stroke-opacity="0.8" />
      <!-- Sparkle line inside card -->
      <path d="M 24 45 L 80 45 M 24 75 L 180 75 M 24 105 L 140 105" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round" stroke-opacity="0.75" />
      <circle cx="210" cy="45" r="14" fill="#38BDF8" />
    </g>

    <!-- Slide Inner Highlight Edge -->
    <rect x="4" y="4" width="502" height="322" rx="40" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.5" />
  </g>

  <!-- AI MAGIC BURST: Floating 4-Point Stars / Sparks -->
  <!-- Main Hero Star -->
  <g transform="translate(730, 260)" filter="url(#starGlow)">
    <path d="M 60 0 C 60 33 87 60 120 60 C 87 60 60 87 60 120 C 60 87 33 60 0 60 C 33 60 60 33 60 0 Z" fill="url(#starGrad)" />
    <circle cx="60" cy="60" r="10" fill="#FFFFFF" />
  </g>

  <!-- Secondary Mini Star Left -->
  <g transform="translate(180, 560)" filter="url(#starGlow)">
    <path d="M 28 0 C 28 15 41 28 56 28 C 41 28 28 41 28 56 C 28 41 15 28 0 28 C 15 28 28 15 28 0 Z" fill="url(#starGrad)" />
  </g>

  <!-- Tertiary Sparkle Top Left -->
  <g transform="translate(240, 150)" filter="url(#starGlow)">
    <path d="M 18 0 C 18 10 26 18 36 18 C 26 18 18 26 18 36 C 18 26 10 18 0 18 C 10 18 18 10 18 0 Z" fill="#38BDF8" />
  </g>

  <!-- Quaternary Sparkle Bottom Right -->
  <g transform="translate(780, 680)" filter="url(#starGlow)">
    <path d="M 20 0 C 20 11 29 20 40 20 C 29 20 20 29 20 40 C 20 29 11 20 0 20 C 11 20 20 11 20 0 Z" fill="#F472B6" />
  </g>
</svg>
`;

// 2. Full Horizontal Logo (Icon + Sleek Modern Typography)
const createHorizontalLogoSvg = (isDarkText = false, width = 1200, height = 360) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1200 360" fill="none">
  <defs>
    <!-- Emblem Gradients -->
    <linearGradient id="hSlideBack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#312E81" />
    </linearGradient>
    <linearGradient id="hSlideMid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#6366F1" />
    </linearGradient>
    <linearGradient id="hSlideFront" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
    <linearGradient id="hStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#F43F5E" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#818CF8" />
      <stop offset="100%" stop-color="#C084FC" />
    </linearGradient>
    <filter id="hShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#0F0C20" flood-opacity="0.35" />
    </filter>
    <filter id="hGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- LEFT: EMBLEM ICON (Scaled to fit ~280x280 area) -->
  <g transform="translate(40, 20)">
    <!-- Back slide -->
    <g transform="translate(40, 45) rotate(-8 80 50)" filter="url(#hShadow)">
      <rect x="0" y="0" width="160" height="100" rx="16" fill="url(#hSlideBack)" stroke="#818CF8" stroke-width="2" stroke-opacity="0.7" />
      <rect x="14" y="14" width="50" height="8" rx="4" fill="#C7D2FE" fill-opacity="0.5" />
      <rect x="14" y="30" width="80" height="5" rx="2.5" fill="#C7D2FE" fill-opacity="0.3" />
    </g>

    <!-- Mid slide -->
    <g transform="translate(68, 70) rotate(-3 80 50)" filter="url(#hShadow)">
      <rect x="0" y="0" width="165" height="105" rx="18" fill="url(#hSlideMid)" stroke="#C084FC" stroke-width="2" stroke-opacity="0.8" />
      <rect x="16" y="16" width="60" height="8" rx="4" fill="#F3E8FF" fill-opacity="0.5" />
      <rect x="16" y="34" width="90" height="5" rx="2.5" fill="#F3E8FF" fill-opacity="0.3" />
    </g>

    <!-- Front slide -->
    <g transform="translate(90, 100) rotate(5 90 60)" filter="url(#hShadow)">
      <rect x="0" y="0" width="180" height="118" rx="20" fill="url(#hSlideFront)" stroke="#A5F3FC" stroke-width="2.5" />
      <path d="M 0 20 C 0 8.9 8.9 0 20 0 L 160 0 C 171.1 0 180 8.9 180 20 L 180 40 C 130 50 60 30 0 60 Z" fill="#FFFFFF" fill-opacity="0.25" />
      <rect x="18" y="18" width="75" height="10" rx="5" fill="#FFFFFF" />
      <rect x="18" y="36" width="55" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.6" />
      
      <!-- Mini Bars -->
      <rect x="18" y="68" width="14" height="32" rx="4" fill="#38BDF8" />
      <rect x="38" y="52" width="14" height="48" rx="4" fill="#F472B6" />
      <rect x="58" y="42" width="14" height="58" rx="4" fill="#FEF08A" />

      <!-- Mini insight card -->
      <rect x="86" y="50" width="76" height="50" rx="10" fill="#0F172A" fill-opacity="0.65" stroke="#38BDF8" stroke-width="1.5" />
      <path d="M 96 66 L 120 66 M 96 78 L 146 78 M 96 90 L 132 90" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-opacity="0.8" />
    </g>

    <!-- Star Burst -->
    <g transform="translate(240, 70)" filter="url(#hGlow)">
      <path d="M 22 0 C 22 12 32 22 44 22 C 32 22 22 32 22 44 C 22 32 12 22 0 22 C 12 22 22 12 22 0 Z" fill="url(#hStarGrad)" />
      <circle cx="22" cy="22" r="4" fill="#FFFFFF" />
    </g>

    <g transform="translate(45, 185)" filter="url(#hGlow)">
      <path d="M 10 0 C 10 5.5 14.5 10 20 10 C 14.5 10 10 14.5 10 20 C 10 14.5 5.5 10 0 10 C 5.5 10 10 5.5 10 0 Z" fill="#38BDF8" />
    </g>
  </g>

  <!-- RIGHT: TYPOGRAPHY -->
  <g transform="translate(380, 80)">
    <!-- Main Title: Oratio -->
    <text x="0" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="118" font-weight="900" letter-spacing="-3" fill="${isDarkText ? '#0F172A' : '#FFFFFF'}">
      Present<tspan fill="url(#textGrad)">on</tspan>
    </text>

    <!-- AI Spark Tag / Subtitle -->
    <g transform="translate(4, 158)">
      <rect x="0" y="0" width="480" height="34" rx="17" fill="${isDarkText ? '#F1F5F9' : '#1E1B4B'}" stroke="url(#textGrad)" stroke-width="1.5" stroke-opacity="0.8" />
      <text x="24" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="4" fill="${isDarkText ? '#4338CA' : '#A5F3FC'}">
        AI PRESENTATION GENERATOR
      </text>
    </g>
  </g>
</svg>
`;

// 3. Splash Screen SVG (High Res 1920x1080)
const createSplashSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
  <defs>
    <radialGradient id="splashBg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1E1648" />
      <stop offset="40%" stop-color="#110D29" />
      <stop offset="100%" stop-color="#070512" />
    </radialGradient>
    <linearGradient id="meshGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="meshGlow2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EC4899" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#4F46E5" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="textGradSplash" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#A78BFA" />
      <stop offset="100%" stop-color="#F472B6" />
    </linearGradient>
    <filter id="splashGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="60" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#splashBg)" />
  <circle cx="450" cy="300" r="500" fill="url(#meshGlow1)" filter="url(#splashGlow)" />
  <circle cx="1500" cy="700" r="550" fill="url(#meshGlow2)" filter="url(#splashGlow)" />

  <!-- Grid overlay lines subtle -->
  <g stroke="#312E81" stroke-width="1" stroke-opacity="0.25">
    <line x1="0" y1="270" x2="1920" y2="270" />
    <line x1="0" y1="540" x2="1920" y2="540" />
    <line x1="0" y1="810" x2="1920" y2="810" />
    <line x1="480" y1="0" x2="480" y2="1080" />
    <line x1="960" y1="0" x2="960" y2="1080" />
    <line x1="1440" y1="0" x2="1440" y2="1080" />
  </g>

  <!-- Center Floating Icon & Brand -->
  <g transform="translate(680, 200)">
    <!-- Scale icon -->
    <g transform="scale(0.55)">
      <!-- Back slide -->
      <g transform="translate(190, 200) rotate(-7 260 170)">
        <rect x="0" y="0" width="460" height="290" rx="36" fill="#312E81" stroke="#818CF8" stroke-width="3" />
        <rect x="36" y="36" width="140" height="18" rx="9" fill="#C7D2FE" fill-opacity="0.4" />
      </g>
      <!-- Mid slide -->
      <g transform="translate(260, 260) rotate(-2 260 170)">
        <rect x="0" y="0" width="470" height="300" rx="38" fill="#7C3AED" stroke="#C084FC" stroke-width="3.5" />
        <rect x="40" y="40" width="160" height="20" rx="10" fill="#F3E8FF" fill-opacity="0.4" />
      </g>
      <!-- Front slide -->
      <g transform="translate(310, 340) rotate(5 270 180)">
        <rect x="0" y="0" width="510" height="330" rx="44" fill="#3B82F6" stroke="#A5F3FC" stroke-width="4.5" />
        <path d="M 0 44 C 0 19.7 19.7 0 44 0 L 466 0 C 490.3 0 510 19.7 510 44 L 510 110 C 360 140 160 80 0 170 Z" fill="#FFFFFF" fill-opacity="0.25" />
        <rect x="44" y="44" width="200" height="26" rx="13" fill="#FFFFFF" />
        <rect x="44" y="190" width="36" height="85" rx="10" fill="#38BDF8" />
        <rect x="94" y="150" width="36" height="125" rx="10" fill="#F472B6" />
        <rect x="144" y="120" width="36" height="155" rx="10" fill="#FEF08A" />
      </g>
      <!-- Big Star -->
      <g transform="translate(730, 260)">
        <path d="M 60 0 C 60 33 87 60 120 60 C 87 60 60 87 60 120 C 60 87 33 60 0 60 C 33 60 60 33 60 0 Z" fill="#FDE047" />
        <circle cx="60" cy="60" r="12" fill="#FFFFFF" />
      </g>
    </g>
  </g>

  <!-- Typography Center -->
  <g transform="translate(960, 680)" text-anchor="middle">
    <text font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="82" font-weight="900" letter-spacing="6" fill="#FFFFFF">
      PRESENT<tspan fill="url(#textGradSplash)">ON</tspan>
    </text>
    <text y="60" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" letter-spacing="8" fill="#94A3B8">
      INTELLIGENT AI PRESENTATION STUDIO
    </text>
  </g>

  <!-- Bottom Loading Bar -->
  <g transform="translate(760, 840)">
    <rect x="0" y="0" width="400" height="6" rx="3" fill="#1E1B4B" />
    <rect x="0" y="0" width="220" height="6" rx="3" fill="url(#textGradSplash)" />
  </g>
</svg>
`;

async function generateAll() {
  console.log('Generating fresh stylish logos and icons...');

  // 1. Generate SVGs
  const iconTransparentSvg = createIconSvg(1024, false);
  const iconDarkBgSvg = createIconSvg(1024, true, false);
  const iconCircleSvg = createIconSvg(1024, true, true);
  const horizontalDarkTextSvg = createHorizontalLogoSvg(true, 1200, 360);
  const horizontalWhiteTextSvg = createHorizontalLogoSvg(false, 1200, 360);
  const splashSvg = createSplashSvg();

  // Save icon1.svg
  const nextjsAppDir = path.join(rootDir, 'servers/nextjs/app');
  const nextjsPublicDir = path.join(rootDir, 'servers/nextjs/public');
  const electronBuildDir = path.join(rootDir, 'electron/build');
  const electronImagesDir = path.join(rootDir, 'electron/resources/ui/assets/images');
  const readmeImagesDir = path.join(rootDir, 'readme_assets/images');

  fs.writeFileSync(path.join(nextjsAppDir, 'icon1.svg'), iconTransparentSvg);
  console.log('✓ Wrote servers/nextjs/app/icon1.svg');

  // Convert to PNG buffers
  const bufIcon1024 = await sharp(Buffer.from(iconDarkBgSvg)).png().toBuffer();
  const bufIcon512Circle = await sharp(Buffer.from(iconCircleSvg)).resize(512, 512).png().toBuffer();
  const bufIconTransparent512 = await sharp(Buffer.from(iconTransparentSvg)).resize(512, 512).png().toBuffer();
  const bufIconTransparent256 = await sharp(Buffer.from(iconTransparentSvg)).resize(256, 256).png().toBuffer();
  const bufIcon128 = await sharp(Buffer.from(iconDarkBgSvg)).resize(128, 128).png().toBuffer();
  const bufIcon64 = await sharp(Buffer.from(iconDarkBgSvg)).resize(64, 64).png().toBuffer();
  const bufIcon32 = await sharp(Buffer.from(iconDarkBgSvg)).resize(32, 32).png().toBuffer();

  const bufHWhite = await sharp(Buffer.from(horizontalWhiteTextSvg)).resize(1200, 360).png().toBuffer();
  const bufHDark = await sharp(Buffer.from(horizontalDarkTextSvg)).resize(1200, 360).png().toBuffer();
  const bufSplash = await sharp(Buffer.from(splashSvg)).resize(1920, 1080).png().toBuffer();

  // 2. Write Next.js assets
  // servers/nextjs/public/Logo.png (Main horizontal logo)
  await sharp(Buffer.from(horizontalDarkTextSvg)).resize(1000, 300).png().toFile(path.join(nextjsPublicDir, 'Logo.png'));
  console.log('✓ Wrote servers/nextjs/public/Logo.png');

  // servers/nextjs/public/logo-with-bg.png (Icon badge / emblem for headers, sidebars & auth)
  await sharp(Buffer.from(iconDarkBgSvg)).resize(256, 256).png().toFile(path.join(nextjsPublicDir, 'logo-with-bg.png'));
  console.log('✓ Wrote servers/nextjs/public/logo-with-bg.png');

  // servers/nextjs/public/logo-white.png (Horizontal white/bright logo for dark/frosted headers)
  await sharp(Buffer.from(horizontalWhiteTextSvg)).resize(1000, 300).png().toFile(path.join(nextjsPublicDir, 'logo-white.png'));
  console.log('✓ Wrote servers/nextjs/public/logo-white.png');

  // servers/nextjs/public/Oratio_Splash.png
  await sharp(Buffer.from(splashSvg)).resize(1280, 720).png().toFile(path.join(nextjsPublicDir, 'Oratio_Splash.png'));
  console.log('✓ Wrote servers/nextjs/public/Oratio_Splash.png');

  // servers/nextjs/app/icon2.png
  await sharp(Buffer.from(iconDarkBgSvg)).resize(192, 192).png().toFile(path.join(nextjsAppDir, 'icon2.png'));
  // servers/nextjs/app/apple-icon.png
  await sharp(Buffer.from(iconDarkBgSvg)).resize(180, 180).png().toFile(path.join(nextjsAppDir, 'apple-icon.png'));
  // servers/nextjs/app/favicon.ico (standard 32x32 / 48x48 icon)
  await sharp(Buffer.from(iconDarkBgSvg)).resize(48, 48).png().toFile(path.join(nextjsAppDir, 'favicon.ico'));
  console.log('✓ Wrote servers/nextjs/app/ icons & favicon');

  // 3. Write Electron assets
  if (fs.existsSync(electronBuildDir)) {
    await sharp(Buffer.from(iconDarkBgSvg)).resize(1024, 1024).png().toFile(path.join(electronBuildDir, 'icon-1024.png'));
    await sharp(Buffer.from(iconDarkBgSvg)).resize(512, 512).png().toFile(path.join(electronBuildDir, 'logo.png'));
    
    // Multi-res icons
    const iconsDir = path.join(electronBuildDir, 'icons');
    if (fs.existsSync(iconsDir)) {
      const sizes = [16, 32, 48, 64, 128, 256, 512];
      for (const s of sizes) {
        await sharp(Buffer.from(iconDarkBgSvg)).resize(s, s).png().toFile(path.join(iconsDir, `${s}x${s}.png`));
      }
    }

    // icon.iconset for macOS
    const iconsetDir = path.join(electronBuildDir, 'icon.iconset');
    if (fs.existsSync(iconsetDir)) {
      const iconsetSizes = [
        { name: 'icon_16x16.png', size: 16 },
        { name: 'icon_16x16@2x.png', size: 32 },
        { name: 'icon_32x32.png', size: 32 },
        { name: 'icon_32x32@2x.png', size: 64 },
        { name: 'icon_128x128.png', size: 128 },
        { name: 'icon_128x128@2x.png', size: 256 },
        { name: 'icon_256x256.png', size: 256 },
        { name: 'icon_256x256@2x.png', size: 512 },
        { name: 'icon_512x512.png', size: 512 },
        { name: 'icon_512x512@2x.png', size: 1024 },
      ];
      for (const item of iconsetSizes) {
        await sharp(Buffer.from(iconDarkBgSvg)).resize(item.size, item.size).png().toFile(path.join(iconsetDir, item.name));
      }
    }
    console.log('✓ Wrote electron multi-res icons & iconset');
  }

  if (fs.existsSync(electronImagesDir)) {
    await sharp(Buffer.from(horizontalDarkTextSvg)).resize(1000, 300).png().toFile(path.join(electronImagesDir, 'oratio_logo.png'));
    await sharp(Buffer.from(iconDarkBgSvg)).resize(256, 256).png().toFile(path.join(electronImagesDir, 'oratio_short_filled.png'));
    console.log('✓ Wrote electron/resources/ui/assets/images/');
  }

  // 4. Write Readme assets
  if (fs.existsSync(readmeImagesDir)) {
    await sharp(Buffer.from(horizontalWhiteTextSvg)).resize(1200, 360).png().toFile(path.join(readmeImagesDir, 'logo.png'));
    console.log('✓ Wrote readme_assets/images/logo.png');
  }

  console.log('All logos and icons generated successfully!');
}

generateAll().catch((err) => {
  console.error('Error generating logos:', err);
  process.exit(1);
});
