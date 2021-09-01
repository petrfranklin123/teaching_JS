'use strict';

//установка значения, где первым аргументом идет название, а вторым его значение 
//localStorage.setItem('number', 5);
//вывод значения
//console.log(localStorage.getItem("number"));
//удаления этой пеерменной из локального хранилища 
//localStorage.removeItem("number");
// очистка всего локального хранилища
//localStorage.clear();


var checkbox = document.querySelector("#checkbox"),
    form = document.querySelector("form"),
    change = document.querySelector("#color");

//------- проверка чекбокса
//если у нас существет в локальном хранилище переменная isChecked
if(localStorage.getItem("isChecked")){
    // устанавливаем галочку
    checkbox.checked = true;
}
//событие нажатия на чекбокс
checkbox.addEventListener("change", ()=>{
    //Установка значения в локальное хранилище 
    localStorage.setItem("isChecked", true);
});
//-------

//-------проверка нажатия 
//проверка наличия переменной bg
if(localStorage.getItem("bg") === "changed"){
    form.style.backgroundColor = "red";
}
//нажатие на клавишу
change.addEventListener("click", ()=>{
    //если переменная bg имеется 
    if(localStorage.getItem("bg") === "changed"){
        //удалить переменную bg
        localStorage.removeItem("bg");
        //выстаить белый цвет формы
        form.style.backgroundColor = "#fff";
    //иначе установка переменной bg
    }else{
        localStorage.setItem("bg", "changed");
        //установка красного цвета
        form.style.backgroundColor = "red";
    }
});
//-------

//а так же в локальное хранилище можно поместить объекты, но в JSON формате 
//создаем объект
var persone = {
    name: "Alex",
    age: 25
};
// переделываем объект в JSON форпмат и помещаем его в локальное хранилище
localStorage.setItem("Alex", JSON.stringify(persone));
// достаем JSON из локального хранилища и форматируем его в объект
console.log(JSON.parse(localStorage.getItem("Alex")));
