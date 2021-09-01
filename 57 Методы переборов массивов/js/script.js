'use strict';

var names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

/*
//в данном методе мы выбираем массив, берем элементы массивов
//и каждый элекмент сравниваем 
//если он меньше 5, то возвращаем и таким образом сформировываем новый объект 
var shortNames = names.filter((name) =>{
    return name.length < 5;
});
console.log(shortNames);
*/

/*
//метод map позволяет видоизменять массив, при этом сохранять в себя самого 
//но в практике лучше всего создавать новые переменные 
var answers = ['IvAn', 'AnnA', 'Hello'];
var result = answers.map(item => {
    //пеерводим в нижний регистр 
    return item.toLowerCase();
    //пеерводим в верхний регистр 
    //return item.toUpperCase();
});
console.log(result);
*/

/*
// методы every и some возвращают булевое значение 

var some = [4, 'dsfas', 'dadd12', 56];

var som = [4, 56];

//в данном коде мы опрашиваем, есть ли хоть один элемент массива числовой ?
console.log(some.some(item => {
    return typeof(item) === 'number';
}));

//если все элементы массива удвлетворяют условию 
console.log(som.every(item => {
    return typeof(item) === 'number';
}));
*/

//reduce пердназначен для схлопывания или сборки массива в единое целое 
/*
var arr = [4, 5, 1, 3, 2, 6];
//принцип кода таков
//в reduce поступают два аргумента, первый который равен сумме всех элементов
//А второй равен элементу, котрый был взят в данный момент 
//таким образом мы схлопываем массив в единое число 
var res = arr.reduce((sum, current) =>{
    return sum + current;
});
console.log(res);
*/
/*
var arr = ['Apple', 'Pear', 'Plum'];

//var res = arr.reduce((sum, current) =>{
//    return `${sum}, ${current}`;
//});

// к тому же третьим аргументом, который идет после прописания функции, это аргумент начального значения 
//оно подставится в первую очередь 
var res = arr.reduce((sum, current) =>{
    return `${sum}, ${current}`;
}, 3);

console.log(res);
*/

//практический пример, где нужно достать из объекта все имена, со свойствами persone 
var obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

//первым действием мы обращаемя к глобальному объету 
//Object и вызывае метод entries, который преобразует объект в массив 
var newArr = Object.entries(obj)
//через точку, но можно и обращаться к переменной, фильтруем массив 
.filter(item => {
    //если второй элемент массива равен perone 
    return item[1] === 'persone';
}).map(item => {
    //возвращем только первые элементы 
    return item[0];
});

console.log(newArr);















