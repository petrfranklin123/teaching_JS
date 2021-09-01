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
});