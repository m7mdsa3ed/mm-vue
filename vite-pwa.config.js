const pwaOptions = {
  mode: 'production',
  injectManifest: {
    globPatterns: ['**/*'],
    maximumFileSizeToCacheInBytes: 10485760, // 10MB
  },
  strategies: 'injectManifest',
  srcDir: 'public',
  filename: 'sw.js',
  manifest: {
    name: "Money Managements",
    short_name: "Money Managements",
    theme_color: "#000000",
    background_color: "#000000",
    icons: [
      {
        src: "img/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "img/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
  },
  devOptions: {
    enabled: true,
    type: 'module',
  }
};

export default pwaOptions;
