/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */



/*var addingInput = document.querySelector('.adding__input');
console.log(addingInput);

var favoritInput = document.querySelector('.favorit__input');
console.log(favoritInput);

var addingBtn = document.querySelector('.adding__btn');
console.log(addingBtn);


addingBtn.addEventListener('click', addFilm);

function addFilm(event){
    event.preventDefault();
    console.log(addingInput.value);
    var i = movieDB.movies.length;
    var inputLength = addingInput.value;
    addingInput.value = "";
    if(inputLength.length > 21){
        console.log("Больше 21");
        inputLength = inputLength.substr(0, 21);
        inputLength = inputLength + "...";
    }
    if(favoritInput.checked){
        console.log('checked');
    }
    movieDB.movies[i] = inputLength;
    console.log(movieDB.movies);

    documentSelector.films();
}
*/
// ожидает загрузки структуры документа 
document.addEventListener('DOMContentLoaded', () =>{

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ],
        //favorite: []
    };
    var movieList = document.querySelector(".promo__interactive-list");
    var addForm = document.querySelector(".add"),
        addInput = addForm.querySelector(".adding__input"),
        checkbox = addForm.querySelector(".favorit__input");

    //добавляем форме событие submit (нажатие кнопки)
    addForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        var newFilm = addInput.value;
        var favorite = checkbox.checked;

        //Если не пустая строка
        if(newFilm){
            if(newFilm.length > 21){
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if(favorite){
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            movieDB.movies.sort();
            
            documentSelector.createMuvieList(movieDB.movies, movieList);
        }

        //сброс формы 
        event.target.reset();

    });




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
            /*var films = document.querySelectorAll('.promo__interactive-item');
            movieDB.movies.sort();
            for(let i = 0; i < films.length; i++){
                films[i].innerHTML = `${i + 1} ${movieDB.movies[i]} <div class="delete"></div>`;
            }*/
            //var movieList = document.querySelector(".promo__interactive-list");
            movieList.innerHTML = "";
            movieDB.movies.sort();
            movieDB.movies.forEach((film, i) =>{
                movieList.innerHTML += `
                <li class="promo__interactive-item"> ${i + 1} ${film}
                    <div class="delete"></div>
                </li>
                `;
            });
        },
        createMuvieList: function(films, parent){

            parent.innerHTML = "";
            movieDB.movies.sort();
            films.forEach((film, i) =>{
                parent.innerHTML += `
                <li class="promo__interactive-item"> ${i + 1} ${film}
                    <div class="delete"></div>
                </li>
                `;
            });

            document.querySelectorAll(".delete").forEach((btn, i) =>{
                btn.addEventListener('click', () =>{
                    //выбираем родительский элемент 
                    btn.parentElement.remove();
                    //удаляем элемент из нашей базы данных
                    //говоря какой элемент по индексу удалить и сколько, у нас он 1
                    movieDB.movies.splice(i, 1);
                    //вызываем функцию, чтобы нумерация не сбивалась 
                    documentSelector.createMuvieList(films, parent);
                });
            });
        }
    };
    
    documentSelector.adblock();
    documentSelector.genre();
    documentSelector.posterImg();
    //documentSelector.films();
    documentSelector.createMuvieList(movieDB.movies, movieList);
});




