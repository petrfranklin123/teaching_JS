// событие нажатия на клавишу 
// touchstart
// событие зажатого тача
// touchmove
// событие отжатого тача 
// touchend

// палец зашел в область объекта
// touchenter
// палец вышел за пределы объекта 
// touchleave
// палец вышел за пределы браузера 
// touchcansel

//

// событие полной загрузки документа 
window.addEventListener('DOMContentLoaded', () =>{
    var box = document.querySelector('.box');

    box.addEventListener('touchstart', (e) =>{
        e.preventDefault();
        console.log("Start");

        //количество зажатых пальцев 
        console.log(e.touches);
    });

    box.addEventListener('touchmove', (e) =>{
        e.preventDefault();
        console.log("Move");
    });

    box.addEventListener('touchend', (e) =>{
        e.preventDefault();
        console.log("End");
    });
});

