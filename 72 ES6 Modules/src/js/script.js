//импортируем 
/*
import {one, two, sayHi} from  './main';

console.log(`${one} и ${two}`);

sayHi();
*/
// data - название класса, к которому будет вестить обращение 
// альтернативный способ обращения 
import * as data from './main';

console.log(`${data.one} и ${data.two}`);

data.sayHi();

