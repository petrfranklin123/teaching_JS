/*var timerId = setTimeout(() => {
    console.log("hello");
}, 2000);

timerId = setTimeout((text) => {
    console.log(text);
}, 2000, "Hello");*/

/*если нам нужно передать какие-нибудь параметры в шункуцию 
var timerId = setTimeout(() => {
    console.log("hello");
}, 2000);

нужно после времени передать необходимые параметры 
этот параметр перейдет в функцию 

var timerId = setTimeout((text) => {
    console.log(text);
}, 2000, "Hello");
*/

//В переменные записывают функции setTimeout(), для того, чтобы записать информацию ID
//этой функции, тчобы ее впоследствии отключить с помощью функции clearInterval()
//куда в качестве параметра записать переменную 
/*function logger(){
    if(i == 3){
        clearInterval(timerId);
    }
    console.log("text");
    i++;
}

var btn = document.querySelector('.btn');
var timerId;
var i = 0;


btn.addEventListener('click', () =>{
    //var timerId = setTimeout(logger, 2000);
    timerId = setInterval(logger, 500);
});*/


//var timerId = setTimeout(logger, 2000);

var btn = document.querySelector('.btn');

function myAnimation(){
    var elem = document.querySelector('.box');

    let pos = 0;
    var id = setInterval(frame, 10);
    function frame(){
        if(pos == 300){
            clearInterval(id);
        }else{
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}

btn.addEventListener('click', myAnimation);
















