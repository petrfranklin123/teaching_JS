//callback функции необходимы для осуществления структуры последовательности работы функций 


function first(){
    setTimeout(function(){
        console.log(1);
    }, 500);
}

function second(){
    console.log(2);
}

//в данном случае проблема заключается в то, что первая функция начинает работь первой, 
//но результат приходит после выполнения второй функции 
first();

second();


function learnJS(lang, callback){
    console.log(`Я учу: ${lang}`);
    //после этого момента вызывается следующая функция 
    callback();
}

learnJS('JS', function(){
    console.log('Я прошел этот урок!');
});

function done(){
    console.log('Я прошел этот урок!');
}

learnJS('JS', done);

