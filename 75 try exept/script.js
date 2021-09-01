'use strict';

try{
    var test1 = document.querySelector(".test1");
    console.log(test1);
    // следующих дввух элементов нет выводится ошибка, но скрипт продолжает работу  
    var test2 = document.querySelector(".test2");
    console.log(test2);
    var test2 = document.querySelector(".test5");
    console.log(test2);

    var test3 = document.querySelector(".test3");
    console.log(test3);
}catch(e){
    console.log(e);
}

console.log("=====ПОСЛЕ=====");






