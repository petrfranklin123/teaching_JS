'use strict';

var box = document.getElementById('box');
console.log(box);

//выбираем несколько одинаковых элементов 
//для того чтобы выбрать из html коллекции что-то конкретное можно указать 
//индекс после объявления селектора 
//var btns = document.getElementsByTagName('button')[1];
var btns = document.getElementsByTagName('button');
console.log(btns[1]);

var circles = document.getElementsByClassName('circle');
console.log(circles);


//новые методы
//использует css селекторы 
var hearts = document.querySelectorAll('.heart');
console.log(hearts);

hearts.forEach(item => {
    console.log(item);
});


var oneHeart = document.querySelector('.heart');
console.log(oneHeart);