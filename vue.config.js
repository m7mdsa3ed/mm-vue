module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/m7faza" : "/",
  filenameHashing: false,
  productionSourceMap: false,
  pwa: {
    name: "M7FAZA",
    themeColor: "#000000",
    workboxOptions: {
      exclude: [/\.htaccess$/],
    },
  },
};
