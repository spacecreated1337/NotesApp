const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
  defineConfig
} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ?
    '/notesapp/' : '/',
  productionSourceMap: false,
});
module.exports = {
  configureWebpack: {
    plugins: [new MiniCssExtractPlugin()]
  },
  publicPath: process.env.NODE_ENV === 'production' ?
    '/notesapp/' : '/',
}