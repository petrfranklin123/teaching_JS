function button(){
    return "button";
}

// в реакте название классов всегда с большой буквы 
class Slider {

    constructor(width, height, count){
        this.width = width;
        this.height = height;
        this.count = count;
    }

    nextSlide(){
        console.log("Move forvard");
    }

    prevSlide(){
        console.log("Move back");
    }

    whoAmi(){
        console.log(this.width, this.height, this.count);
    }
}

//чтобы соединить два класса используется метод extends 
//после которого прописывается наследник нового класса  
class AuthoSlider extends Slider{
    // в конструкторе прописывается все переменные из наследника и нынешнего 
    constructor(width, height, count, auto){
        // в super прописываются все унаследованные свойства  
        super(width, height, count);
        //далее обычно пропсываются свойства нового класса 
        this.auto = auto;
    }
    play(){
        console.log(`Autoplay: ${this.auto}`);
    }
}

//унаследованный класс 
//const slider = new AuthoSlider(500, 400, 3, true);
//slider.whoAmi();
//slider.play();

// чтобы работать с модульной конструкцией, необходимо использовать экспорт 
export {button, Slider, AuthoSlider};
//import {button, Slider} from "./script";

// можно переименовать функции при экспорте 
// но тогда в импортированном файле нужно поменять название функции 
//export {button as btn, Slider};
//import {btn, Slider} from "./script";

//можно экспортировать по имолчанию, но экспортируесть только что-то одно 
//export default Slider;
//тогда в импортируемом файле прописывается название без скобок 
//название можно менять как угодно, так как все равно передается одна сущность 
//import Slider from "./script";

//помимо этого мы можем индивидуально экспортировать методы 
//export {button};
//тогда в импорте будет:
//import Slider, {button} from "./script";
