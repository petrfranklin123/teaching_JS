"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Табы----------------------------
//нужно решить три задачи 
//1) нужно скрывать ненужную информацию 
//2) нужно раскрывать нужный таб 
//3) нужн выделять нужную страницу 
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTAbContent() {
    //скрываем все табы 
    tabsContent.forEach(function (item) {
      //чтобы появилась анимация добаляем в css классы 
      item.classList.add('hide');
      item.classList.remove('show', 'fade'); //item.style.display = 'none';
    }); // удаляем класс активности у табов

    tabs.forEach(function (tab) {
      tab.classList.remove('tabheader__item_active');
    });
  } //функция отработки нажатия, где i это название позиции слайда 


  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    //тоже часть анимации 
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide'); //tabsContent[i].style.display = "block";

    tabs[i].classList.add('tabheader__item_active');
  } //дефолтная страница


  hideTAbContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    var target = event.target; // с помощью делегирирования ищем нажатую облать и вызываем функции отработки 

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          hideTAbContent();
          showTabContent(i);
        }
      });
    }
  }); //Табы----------------------------
  //Таймер-------------------------- 
  //переменная, до которой будет отсчет 

  var deadline = '2020-12-31'; //функция, которая будет считать, сколько осталось времени 
  //до конца и создавать на выходе собранный объект 

  function getTimeRemaining(endtime) {
    // количество милисекунд 
    var t = Date.parse(endtime) - Date.parse(new Date()),
        // количество дней
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
        // количество часов
    hours = Math.floor(t / (1000 * 60 * 60) % 24),
        // количество минут 
    minutes = Math.floor(t / 1000 / 60 % 60),
        // количество секунд 
    seconds = Math.floor(t / 1000 % 60); // возврат объекта 

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  } //функция, которая принимает число и добавляет ноль в начало 
  //если число меньше 10


  function getZero(num) {
    if (num < 10) {
      return "0".concat(num);
    } else {
      return num;
    }
  } //функция для доступа к элементам DOM и запуска таймера 


  function setClock(selector, endtime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"); //из-за того, что функция setInterval начнет действовать только через 1 секунду
    //при одновлении страницы будет появляться изначальное значение 
    //чтобы избежать этого, нужно разово вызвать функцию счета времени

    updateClock(); //запуск регулярного обновления 

    var timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      //получение объекта с датой 
      var t = getTimeRemaining(endtime); //модуль обновления времени на странице

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds); //проверка, если милисекунд 0 или меньше, то таймер очищается

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  } //запуск функции обновления таймера 


  setClock('.timer', deadline); //Таймер-------------------------- 
  //Модальное окно -----------------

  var modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector(".modal");
  var prevModalDialogMAIN = document.querySelector('.modal__dialog');

  function openModal() {
    modal.classList.add('fade', 'show');
    modal.classList.remove('hide'); //свойство, которое запрещает скроллинг по странице, пока активно модальное окно 

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

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('fade', 'show'); //стираем свойство, чтобы была возможность скролить сайт после закрытия кмодального окна 

    document.body.style.overflow = '';
  } //перебор кнопок, которые вызывают модальное окно 


  modalTrigger.forEach(function (item) {
    item.addEventListener('click', function () {
      openModal();
    });
  }); // закрытие модального окна по нажатию по внешней области 

  modal.addEventListener('click', function (event) {
    //проверка условия, что пользовательно нажал на внешнюю облать 
    if (event.target == modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  }); //закрытие модального окна по Esc

  document.addEventListener('keydown', function (event) {
    if (event.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  }); //Модификация модального окна-----

  var modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    //window.pageYOffset то, сколько проскролил пользователь
    //document.documentElement.clientHeight размер области видимости на экране у пользователя
    //document.documentElement.scrollHeight вся высота страницы 
    // если сумма экрана и и длины скролла совпадает с высотой страницы
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      // открытие модального окна
      openModal(); //запрет на повторное событие скроллинга 

      window.removeEventListener('scroll', showModalByScroll);
    }
  } //вешаем событие скроллинга, при котором
  //при достижении конца страницы пользователем единажы выбрасывает модальное окно 


  window.addEventListener('scroll', showModalByScroll); //Модальное окно -----------------
  //использование класса для карточек 

  var MenuCard =
  /*#__PURE__*/
  function () {
    //rest оператор нужен для того, чтобы добавлять элементы в функцию в безграниченном режиме
    //синтаксис ...название переменной, к которой обращаешься 
    //переменная будет как массив
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr; //this.price = price;

      this.transfer = 27;
      this.price = price * this.transfer;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector); //this.changeToUAH();
    }

    _createClass(MenuCard, [{
      key: "changeToUAH",
      value: function changeToUAH() {
        this.price = this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var element = document.createElement('div'); //в этом участке проверяется, существует ли записи в массив классов,
        //если их нет, то добавляется дефолтный класс 

        if (this.classes.length === 0) {
          this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
          //то есть мы добавляем классы к новосозданному DIV 
          //соответственно, это будет оберткой для пораждаемых объектов 
          this.classes.forEach(function (classAdd) {
            element.classList.add(classAdd);
          });
        }

        element.innerHTML = "\n            <img src=\"".concat(this.src, "\" alt=\"").concat(this.alt, "\">\n            <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n            <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n            <div class=\"menu__item-divider\"></div>\n            <div class=\"menu__item-price\">\n             <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n                    <div class=\"menu__item-total\"><span>").concat(this.price, "</span> \u0433\u0440\u043D/\u0434\u0435\u043D\u044C</div>\n                </div>");
        this.parent.append(element);
      }
    }]);

    return MenuCard;
  }();

  var getResource = function getResource(url) {
    var res;
    return regeneratorRuntime.async(function getResource$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch(url));

          case 2:
            res = _context.sent;

            if (res.ok) {
              _context.next = 5;
              break;
            }

            throw new Error("Cloud not fetch ".concat(url, ", status: ").concat(res.status));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(res.json());

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  }; //вывод на страницу карточек (обращаемся по адресу меню)


  getResource("http://localhost:3000/menu").then(function (data) {
    // производим деструктуризацию приходящих объектов {}
    data.forEach(function (_ref) {
      var img = _ref.img,
          altimg = _ref.altimg,
          title = _ref.title,
          descr = _ref.descr,
          price = _ref.price;
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
  selectorCards.forEach(function (item) {
    item.classList.add('fade', 'show');
    item.classList.remove('hide');
  }); //Анимация появления каточек
  //отправка форм ------

  var forms = document.querySelectorAll('form');
  var message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы скоро с вами свяжемся!',
    failure: 'Что-то пошло не так'
  };
  forms.forEach(function (item) {
    bindpostData(item);
  }); //если формат json 
  //передаем url и данные data
  //так как fetch это асинхронный код, то оперетор присвояения в res не будет 
  //ожидать ответа на запрос, он присвоит сразу 
  //и это вызовет в дальнейшем ошибку 
  //для этого нужно испльзовать конструкцию async await
  //async - необходим для того, чтобы сказать, что в данном фрагменте существует асинхронный код
  //await  - нужен для пометки, что в этом местк есть асинхронный код 

  var postData = function postData(url, data) {
    var res;
    return regeneratorRuntime.async(function postData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(fetch(url, {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: data
            }));

          case 2:
            res = _context2.sent;
            _context2.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  function bindpostData(form) {
    form.addEventListener('submit', function (e) {
      //запрещаем странице перезагружаться 
      e.preventDefault(); //помещаем спиннер, добавляя тег img

      var statusMessage = document.createElement('img'); //берем путь 

      statusMessage.src = message.loading;
      statusMessage.setAttribute('data-spinner', ''); //центруем спиннер

      statusMessage.style.cssText = "\n                display: block;\n                margin: 0 auto;\n            "; //добаляем его 

      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage); //Собираем данные из формы 

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

      postData("http://localhost:3000/requests", json).then(function (data) {
        //data - это данные, которые вернулись из промиса 
        console.log(data); //модальное окно, что все прошло успешно 

        showThanksModal(message.success);
        statusMessage.remove();
      })["catch"](function () {
        // при ошибке в запроса
        showThanksModal(message.failure); //в любом случае очищаем форму
      })["finally"](function () {
        form.reset();
      });
    });
  } //отправка форм ------


  function showThanksModal(message) {
    //получаем модальное окно 
    var prevModalDialog = document.querySelector('.modal__dialog'); //добавляем скрытие этого окна

    prevModalDialog.classList.add('hide'); //затем открываем родительский элемент модального окна 
    //для того чтобы в него моместить сообщение 

    openModal(); //добавляем элемент с классом, чтобы стили распространились и на окно с сообщением 

    var thanksModal = document.createElement('div');
    thanksModal.classList.add('.modal__dialog');
    thanksModal.innerHTML = "\n            <div class=\"modal__content\">\n                <div class=\"modal__close\" data-close>\n                    \xD7\n                </div>\n                <div class=\"modal__title\">\n                    ".concat(message, "\n                </div>\n            </div>\n        "); //добавляем в родительский класс 

    document.querySelector('.modal').append(thanksModal); //через 4 секунды возобновится модальное окно 

    setTimeout(function () {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  } //чтобы проинициализировать наш проект надо прописать 
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


  fetch('db.json').then(function (data) {
    return data.json();
  }).then(function (res) {
    return console.log(res);
  }); // чтобы включить json-server нужно прописать команду npx json-server db.json
  //после включения сервера, нам стали доступные ссылки
  //http://localhost:3000/menu
  //http://localhost:3000/requests
  //где первая, это наша база данных 
  //А вторая, это куда мы будем постить данные 

  fetch('http://localhost:3000/menu').then(function (data) {
    return data.json();
  }).then(function (res) {
    return console.log(res);
  }); // в дальнейшем необходимо запускать два сервера
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
  var offset = 0; //стилизация полосы прокрутки катринок

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all"; //обрезка содержимого 

  slidesWrapper.style.overflow = "hidden"; //устанавливаем одинаковую ширину (ширину окна предка) для каждого слайда

  slides.forEach(function (slide) {
    slide.style.width = width;
  }); //начальное значение слайдера 

  setNachZnach();
  slider.style.position = "relative"; //создаем элемент 

  var indicators = document.createElement("ol"),
      dots = [];
  indicators.classList.add('carousel-indicators'); //добавляем элемент 

  slider.append(indicators); //добавляем навигацию

  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("li"); //добавляем элементу атрибут с конкретным индексом 

    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", function () {
    if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, "");
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (sliderIndex == slides.length) {
      sliderIndex = 1;
    } else {
      sliderIndex++;
    }

    if (slides.length < 10) {
      current_slides.textContent = "0".concat(sliderIndex);
    } else {
      current_slides.textContent = sliderIndex;
    }

    dots.forEach(function (dot) {
      return dot.style.opacity = "0.5";
    });
    dots[sliderIndex - 1].style.opacity = "1";
  });
  prev.addEventListener("click", function () {
    if (offset == 0) {
      offset = +width.replace(/\D/g, "") * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, "");
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (sliderIndex == 1) {
      sliderIndex = slides.length;
    } else {
      sliderIndex--;
    }

    if (slides.length < 10) {
      current_slides.textContent = "0".concat(sliderIndex);
    } else {
      current_slides.textContent = sliderIndex;
    }

    dots.forEach(function (dot) {
      return dot.style.opacity = "0.5";
    });
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

  indicators.addEventListener("click", function (e) {
    //получаем все элементы класса dot вложенные в indicator
    if (e.target.className == "dot") {
      //записываем значение атрибута в переменную
      var slideTo = e.target.getAttribute('data-slide-to'); //переприсваиваем значение sliderIndex

      sliderIndex = slideTo; //первым множетелем выступает ширина видимого блока, второй индекс картинки

      offset = +width.replace(/\D/g, "") * (slideTo - 1); //перемещение в заданную ширину

      slidesField.style.transform = "translateX(-".concat(offset, "px)");

      if (slides.length < 10) {
        current_slides.textContent = "0".concat(sliderIndex);
      } else {
        current_slides.textContent = sliderIndex;
      } //сначала присваиваем всем индикаторам полупрозрачность 


      dots.forEach(function (dot) {
        return dot.style.opacity = "0.5";
      }); //следом раскрываем конкретный 

      dots[sliderIndex - 1].style.opacity = "1";
    }
  }); //установка начального значения 

  function setNachZnach() {
    offset = 0;
    sliderIndex = 1;
    slidesField.style.transform = "translateX(-".concat(offset, "px)");
    current_slides.textContent = "0".concat(sliderIndex);
  }
});