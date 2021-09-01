
//функция конструктора 

function User(name, id){
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function(){
        console.log(`Hello ${this.name}`);
    };
}

//добавляем новый прототип к конструкторы класса 
User.prototype.exit = function(){
    console.log(`Пользователь ${this.name} ушел`);
};

var ivan = new User('Ivan', 28);
var alex = new User('Alex', 20);

ivan.hello();
alex.hello();

alex.exit();

console.log(ivan);
console.log(alex);



