'use strict'

console.log('Загрузка данных');

//если нужно сделать так, чтобы определенное действие произошло после четкого события 
//необходимы промисы 
//в промисах в качестве параметров (функций) для функции передается
//resolve - при положительном результате
//reject - при отрицательном результате 

//Логика промисов такая: если прошло все успешно, то через resolve мы отправляем данные 
//в следующий узел, где так же может оказаться промис со своим ветвлением 

var req = new Promise(function(resolve, reject){
    setTimeout(() =>{
        console.log('Подготовка данных');

        var product = {
            name: 'TV',
            price: 2000
        };

        // resolve в данном случае он работает как указатель на функцию
        //которую переделаи в промис, соответственно параметры уйдут непосредственно в функцию
        resolve(product);
    }, 2000);
});
/*
// второй промис
req.then((product) => {

    //создаем еще один промис 

    var req2 = new Promise((resolve, reject) =>{

        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });

    //используем второй промис
    req2.then((data) =>{
        console.log(data);
    });
    setTimeout(() => {
        product.status = 'order';
        console.log(product);
    }, 2000);
});*/

req.then((product) => {

    //создаем еще один промис 

    var req2 = new Promise((resolve, reject) =>{

        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });

    //используем второй промис
    req2.then((data) =>{
        console.log(data);
    });
    /*setTimeout(() => {
        product.status = 'order';
        console.log(product);
    }, 2000);*/

    
});





