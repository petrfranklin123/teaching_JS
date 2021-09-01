'use strict';

var box = document.querySelector('.box'),
    btn = document.querySelector('button');

var width = box.clientWidth;
var height = box.clientHeight;

console.log(width, height);

width = box.offsetWidth;
height = box.offsetHeight;

console.log(width, height);

width = box.scrollWidth;
height = box.scrollHeight;

console.log(width, height);

btn.addEventListener('click', ()=>{
    box.style.height = box.scrollHeight + 'px';

    console.log(box.scrollTop);
});

console.log(box.getBoundingClientRect().top);

var style = window.getComputedStyle(box);

console.log(style.display);

console.log(document.documentElement.scrollTop);

