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

    //Таймер-------------------------- 

    //Модальное окно -----------------

    var modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector(".modal");

    var prevModalDialogMAIN = document.querySelector('.modal__dialog');


    function openModal(){
        modal.classList.add('fade', 'show');
        modal.classList.remove('hide');
        //свойство, которое запрещает скроллинг по странице, пока активно модальное окно 
        document.body.style.overflow = 'hidden';
/*
        if(!prevModalDialogMAIN.classList.contains('show')){
            prevModalDialogMAIN.classList.add('show');
            console.log(prevModalDialogMAIN.classList.contains('show'));
            if(prevModalDialogMAIN.classList.contains('hide')){
                prevModalDialog.classList.remove('hide');
            }

        }*/
        //если пользователь сам перешел в модальное окно 
        clearInterval(modalTimerId);
    }

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('fade', 'show');
        //стираем свойство, чтобы была возможность скролить сайт после закрытия кмодального окна 
        document.body.style.overflow = '';
    }
    //перебор кнопок, которые вызывают модальное окно 
    modalTrigger.forEach(item =>{
        item.addEventListener('click', () =>{
            openModal();
        });
    });



    // закрытие модального окна по нажатию по внешней области 
    modal.addEventListener('click', (event) =>{
        //проверка условия, что пользовательно нажал на внешнюю облать 
        if(event.target == modal || event.target.getAttribute('data-close') == ''){
            closeModal();    
        }
    });

    //закрытие модального окна по Esc
    document.addEventListener('keydown', (event) =>{
        if(event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    //Модификация модального окна-----

    var modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll(){
        //window.pageYOffset то, сколько проскролил пользователь
        //document.documentElement.clientHeight размер области видимости на экране у пользователя
        //document.documentElement.scrollHeight вся высота страницы 
        // если сумма экрана и и длины скролла совпадает с высотой страницы
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            // открытие модального окна
            openModal();
            //запрет на повторное событие скроллинга 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //вешаем событие скроллинга, при котором
    //при достижении конца страницы пользователем единажы выбрасывает модальное окно 
    window.addEventListener('scroll', showModalByScroll);
    //Модальное окно -----------------

    //использование класса для карточек 

    class MenuCard{
        //rest оператор нужен для того, чтобы добавлять элементы в функцию в безграниченном режиме
        //синтаксис ...название переменной, к которой обращаешься 
        //переменная будет как массив
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            //this.price = price;
            this.transfer = 27;
            this.price = price * this.transfer;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); 
            //this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }  

        render(){
            var element = document.createElement('div');

            //в этом участке проверяется, существует ли записи в массив классов,
            //если их нет, то добавляется дефолтный класс 
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                //то есть мы добавляем классы к новосозданному DIV 
                //соответственно, это будет оберткой для пораждаемых объектов 
                this.classes.forEach(classAdd =>{
                    element.classList.add(classAdd);
                });
            }
            element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
             <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
 
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        ".menu .container",
        'menu__item'
    ).render();

    //Анимация появления каточек
    var selectorCards = document.querySelectorAll(".menu__item");

    selectorCards.forEach(item =>{
        item.classList.add('fade', 'show');
        item.classList.remove('hide');
    });
    //Анимация появления каточек



    //отправка форм ------

    var forms = document.querySelectorAll('form');

    var message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        postData(item);
    });

   /* function postData(form){
        form.addEventListener('submit', (e) =>{
            //запрещаем странице перезагружаться 
            e.preventDefault();

            var statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);


            //создаем класс для отправки формы 
            var request = new XMLHttpRequest();

            //параметры 
            request.open('POST', 'server.php');

            //ЗАГОЛОВОЧНЫЙ ПАРАМЕТР НЕ НУЖЕН ДЛЯ ОБЩЕНИЯ С СЕРВЕРОМ
            //когда мы используем XML + FormData заголовок нам не нужен 

            //задаем структурированный запрос на сервер, передавая данные со страницы
            var fornData = new FormData(form);

            //отправляем на сервер 
            request.send(fornData);

            request.addEventListener('load', () =>{
                if(request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;

                    form.reset();
                    setTimeout( ()=>{
                        statusMessage.remove();
                    }, 2000);
                }else{
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }*/
    
    //если формат json 

    function postData(form){
        form.addEventListener('submit', (e) =>{
            //запрещаем странице перезагружаться 
            e.preventDefault();

            //помещаем спиннер, добавляя тег img
            var statusMessage = document.createElement('img');
            //берем путь 
            statusMessage.src = message.loading;

            statusMessage.setAttribute('data-spinner', '');
            //центруем спиннер
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //добаляем его 

            form.append(statusMessage);

            form.insertAdjacentElement('afterend', statusMessage);

            


            //создаем класс для отправки формы 
            var request = new XMLHttpRequest();

            //параметры 
            request.open('POST', 'server.php');

            //при отправки json фала необходимо использовать заголовки 
            request.setRequestHeader('Content-type', 'application/json');

            //задаем структурированный запрос на сервер, передавая данные со страницы
            var fornData = new FormData(form);

            var object = {};

            //заполняем объект 
            fornData.forEach((value, key) => {
                object[key] = value;
            });

            //переформатируем объект в json 
            var json = JSON.stringify(object);

            //отправляем на сервер 
            request.send(json);

            request.addEventListener('load', () =>{
                if(request.status === 200){
                    console.log(request.response);
                    //модальное окно, что все прошло успешно 
                    showThanksModal(message.success);

                    form.reset();
                    statusMessage.remove();
                }else{
                    //модальное окно того, что произошла ошибка 
                    showThanksModal(message.failure);
                }
            });

        });
    }

    //отправка форм ------

    function showThanksModal(message){
        //получаем модальное окно 
        var prevModalDialog = document.querySelector('.modal__dialog');
        //добавляем скрытие этого окна
        prevModalDialog.classList.add('hide');
        //затем открываем родительский элемент модального окна 
        //для того чтобы в него моместить сообщение 
        openModal();

        //добавляем элемент с классом, чтобы стили распространились и на окно с сообщением 
        var thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>
                    ×
                </div>
                <div class="modal__title">
                    ${message}
                </div>
            </div>
        `;
        //добавляем в родительский класс 
        document.querySelector('.modal').append(thanksModal);

        //через 4 секунды возобновится модальное окно 
        setTimeout(() =>{
           thanksModal.remove(); 

           prevModalDialog.classList.add('show');
           prevModalDialog.classList.remove('hide');

           closeModal();
        }, 4000);
    }
});