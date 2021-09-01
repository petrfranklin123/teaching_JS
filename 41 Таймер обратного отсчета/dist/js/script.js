//Табы----------------------------
//нужно решить три задачи 
//1) нужно скрывать ненужную информацию 
//2) нужно раскрывать нужный таб 
//3) нужн выделять нужную страницу 
window.addEventListener('DOMContentLoaded', () =>{

    var tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTAbContent(){
        //скрываем все табы 
        tabsContent.forEach(item =>{
            //чтобы появилась анимация добаляем в css классы 
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            //item.style.display = 'none';
        });

        // удаляем класс активности у табов
        tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active');
        });
    }

    //функция отработки нажатия, где i это название позиции слайда 
    function showTabContent(i = 0){
        //тоже часть анимации 
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        //tabsContent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active');
    }

    //дефолтная страница
    hideTAbContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) =>{
        var target = event.target;
        // с помощью делегирирования ищем нажатую облать и вызываем функции отработки 
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTAbContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Табы----------------------------

    //Таймер-------------------------- 

    //переменная, до которой будет отсчет 
    var deadline = '2020-12-31';

    //функция, которая будет считать, сколько осталось времени 
    //до конца и создавать на выходе собранный объект 
    function getTimeRemaining(endtime){
        // количество милисекунд 
        var t = Date.parse(endtime) - Date.parse(new Date()),
        // количество дней
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
        // количество часов
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        // количество минут 
            minutes = Math.floor((t / 1000 / 60) % 60),
        // количество секунд 
            seconds = Math.floor((t / 1000) % 60);

        // возврат объекта 
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //функция, которая принимает число и добавляет ноль в начало 
    //если число меньше 10
    function getZero(num){
        if(num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    //функция для доступа к элементам DOM и запуска таймера 
    function setClock(selector, endtime){
        var timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds");
        
        //из-за того, что функция setInterval начнет действовать только через 1 секунду
        //при одновлении страницы будет появляться изначальное значение 
        //чтобы избежать этого, нужно разово вызвать функцию счета времени
        updateClock();
        
        //запуск регулярного обновления 
        var timeInterval = setInterval(updateClock, 1000);
        

        function updateClock(){
            //получение объекта с датой 
            var t = getTimeRemaining(endtime);

            //модуль обновления времени на странице
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //проверка, если милисекунд 0 или меньше, то таймер очищается
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    //запуск функции обновления таймера 
    setClock('.timer', deadline);




});