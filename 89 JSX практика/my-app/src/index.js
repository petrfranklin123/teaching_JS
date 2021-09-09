import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//подключаем главный файл с компонентами 
//import App from './components/app/app';
//по умолчанию react ищет файл index.js 
import App from './components/app';


ReactDOM.render(<App />,document.getElementById('root'));
