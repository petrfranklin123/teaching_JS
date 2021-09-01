
'use strict';

//класс в свою очередь является концепцией
//всегда должен начинаться с большой буквы 
class Rectangle{
    //Функция конструирования 
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    calcArea(){
        return this.height * this.width;
    }
}

//создаем наследовательный класс, подвязываем наследовательный класс extends 
class ColoredRectangleWithText extends Rectangle{
    constructor(height, width, text, bgColor){
        // super(); подставляет все строки из конструктора унаследованного класса 
        // super(); всегда должна стоять в первую очередь в еонструкоре 
        super(height, width);
        this.text = text;
        this.bgColor = bgColor;
    }

    shwMyProps(){
        console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    }

}

//новые объекты называются экземплярами 
var square = new Rectangle(10, 12);
var long = new Rectangle(20, 100);

console.log(square.calcArea());
console.log(long.calcArea());


var div = new ColoredRectangleWithText(25, 10, "Hello", "red");

div.shwMyProps();
console.log(div.calcArea());









