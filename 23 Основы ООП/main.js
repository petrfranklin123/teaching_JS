

var str = "some";
var str_obj = new String(str);


console.log(typeof(str));
console.log(typeof(str_obj));


var solder = {
    health: 400,
    armor: 100,
    sayHallo: function(){
        console.log("Hello");
    }
};

var jonh = {
    health: 100
};

//пробуем объединить объекты 
//а точнее, дополнить объект jonh объектом solder

//первым параметром идет название дополняемого объекта, а вторым каким объектом дополнить
Object.setPrototypeOf(jonh, solder);

jonh.sayHallo();

//создаем объект, который унаследует свойства у другого объекта 
var Andrey = Object.create(solder);

Andrey.sayHallo();
