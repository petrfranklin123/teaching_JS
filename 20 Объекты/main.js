// Объекты в js это ассоциативные массивы 

const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    },
    makeTest: function(){
        console.log("Test");
    }
};

//находим количество элементов в объекте
let counter = 0;
//если в объекте есть еще один вложенный объект 
//то обычный перебор цикла тут не поможет 
//нужно условие, которое будет проверять, является ли перебираемый элемент вложенным объектом
for (let key in options){
    //проверяем тип данных, на то что он является объектом 
    if(typeof(options[key] == 'object')){
        for(let i in options[key]){
            console.log(`Свойство ${i} имеет значение ${options[key][i]}`); 
            
            counter++;
        }
    }else{
        console.log(`Свойство ${key} имеет значение ${options[key]}`);

        counter++;
    }
}
console.log(counter);
//Object.keys(options) выводит наименования элементов в объекте
//Далее производится вывод количества элементов в массиве с помощью length
console.log(Object.keys(options).length);

options.makeTest();

//Деструктуризация объектов, это доступ к вложенным объетов и раздробление на более мелкие элементы 
//в данном случае мы вписываем элементы из вложенного объекта 
const {border, bg} = options.colors;
console.log(border);