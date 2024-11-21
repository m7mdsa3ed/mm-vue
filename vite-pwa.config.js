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
    background_color: "#FFFFFF",
    icons: [
      {
        src: "img/icons/icon.svg",
        sizes: "any",
        type: "image/png"
      }
    ],
  },
  devOptions: {
    enabled: true,
    type: 'module',
  }
};

export default pwaOptions;
