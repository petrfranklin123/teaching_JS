/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

//объект класса, в котором прописаны функциональные части 
var documentSelector = {
    //удаление рекламы 
    adblock: function(){
        var banner = document.querySelectorAll('.promo__adv > img');
        banner.forEach(item => {
            item.remove();
        });
    },
    //изменение жанра фильма 
    genre: function(){
        var genre = document.querySelector('.promo__genre');
        genre.textContent = "Драма";
    },
    //изменение заднего фона 
    posterImg: function(){
        var promoBg = document.querySelector('.promo__bg');
        console.log(promoBg);
        promoBg.style.cssText = 'background: url(img/bg.jpg) center center/cover no-repeat; background-position: top';
    },
    //Добавление из объекта название фильмов
    films: function(){
        var films = document.querySelectorAll('.promo__interactive-item');
        movieDB.movies.sort();
        for(let i = 0; i < films.length; i++){
            films[i].innerHTML = `${i + 1} ${movieDB.movies[i]} <div class="delete"></div>`;
        }

    }
};

documentSelector.adblock();
documentSelector.genre();
documentSelector.posterImg();
documentSelector.films();


