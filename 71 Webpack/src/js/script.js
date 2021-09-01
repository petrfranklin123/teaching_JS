//Gulp - планировщик задач, он не умеет собирать скрипты 
//Webpack - сборщик модулей

//Импортируем модуль из другого файла 

//запуск webpack командой npx webpack
const myModule = require("./main");

const myModuleInstanse = new myModule();

myModuleInstanse.hello();
myModuleInstanse.goodbye();
