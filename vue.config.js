// vue.config.js
const webpack = require('webpack')

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new webpack.DefinePlugin({
//         // Отключаем детальный вывод mismatches в продакшн-бандле
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
//       })
//     ]
//   }
// }
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/e-commerce/' : '/',
  configureWebpack: { /* existing config */ }
}