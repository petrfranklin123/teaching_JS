'use strict';

//Создаем конструктор 
function UserTest(name, age){
    this.name = name;
    this.age = age;

    this.say = function(){
        console.log(`Имя пользователя ${this.name}, взраст ${this.age}`);
    };
}

//создаем класс
var ivan = new UserTest('Ivan', 27);
//в данном варианте мы можем получить переменные и их изменить 
// но данное поведение во многом неприемлево и надо исключить 
//возможность доступа к непроизвольному изменению и выдачи данных из объекта 
console.log(ivan.name);
console.log(ivan.age);
ivan.age = 30;
ivan.name = 'Alex';
//вызываем функцию
ivan.say();



//но если мы пропишем переменные в самом классе, то мы сможем экранировать доступ к данным
//Создаем конструктор 
function User(name, age){
    var userName = name;
    var userAge = age;

    this.say = function(){
        console.log(`Имя пользователя ${userName}, взраст ${userAge}`);
    };

    this.getAge = function(){
        return userAge;
    };

    this.setAge = function(age){
        if(typeof age === 'number' && age > 0 && age < 110){
            userAge = age;
        }else{
            console.log("Недопустимое значение");
        }

    };
}

//создаем класс
var ivan = new User('Ivan', 27);
//мы не имеем доступа к этим данным
//получаем undefinet
console.log(ivan.userName);
//обращаемся к функции для установки возраста 
console.log(ivan.setAge(20));
//показываем возраст 
console.log(ivan.getAge());

console.log(ivan.setAge(200));
//вызываем функцию
ivan.say();


//что касается классов, то в классах синтаксис инкапсуляции несколько другой 

class User{
    constructor(name, age){
        //this.userName = name;
        //this.userAge = age;
        this._userName = name;
        this._userAge = age;
    }


    say(){
        //таого доступа мы не можем обеспечить
        //console.log(`Имя пользователя ${userName}, взраст ${userAge}`);
        //поэтому используется так же контекст вызова this
        console.log(`Имя пользователя ${this._userName}, взраст ${this._userAge}`);
    }

    /*getAge(){
        return this._userAge;
    }

    setAge(age){
        if(typeof age === 'number' && age > 0 && age < 110){
            this._userAge = age;
        }else{
            console.log("Недопустимое значение");
        }

    }*/
    //синтаксис класса геттеры и сеттеры 
    get Age(){
        return this._userAge;
    }

    set Age(age){
        if(typeof age === 'number' && age > 0 && age < 110){
            this._userAge = age;
        }else{
            console.log("Недопустимое значение");
        }

    }
}


