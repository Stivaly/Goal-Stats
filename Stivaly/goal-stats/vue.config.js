const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
module.exports = defineConfig({
  devServer: {
    host: 'localhost',  // Configura el servidor para usar 'localhost'
    port: 8080,         // Puerto que desees utilizar (por defecto es 8080)
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
    },
    proxy: {
      '/api': {
        target: 'https://goalstats-api.onrender.com', // Cambia a tu URL de API externa
        changeOrigin: true, // Cambia el origen de la solicitud a la URL del destino
      },       
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Define la flag aquí
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),  // Define el alias '@' para apuntar a 'src/'
      },
    },
  }
})

