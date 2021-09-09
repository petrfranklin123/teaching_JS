'use strict';

// объявление var предрасполагает, что переменная или массив 
// будут объявлены перед тем как запустится весь скрипт 
// то есть если переменная будет запросшена, когда она еще не объявлена
// по ходу кода, то она все равно выявится 

// в современных стандартах используется let и const, они 
// объявляются ровно тогда, когда были вызваны 


/*
//-----
// типичная задача, это впрос, что будет показано в консоли?
let obj = {
    number: 5,
    seyNumber: function(){
        function say(){
            console.log(this);
        }
        say();
    }
};
// в данном случае у нас выйдет объект window так как 
// котекст вызова не понимает, что мы хотим
obj.seyNumber();

// избавиться от такой ф-ии поможет стрелочная ф-я
// в данном случае у нас ф-я seyNumber в новом формате 
// и контекст вызова не сбивается благодаря стрелочной ф-ии 
let obj2 = {
    number: 5,
    seyNumber: function(){
        say = () => {
            console.log(this);
        }
        say();
    }
};
// в данном случае у нас выйдет объект window так как 
// котекст вызова не понимает, что мы хотим
obj2.seyNumber();
*/

// для дальнейшей работы меобходимо понимать работу методов filter и map для массивов 
let names = ["Ivan", "Ann", "Vladimir", "Chukcha"];
// фильруем массив, оставляя слова мепньше 5 символов 
let shortNames = names.filter((name)=>{
    return name.length < 5;
});
console.log(shortNames);


// метод map  позволяет переформатировать уже существующий массив
let ansvers = ["Ivan", "Ann", "Vladimir", "Chukcha"];
// прописываем все слова в нижнем регистре  
ansvers = ansvers.map((name)=>name.toLowerCase());
console.log(ansvers);

// предопределять значения в ф-ии можно count = 0
function setchData(data, count = 0){
    // раньше был допустим стандарт такой:
    // count = count || 0;
    console.log(`Данные: ${data}, в количестве: ${count}`);
}
// специльно подаем один параметр, вместо двух
setchData("Что-то");

// существует rest параметр, который сворачивает в массив входящие параметры
// этот параметр прописывается, где в начале идут ...
// нужно помнить, что rest параметр должен идти в последнюю очередь
// то есть, предположим, что нужно передать первые несколько параметров, а остальные дополнитлеьно 
// function max(a, b, ...numbers)
// то есть, если передадутся 4 параметра 
// то первые два параметра запишутся в переменные, а остальные в массив numbers
function max(a, b, ...numbers){
    console.log(numbers);
}
max(4,5,6,8);

// а так же rest оператор можно применять для склеивания массивов или их модификации 
const arr1 = [2,3,4],
      arr2 = [45,7,3];
console.log(...arr1, ...arr2);

//найдем максимальное значение
const res = Math.max(...arr1, ...arr2);
//мы так же можем модифицировать таким образом:
// const res = Math.max(...arr1,44, 67, ...arr2);
console.log(res);

//------------
// что касается объектов

const user = {
    name: 'default',
    pass: "qwerty",
    rigths: "user"
}; 

const admin = {
    name: 'admin',
    pass: "root"
}; 
// старый вариант модификации объектов, c заменой содержимого:
//const ress = Object.assign(user,admin);
//создаем пустой объект:
//const ress = Object.assign({},user,admin);
// создание объекта по новому стандарту
const ress = {...user, ...admin};
console.log(ress);


// новый стандарт позволяет брать переменные из другого оокружения для объекта 
const x = 25, y = 10;

const coords = {
    x, 
    y,
    calcSq(){
        console.log(this.x * this.y);
    }
};

console.log(coords.calcSq());

// предположим что мы хотим добавит к объекту еще один праметр
const avatar = "Photo";
const ob = {...user, ...admin, avatar};
console.log(ob);

/*
// иногда нужно обратиться к свойствам объекта, но обращение слишком громозкое
// есть способ решения 
const testuser = {
    name: 'default',
    pass: "qwerty",
    rigths: "user"
};

// данная запись позволит присвоить свойства по имени обычным внешним переменные, как указатели
// и имена переменных должны бить такими же, как и в объекте  
const {name, pass, rigths} = testuser;

console.log(name, pass);
*/
//для более сложных объектов слущит такая запись: 
const testuser2 = {
    name: {
        first: "Sam",
        second: "Smith"
    },
    pass: "qwerty",
    rigths: "user"
};

// данная запись позволит присвоить свойства по имени обычным внешним переменные, как указатели
// и имена переменных должны бить такими же, как и в объекте  
const {name: {first, second}, pass, rigths} = testuser2;
// по итогу у нас получается 4 переменных first, second, pass, rigths
console.log(first, second, pass);


//----------
//бывабт такие ситуации, когда нужно передать объект в ф-ю
// в данном случае ф-я ожидает конкретный объект и если она не получает некоторые параметры 
// то она дополняет их дефолтными
function connection({host = "localhost", port = 3000, user = "default"}){
    console.log(`host: ${host} port: ${port} user: ${user}`);
}
// прелесть этой записи в том, что подобной записи не важно в каком порядке передаются параметры !
connection({port: 323, host: "jijiihji"});

// но если мы вызовем ф-ю таким образом:

//нужно добавить в дефолнтной записи {host = "localhost", port = 3000, user = "default"} = {}
function connectionn({host = "localhost", port = 3000, user = "default"} = {}){
    console.log(`host: ${host} port: ${port} user: ${user}`);
}
connectionn();

// выделение массивов из объектов 
const country = {
    name: "England",
    population: 2000000, 
    gender: {
        male: ["15%", "40%"],
        female: ["16%", "29%"]
    }
}
// для элементов массива все несколько иначе, нежели у свойств объекта 
// элементы массива могут обзываться по-разному 
const {gender: {male: [male1, male2], female: [fem1, fem2]}} = country;
console.log(male1, fem1);
