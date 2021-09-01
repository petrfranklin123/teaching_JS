'use strict';

let path = require('path');
// по умолчанию, без этого конфигурацонного файла 
// входные данные берутся из папки src/index.js
// выход dist/main.js

//mode - задается тип редактирования 
//entry - путь откуда будет браться входной файл 
//output - выходные параметры, имя файла и путь
//watch - слежка за проектом 
//devtool - сохранение исходных даннных
module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
