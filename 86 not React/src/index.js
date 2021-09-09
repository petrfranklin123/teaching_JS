import {button, Slider, AuthoSlider} from "./script";

//можно преименовывать функции прямо в этом файле 
//import {button as btn, Slider as sl} from "./script";

//если нужно импортировать весь файл, то прописываем 
// но мы должны указать объект, в котором будут подключены все методы
// в нашем случае, это total 
//import * as total from "./script";

// ЕСЛИ нам нужно импортровать что-то из npm, то прописываем без относительного пути
//import React, {component} from "react";

const slider = new Slider(400, 300, 4);
slider.whoAmi();
console.log(button());

const auto = new AuthoSlider(400, 300, 4, true);
auto.whoAmi();
auto.play();