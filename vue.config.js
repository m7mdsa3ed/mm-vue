module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/fin" : "/",
  filenameHashing: false,
  productionSourceMap: false,
  pwa: {
    name: "Money Management",
    themeColor: "#000000",
    workboxOptions: {
      exclude: [/\.htaccess$/],
    },
  },
};
