export type AppearanceMode = 'system' | 'light' | 'dark'
export type ResolvedAppearance = 'light' | 'dark'

export type AccentPreset = {
  id: string
  hex: string
  labelKey: string
}

export const DEFAULT_ACCENT = '#00b48a'

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: 'emerald', hex: '#00b48a', labelKey: 'theme.accents.emerald' },
  { id: 'ocean', hex: '#0ea5e9', labelKey: 'theme.accents.ocean' },
  { id: 'indigo', hex: '#6366f1', labelKey: 'theme.accents.indigo' },
  { id: 'rose', hex: '#e11d48', labelKey: 'theme.accents.rose' },
  { id: 'pastelPink', hex: '#f4a7c3', labelKey: 'theme.accents.pastelPink' },
  { id: 'amber', hex: '#d97706', labelKey: 'theme.accents.amber' },
  { id: 'slate', hex: '#475569', labelKey: 'theme.accents.slate' },
]

export const THEME_STORAGE_KEY = 'syntaxia_theme'
export const ACCENT_STORAGE_KEY = 'syntaxia_accent'

export type AccentTokens = {
  brand: string
  deep: string
  soft: string
  onBrand: string
}

/** Normalize to lowercase #rrggbb or null. */
export function normalizeHex(input: string): string | null {
  const raw = input.trim().replace(/^#/, '')
  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    const [a, b, c] = raw.toLowerCase().split('')
    return `#${a}${a}${b}${b}${c}${c}`
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) {
    return `#${raw.toLowerCase()}`
  }
  return null
}

export function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const n = normalizeHex(hex)
  if (!n) return null
  return {
    r: Number.parseInt(n.slice(1, 3), 16),
    g: Number.parseInt(n.slice(3, 5), 16),
    b: Number.parseInt(n.slice(5, 7), 16),
  }
}

function toHex(n: number): string {
  const v = Math.max(0, Math.min(255, Math.round(n)))
  return v.toString(16).padStart(2, '0')
}

function mix(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): string {
  return `#${toHex(a.r + (b.r - a.r) * t)}${toHex(a.g + (b.g - a.g) * t)}${toHex(a.b + (b.b - a.b) * t)}`
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const lin = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!
}

/**
 * Derive brand token set for the active appearance.
 * Dark mode lightens the accent so it stays readable on dark surfaces.
 */
export function deriveAccentTokens(hex: string, appearance: ResolvedAppearance): AccentTokens {
  const rgb = parseHex(hex) || parseHex(DEFAULT_ACCENT)!
  const white = { r: 255, g: 255, b: 255 }
  const black = { r: 15, g: 20, b: 25 }

  if (appearance === 'light') {
    const brand = normalizeHex(hex) || DEFAULT_ACCENT
    const deep = mix(rgb, black, 0.22)
    const soft = mix(rgb, white, 0.82)
    const onBrand = relativeLuminance(rgb) > 0.5 ? '#0f1419' : '#ffffff'
    return { brand, deep, soft, onBrand }
  }

  const brandRgb = {
    r: rgb.r + (255 - rgb.r) * 0.35,
    g: rgb.g + (255 - rgb.g) * 0.35,
    b: rgb.b + (255 - rgb.b) * 0.35,
  }
  const brand = `#${toHex(brandRgb.r)}${toHex(brandRgb.g)}${toHex(brandRgb.b)}`
  const deep = mix(brandRgb, white, 0.18)
  const soft = mix(brandRgb, black, 0.72)
  const onBrand = relativeLuminance(brandRgb) > 0.5 ? '#0f1419' : '#ffffff'
  return { brand, deep, soft, onBrand }
}

/** Apply derived accent tokens onto an element style (documentElement). */
export function applyAccentCssVars(
  style: { setProperty(name: string, value: string): void },
  hex: string,
  appearance: ResolvedAppearance,
): AccentTokens {
  const tokens = deriveAccentTokens(hex, appearance)
  style.setProperty('--color-brand', tokens.brand)
  style.setProperty('--color-brand-deep', tokens.deep)
  style.setProperty('--color-brand-soft', tokens.soft)
  style.setProperty('--color-on-brand', tokens.onBrand)
  style.setProperty('--color-hero-from', tokens.soft)
  return tokens
}

/**
 * Inline head boot script: sets data-theme + CSS accent vars before paint
 * so reload does not flash the default emerald tokens.
 */
export function getThemeBootScript(): string {
  // Keep self-contained (no imports) — must stay in sync with deriveAccentTokens.
  return `(function(){try{var m=localStorage.getItem('syntaxia_theme');var a=localStorage.getItem('syntaxia_accent');var root=document.documentElement;var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=(m==='light'||m==='dark')?m:(systemDark?'dark':'light');if(m==='light'||m==='dark'){root.setAttribute('data-theme',m);}else{root.removeAttribute('data-theme');}root.style.colorScheme=resolved;function norm(v){if(!v)return null;v=String(v).trim();if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{3}$/.test(v)){v='#'+v.charAt(1)+v.charAt(1)+v.charAt(2)+v.charAt(2)+v.charAt(3)+v.charAt(3);}return/^#[0-9a-fA-F]{6}$/.test(v)?v.toLowerCase():null;}var hex=norm(a)||'#00b48a';root.setAttribute('data-accent',hex);function parse(h){return{r:parseInt(h.slice(1,3),16),g:parseInt(h.slice(3,5),16),b:parseInt(h.slice(5,7),16)};}function toH(n){n=Math.max(0,Math.min(255,Math.round(n)));return n.toString(16).padStart(2,'0');}function mix(a,b,t){return'#'+toH(a.r+(b.r-a.r)*t)+toH(a.g+(b.g-a.g)*t)+toH(a.b+(b.b-a.b)*t);}function lum(c){var L=[c.r,c.g,c.b].map(function(x){var s=x/255;return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4);});return 0.2126*L[0]+0.7152*L[1]+0.0722*L[2];}var rgb=parse(hex),white={r:255,g:255,b:255},black={r:15,g:20,b:25},brand,deep,soft,onBrand;if(resolved==='light'){brand=hex;deep=mix(rgb,black,0.22);soft=mix(rgb,white,0.82);onBrand=lum(rgb)>0.5?'#0f1419':'#ffffff';}else{var br={r:rgb.r+(255-rgb.r)*0.35,g:rgb.g+(255-rgb.g)*0.35,b:rgb.b+(255-rgb.b)*0.35};brand='#'+toH(br.r)+toH(br.g)+toH(br.b);deep=mix(br,white,0.18);soft=mix(br,black,0.72);onBrand=lum(br)>0.5?'#0f1419':'#ffffff';}var s=root.style;s.setProperty('--color-brand',brand);s.setProperty('--color-brand-deep',deep);s.setProperty('--color-brand-soft',soft);s.setProperty('--color-on-brand',onBrand);s.setProperty('--color-hero-from',soft);}catch(e){}})();`
}

export function resolveAppearance(
  mode: AppearanceMode,
  systemDark: boolean,
): ResolvedAppearance {
  if (mode === 'light') return 'light'
  if (mode === 'dark') return 'dark'
  return systemDark ? 'dark' : 'light'
}

export function readStoredMode(): AppearanceMode {
  if (!import.meta.client) return 'system'
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return 'system'
}

export function readStoredAccent(): string {
  if (!import.meta.client) return DEFAULT_ACCENT
  try {
    const v = localStorage.getItem(ACCENT_STORAGE_KEY)
    const n = v ? normalizeHex(v) : null
    if (n) return n
  } catch {
    /* ignore */
  }
  return DEFAULT_ACCENT
}
