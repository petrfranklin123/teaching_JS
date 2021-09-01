
var inputRub = document.querySelector('#rub');
var inputUsd = document.querySelector('#usd');

//метод get - это получение данных 
//метод post - отправляет данные на сервер 

inputRub.addEventListener('input', () =>{

    //содаем каласс для возможности общения с браузером 
    var request = new XMLHttpRequest();

    //метод open собирает настройки для запроса на сервер 
    // синтаксис запроса request.open(method, url, async, login, password);
    //method - метод запроса
    //url - путь к серверу 
    //async - асинхронный или синхронный, зависит от того, как будет производиться ожидание ответа от сервера 
    request.open('GET', 'js/current.json');

    //заголовочные параметры 
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    request.send();
    //после этих трех методов мы отпраили запрос на сервер 

    //получаем ответ от сервера 
    //status - код ответа 
    //status-text - название ответа сервера 
    //response - ответ
    //readystate - состояние запроса https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/readyState

    //readystatechange событие, отслеживающее состояние запроса 
    /*request.addEventListener('readystatechange', () =>{
        //условие целостности и получения запроса 
        if(request.readyState === 4 && request.status === 200){
            //получаем json объект
            console.log(request.response);

            //переводим формат json в привычный объект и присваиваем ему ссылку data
            var data = JSON.parse(request.response);

            //вносим данные в область на сайте
            inputUsd.value = +inputRub.value / data.current.usd;
        }else{
            // если получили ошибку 
            inputUsd.value = "Что-то пошло не так";
        }
    });*/

    //аналог пока сверху чрез событие load 

    request.addEventListener('load', () =>{
        //условие целостности и получения запроса 
        if(request.status === 200){
            //переводим формат json в привычный объект и присваиваем ему ссылку data
            var data = JSON.parse(request.response);

            //вносим данные в область на сайте
            inputUsd.value = +inputRub.value / data.current.usd;
        }else{
            // если получили ошибку 
            inputUsd.value = "Что-то пошло не так";
        }
    });
});







