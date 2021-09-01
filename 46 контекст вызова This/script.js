// при использовании use strict еонтекст вызова this 
// будет выводить undefinet, если его нет, то будет пропиываться элемент документа 
//1) Обысная функция: this = window, но если use strict - undefinet 
//2) Контекст у методов объекта - сам объект 
//3) this в конструкторах и классах, это новый экземпляр объекта
//4) Ручная привязка this: call, apply, bind
'use strict';

//в данной функции во всех выводах контекста this будет выдавать неопределенность
//
/*function showThis(a, b){
    console.log(this);
    function sum(){
        console.log(this);
        return a + b;
    }
}
showThis(4, 5);*/

// в данном случае, если функция является непосредственно вложенной в объект, то она будет 
// использовать контекст this как объект, но если функция явлется вложенной в функцию,
// то контекст this теряется
/*var obj = {
    a: 20, 
    b: 15,
    sum: function(){
        console.log(this);
        function shout(){
            console.log(this);
        }
        shout();
    }
};
obj.sum();*/


//при создании конструктора объекта вместо котекста this, условно, подставляется название создаваемого класса 
/*function User(name, id){
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function(){
        console.log(`Hello ${this.name}`);
    };
}

var ivan = new User("Ivan", 23);*/


//чтобы заполучитьнужный контекстный вид у функции, нужно использовать необходимые методы 
/*function sayName(){
    console.log(this);
    console.log(this.name);
}

var user = {
    name: "John"
};

//Эти методы позволяют обращаться к функции и заполучить контекст вызова this 
sayName.call(user);
sayName.apply(user);*/

//если необходимо передеать дополнительный объект в функцию 
/*function sayName(surname){
    console.log(this);
    console.log(this.name + " " + surname);
}

var user = {
    name: "John"
};
//разница в передачи параметров 
//передается через запятую после указания объекта
sayName.call(user, "Smith");
//передается в виде массива 
sayName.apply(user, ["Smith"]);*/

//седующий контекст вызова чрез метод bind---------------------------------
/*function count(num){
    return this * num;
}

// в данном случае вместо this в функции вставится "2", так как параметром в методе была 2 
// а в качестве передаваемых параметров будет double 
var double  = count.bind(2);
console.log(double(4));
console.log(double(14));*/

/*var btn = document.querySelector('button');

//при вызове классической функции контекст будет отыгрывать как event.target 
btn.addEventListener('click', function(){
    console.log(this);
});

//если использвать колбек функци, токонтекст this теряется!
//у нее нет контекста вызова, поэтому она его берет у своего родителя 
btn.addEventListener('click', () =>{
    console.log(this);
});*/

var obj = {
    num: 5, 
    sayNumder: function(){
        //так как у колбек функции нет контекста , поэтому она будет брать информацию 
        //пожтому она будет заимствовать контекст у своего родителя 
        //то есть как и в предидущем примере, где была влорженная функция 
        //но здесь не будет неопредеенности, а выдаст сам объект 
        var say = () =>{
            console.log(this.num);
        };
        say();
    }
};

obj.sayNumder();



//пример стрелочной функции 
var double = a => a * 2;

console.log(double(4));

