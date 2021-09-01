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

    var getResource = async (url) => {
        var res = await fetch(url);
        //проверка на ошибки, если произошла ошибка 
        if(!res.ok){
            //чтобы ошибка была выкинута, нужно использловать метод throw
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
        }
        //получаем текст и трансформируем его в формат json 
        return await res.json();
    };
    //вывод на страницу карточек (обращаемся по адресу меню)
    getResource("http://localhost:3000/menu")
        .then(data =>{
            // производим деструктуризацию приходящих объектов {}
            data.forEach(({img, altimg, title, descr, price})=>{
                //создание объекта карточки для вывода на страницу 
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    /*new MenuCard(
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
    ).render();*/

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
        bindpostData(item);
    });
    
    //если формат json 

    //передаем url и данные data
    //так как fetch это асинхронный код, то оперетор присвояения в res не будет 
    //ожидать ответа на запрос, он присвоит сразу 
    //и это вызовет в дальнейшем ошибку 
    //для этого нужно испльзовать конструкцию async await
    //async - необходим для того, чтобы сказать, что в данном фрагменте существует асинхронный код
    //await  - нужен для пометки, что в этом местк есть асинхронный код 
    var postData = async (url, data) => {
        var res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        //получаем текст и трансформируем его в формат json 
        return await res.json();
    };


    function bindpostData(form){
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

            //Собираем данные из формы 
            var formData = new FormData(form);
            
            
            /*var object = {};
            //заполняем объект 
            fornData.forEach((value, key) => {
                object[key] = value;
            });*/

            //более совершенный способ формирования json формата
            //formData.entries() создает массив массивов (двумерный массив)
            //Object.fromEntries() создает объект из этого массива 
            //JSON.stringify() превращение в json формат объекта 
            var json = JSON.stringify(Object.fromEntries(formData.entries()));

            /*fetch("server.php",{
                method: "POST",
                //устанавливаем заголовки 
                headers: {
                    'Content-type': 'application/json'
                },
                //записываем в тело уже форматированный JSON объект
                body: JSON.stringify(object)
                //форматируем ответ от сервера в виде текста чтобы вывести его 
            })*/

            //заменяем вышестоящий метод одной строкой 
            postData("http://localhost:3000/requests", json)
            .then(data => {
                //data - это данные, которые вернулись из промиса 
                console.log(data);
                //модальное окно, что все прошло успешно 
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                // при ошибке в запроса
                showThanksModal(message.failure);
                //в любом случае очищаем форму
            }).finally(() => {
                form.reset();
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

    //чтобы проинициализировать наш проект надо прописать 
    //npm init 
    //появится файл package.json, в котором содержится информация о нашем проекте 
    //этот файл будет содержать всю информауию о нашем проекте, а так же какие пакеты npm подключены к нему

    // устанавливаем json сервер 
    // npm install json-server , далее нужно указать, является ли проект глобальным -g 
    // если нет, то можно просто пропустить 
    //следом в этой же команде прописываем флаг --save-dev (только для разработки) или --save

    //появится папка node_modules, в которой ничего менять не нужно 
    //и не стоит ее копировать в репозиторий на GIT, так как ее можно подтянуть в среде npm 

    //а так же появится файл packege-look.json

    //этот код работает до включения сервера, то есть мы обращаемся к самому файлу json 
    // и в итоге получаем объект 
    fetch('db.json') 
    .then(data => {
        return data.json();
    }).then(res =>{
        return console.log(res);
    });

    // чтобы включить json-server нужно прописать команду npx json-server db.json
    //после включения сервера, нам стали доступные ссылки
    //http://localhost:3000/menu
    //http://localhost:3000/requests
    //где первая, это наша база данных 
    //А вторая, это куда мы будем постить данные 
    fetch('http://localhost:3000/menu') 
    .then(data => {
        return data.json();
    }).then(res =>{
        return console.log(res);
    });

    // в дальнейшем необходимо запускать два сервера

    //---------------- слайдер 1 ----------------//

    /*var slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current_slides = document.querySelector("#current"),
        total_slides = document.querySelector("#total");
    var sliderIndex = 1;

    showSlider(1);
    total_slides.textContent = `0${slides.length}`;
    
    function showSlider(n){
        if(n > slides.length){
            sliderIndex = 1;
        }else if(n < 1){
            sliderIndex = slides.length;
        }

        slides.forEach((item) =>{
            item.style.display = "none";
        });

        slides[sliderIndex - 1].style.display = "block";

        current_slides.textContent = `0${sliderIndex}`;

    }

    prev.addEventListener("click", ()=>{
        sliderIndex-- ;
        showSlider(sliderIndex);
    });
    next.addEventListener("click", ()=>{
        sliderIndex++ ;
        showSlider(sliderIndex);
    });*/

    //---------------- слайдер 2 ----------------//

    var slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current_slides = document.querySelector("#current"),
    total_slides = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    // в данной конструкции мы получаем ширину блока со слайдами
    //таким образом мы можем обратиться к любым стилям на странице 
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(".offer__slider");

var sliderIndex = 1;
var offset = 0;
//стилизация полосы прокрутки катринок
slidesField.style.width = 100 * slides.length + "%";
slidesField.style.display = "flex";
slidesField.style.transition = "0.5s all";
//обрезка содержимого 
slidesWrapper.style.overflow = "hidden";

//устанавливаем одинаковую ширину (ширину окна предка) для каждого слайда
slides.forEach((slide) =>{
    slide.style.width = width;
});
//начальное значение слайдера 
setNachZnach();

slider.style.position = "relative";

//создаем элемент 
var indicators = document.createElement("ol"),
    dots = [];
indicators.classList.add('carousel-indicators');
//добавляем элемент 
slider.append(indicators);

//добавляем навигацию
for(var i = 0; i < slides.length; i++){
    var dot = document.createElement("li");
    //добавляем элементу атрибут с конкретным индексом 
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add("dot");

    if(i == 0){
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
}




next.addEventListener("click", ()=>{
    if(offset == +width.replace(/\D/g, "") * (slides.length - 1)){
        offset = 0;
    }else{
        offset += +width.replace(/\D/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(sliderIndex == slides.length){
        sliderIndex = 1;
    }else{
        sliderIndex++;
    }

    if(slides.length < 10){
        current_slides.textContent = `0${sliderIndex}`;
    }else{
        current_slides.textContent = sliderIndex;
    }

    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[sliderIndex - 1].style.opacity = "1";

});

prev.addEventListener("click", ()=>{
    if(offset == 0){
        offset = +width.replace(/\D/g, "") * (slides.length - 1);
    }else{
        offset -= +width.replace(/\D/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(sliderIndex == 1){
        sliderIndex = slides.length;
    }else{
        sliderIndex--;
    }

    if(slides.length < 10){
        current_slides.textContent = `0${sliderIndex}`;
    }else{
        current_slides.textContent = sliderIndex;
    }

    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[sliderIndex - 1].style.opacity = "1";
});

/*dots.forEach(dot =>{
    dot.addEventListener("click", e =>{
        var slideTo = e.target.getAttribute('data-slide-to');

        sliderIndex = slideTo;

        offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10){
            current_slides.textContent = `0${sliderIndex}`;
        }else{
            current_slides.textContent = sliderIndex;
        }

        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[sliderIndex - 1].style.opacity = "1";
    });
});*/

indicators.addEventListener("click", e =>{
    //получаем все элементы класса dot вложенные в indicator
    if(e.target.className == "dot"){
        //записываем значение атрибута в переменную
        var slideTo = e.target.getAttribute('data-slide-to');
        //переприсваиваем значение sliderIndex
        sliderIndex = slideTo;
        //первым множетелем выступает ширина видимого блока, второй индекс картинки
        offset = +width.replace(/\D/g, "") * (slideTo - 1);
        //перемещение в заданную ширину
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10){
            current_slides.textContent = `0${sliderIndex}`;
        }else{
            current_slides.textContent = sliderIndex;
        }

        //сначала присваиваем всем индикаторам полупрозрачность 
        dots.forEach(dot => dot.style.opacity = "0.5");
        //следом раскрываем конкретный 
        dots[sliderIndex - 1].style.opacity = "1";
    }
});

//установка начального значения 
function setNachZnach(){
    offset = 0;
    sliderIndex = 1;
    slidesField.style.transform = `translateX(-${offset}px)`;
    current_slides.textContent = `0${sliderIndex}`;
}

//------------ калькулятор калорий 

var result = document.querySelector(".calculating__result span"),
    sex = "female", 
    height, 
    weight, 
    age, 
    ratio = 1.375;

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "_____";
            return;
        }
        if(sex == "female"){
            result.textContent = Math.round(( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass){
        //получаем все дивы из родителя parentSelector
        var elements = document.querySelectorAll(`${parentSelector} div`);

        //В данном случае делегирование событий не применимо
        elements.forEach(elem =>{
            elem.addEventListener('click', (e)=>{
                //проверяем, если у блоока есть этот атрибут 
                if(e.target.getAttribute("data-ratio")){
                    ratio = +e.target.getAttribute("data-ratio");
                }else{
                    sex = e.target.getAttribute("id");
                }
    
                console.log(ratio, sex);
    
                elements.forEach(elem =>{
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });


    }

    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getDinamicInformation(selector){
        var input = document.querySelector(selector);

        input.addEventListener("input", ()=>{
            switch(input.getAttribute("id")){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
            console.log(height);
            console.log(weight);
            console.log(age);
        });
    }
    getDinamicInformation("#height");
    getDinamicInformation("#weight");
    getDinamicInformation("#age");
});