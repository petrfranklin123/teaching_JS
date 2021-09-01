
'use strict';

var persone = {
    name: 'Alex',
    tel: '+74444444',
    parents: {
        mom: 'Olga',
        dad: 'Mike',
        sisters: {
            sis: 'Kate',
            sister: {
                sisr: 'Kate'
            }
        }
    }
};

//метод stringify позволяет создать JSON строку из объекта 
//обычно используется для преобразования объекта и переслке на сервер 

//parse необходим для раскодировки JSON в обычный формат, туда помещается JSON строка 

console.log(JSON.stringify(persone));
console.log(JSON.parse(JSON.stringify(persone)));

//данный метод позволяет делать глубокую копию объекта, большой вложенности 
var clone = JSON.parse(JSON.stringify(persone));

//изменяем у клона параметр 
clone.parents.sisters.sister.sisr = 'Dasha';

console.log(clone);
console.log(persone);



