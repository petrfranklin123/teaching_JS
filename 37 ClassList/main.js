// 

var btns = document.querySelectorAll('button');
var wrapper = document.querySelector('.btn-block');

//узнаем сколько классов содержит данный объект 
//console.log(btns[0].classList.length);

//через classList.item(), где в свойство item нужно прописать индекс 
//мы можем получить имя класса 
console.log(btns[0].classList.item(0));

//команда добавления класса, их можно передавать несколько одновременно 
console.log(btns[0].classList.add('red'));

//команда удаления класса
console.log(btns[0].classList.remove('blue'));

//команда удаления или добавления класса, взависимости от того, есть класс у элемента или нет 
console.log(btns[0].classList.toggle('blue'));


//проверка на наличие класса contains() 
if(btns[1].classList.contains('red')){
    console.log('red');
}

btns[0].addEventListener('click', () =>{
    //проверка на наличие класса на второй кнопке 
    //if(!btns[1].classList.contains('red')){
    //    btns[1].classList.add('red');
    //}else{
    //    btns[1].classList.remove('red');
    //}

    btns[1].classList.toggle('red');
});

//делегирование событий 
//нужно для того, чтобы новым элементам не добавлять аналогичные события 
//Вместо этого мы добавляем событие, в нашем случае это нажатие, и потом определяем по какому
//элементу произошло нажатие 
wrapper.addEventListener('click', (event) =>{
    // запись event.target нужна для того, чтобы некликабельные элементы тоже были задействованы 
    //селектор по наименованию класса
    //if(event.target && event.target.classList.contains('blue')){
    //    console.log("Hello");
    //}
    // имя тега прописывается всегда с большими буквами 
    if(event.target && event.target.tagName == "BUTTON"){
        console.log("Hello");
    }
});

//создадим дополнительный элемент и поместим его во внутрь wrapper
// и убедимся, что событие нажатия распостранилось и на него 
var btn = document.createElement("button");
btn.classList.add('red');
wrapper.append(btn);