
let  a = 5,
    b = a;

b = b + 5;

//console.log(a);
//console.log(b);

//примитивные типы данных мы можем приравнивать и таким образом дублируем их
//но с объектами так не получится 
//вместо копирования этого объекта создается дублекат ССЫЛКИ 
//и работая с этой ссылкой мы изменяем и обращаемся к тому самому объекту 
var obj ={
    a: 5,
    b: 1
};
//создание ссылки 
var copy = obj;
copy.a = 10;
//console.log(copy);
//console.log(obj);


//создание дубликата объекта 
//данный метод не будет работать со вложенными объектами 
//то есть данный метод будет игнорировать
//и вложенные объекты будет отображать как ссылки 
//это называется поверхостным копированием 
//но есть еще глубокое копирование, это когда копируется все объекты и подобъекты
function copyy(mainObj){
    var objCopy ={};
    var key;
    //перебираем копируемый объект
    for(key in mainObj){
        //присваиваем свойства новому 
        objCopy[key] = mainObj[key];
    }
    //возвращаем его 
    return objCopy;
}

var numbers = {
    a: 2,
    b: 4,
    c: {
        x: 6 ,
        y: 4
    }
};

var newNumbers = copyy(numbers);

//console.log(newNumbers);

newNumbers.a = 10;

//console.log(newNumbers);

console.log(numbers);

//окончание метода 

//второй метод 
//он добавляет объект в качестве вложенности в указанный объект
var add = {
    d: 17,
    e: 20
};
// Object.assign первым аргуметом указывается куда вкладывать, вторым что вкладывать 
console.log(Object.assign(numbers, add));

//третий метод
//метод простого клонированирования объектов 
//но он так же поверхостный 
var clone =  Object.assign({}, add);
//вывод клонированного объекта 
console.log(clone);


var test =  Object.assign({}, numbers);
//вывод клонированного объекта
test.a = 3000; 
console.log(test);
console.log(numbers);


//Работа с массивами 
//паоверхостное клонирование объектов 
var oldArray = ['a', 'b', 'c'];
// дублирование объекта 
var newArray = oldArray.slice();

newArray[1] = '23211212';
 
console.log(oldArray);
console.log(newArray);

//4-й меотод 
//склеивает массивы в единый с момощью разворота, стаится ... и название массива 
//Спрет оператор 
var video = ['youtube', 'vimeo', 'rutube'],
    blogs = ['wordpress', 'live', 'blogger'],
    //склеивание 
    internet = [...video, ...blogs, 'vk', 'facebook'];

console.log(internet);


//существует ситуация, когда информация приходит из сервера в виде массива
//а ее нужно разделить на переменные и передать в функцию 
function log(a, b, c){
    console.log(a);
    console.log(b);
    console.log(c);
}
//эмитация ответа сервера в виде массива 
var nums = [2, 4, 5];
//данная конструкция разделяет массив на переменные и передает их в функцию 
log(...nums);

//клонирование объектов 
//поверхостное клонирование с помощью спрет операторов 
var array = ['a', 'b'];
//клонирование 
var newwArray = [...array];

var q = {
    one: 1, 
    two: 2
};

var newW = {...q};

console.log(newW);

