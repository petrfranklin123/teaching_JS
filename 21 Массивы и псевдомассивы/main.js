
var arr = [2, 3, 6, 8, 10];

//forEach(function(item, i, arr){}); данный метод перебирает массив 
//где переменные, передаваемые в функцию могут по-разному быть обозваны 
//item - перебираемый элемент 
//i - индекс элемента 
//arr - массив 
//но в этом методе нельзя выйти из цикла через break или пропустить с помощью continue 
arr.forEach(function(item, i, arr){
    console.log(`${i}: ${item} внутри массива ${arr}`);
});


var str = prompt("", "");

//разделяем по запятой 
var products = str.split(", ");

//склеиваем элементы массива в строку и разделяем символом ;
console.log(products.join('; '));
console.log(products);