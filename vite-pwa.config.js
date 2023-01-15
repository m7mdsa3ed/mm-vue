const pwaOptions = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Money Man',
    short_name: 'MM',
    theme_color: '#FFFFFF',
    icons: [
      {
        src: 'img/icons/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    "shortcuts": [
      {
        "name": "Transactions",
        "short_name": "Transactions",
        "url": "/transactions",
      },
      {
        "name": "Accounts",
        "short_name": "Accounts",
        "url": "/accounts",
      },
    ]
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  pwaOptions.manifest.name = 'PWA Inject Manifest'
  pwaOptions.manifest.short_name = 'PWA Inject'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error overrides
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying) {
  pwaOptions.selfDestroying = selfDestroying
}

pwaOptions.mode = process.env.NODE_ENV;

module.exports = pwaOptions