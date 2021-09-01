//console.log(document.body);
//console.log(document.head);
//получаем весь документ html 
//console.log(document.documentElement);

//получение всех узлов внутри этого родителя
//console.log(document.body.childNodes);


//console.log(document.body.firstChild);
//получение первого элемента 
console.log(document.body.firstElementChild);
//console.log(document.body.lastChild);
//получение последнего элемента 
console.log(document.body.lastElementChild);

//получение вышестоящего родителя 
//console.log(document.querySelector('#current').parentNode);
//получение вышестоящего родитетеля в качестве элемента 
console.log(document.querySelector('#current').parentElement);

//если нужно получить несколько вышестоящих родителей, то нужно продублировать parentNode
//console.log(document.querySelector('#current').parentNode.parentNode.parentNode);

//data атрибуты 
//nextSibling получает следующий класс в html вложенности 
console.log(document.querySelector('[data-current="3"]').nextSibling);
//previousSibling получает предидущий класс html вложенности 
console.log(document.querySelector('[data-current="3"]').previousSibling);


//nextSibling получает следующий элемент в html вложенности 
console.log(document.querySelector('[data-current="3"]').nextElementSibling);
//previousSibling получает предидущий элемент html вложенности 
console.log(document.querySelector('[data-current="3"]').previousElementSibling);


for(var node of document.body.childNodes){
    if(node.name == "#text"){
        continue;
    }
    console.log(node);
}












