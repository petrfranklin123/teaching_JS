
var box = document.getElementById('box'),
    btns = document.getElementsByTagName('button'),
    circles = document.getElementsByClassName('circle'),
    hearts = document.querySelectorAll('.heart'),
    oneHeart = document.querySelector('.heart'),
    wrapper = document.querySelector('.wrapper');

//box.style.backgroundColor = 'blue';
//box.style.width = '500px';

//альтернативная выше стилизация 
box.style.cssText = 'background-color: blue; width: 500px';

btns[1].style.borderRadius = '100%';
circles[0].style.backgroundColor = 'red';

//если выбираем сразу коллекцию элементов, то мы не можем задать всему псевдомассиву
//разово стиль, нужно делать это через цикл, обращаясь конкретному элементу 
//for(let i = 0; i < hearts.length; i++){
//    hearts[i].style.backgroundColor = 'blue';
//}

//альтернативка методу реализованного выше
//метод forEach может работать, если коллекция создана с помощью метода querySelectorAll
hearts.forEach(item => {
    item.style.backgroundColor = 'blue';
});




//чтобы создать метод, нужно его создать 
//с помощью метода createElement, этот метод создает его в js 
var div = document.createElement('div');
//создание текстового узла
//var text = document.createTextNode('Тут был я ');

//метод добавления класса
div.classList.add('black');

//добавление в конец тега body 
document.body.append(div);

//
wrapper.append(div);

//добавление в начало родителя wrapper
wrapper.prepend(div);

//добавление перед первым сердцем
hearts[0].before(div);

//добавление после первого сердца
hearts[0].after(div);


//удаление элементов 
//выбираем первый элемент кружка и удаляем его 
//circles[0].remove();


//замена элементов 
//выбираем первое сердце и заменяем его на первый в коллкции кружок 
hearts[0].replaceWith(circles[0]);

//добавление текста и разметки HTML на стрницу 
div.innerHTML = "<h1>Hello World</h1>";

//textContent в основном используется для получения данных от пользователя, так как 
//этот метод не позволит вставлять сторонний код на страницу 
//div.textContent = "Hello";


//Добавление элемента на страницу, где первым параметром будет afterbegin, afterend, beforebegin, beforeend
//это позиционирование относительно выбираемого блока 
//
div.insertAdjacentHTML('beforebegin', '<h1>Hello</h1>');

