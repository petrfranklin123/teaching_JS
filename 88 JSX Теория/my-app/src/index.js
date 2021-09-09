import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

// все названия функций должны быть с большой буквы  

//объекты в JSX поместить нельзя!

// в реакте нельзя добавлять вредоносный код, так как весь контент 
//выброшенный на страницу является строкой 



const Header = () =>{
    return <h2>Hello world!</h2>
}

const Field = () =>{
    //добавим стилей к форме
    const holder = "Enter here";
    const styleField = {
        width: '300px'
    }

    return <input 
    //добавление стилей 
    style={styleField}
    type="text" 
    //placeholder="Type here"
    placeholder={holder}
    autoComplete=""
    //классы добавляются с помощью атрибута className 
    className="first"
    htmlFor="" 
    />
}


const Btn = () =>{
    const text = "Log in";
    const res = ()=>{
        return "Login in please";
    }
    const p = <p>Login in</p>
    //передаем параметр p
    //return <button>{p}</button>

    //передаем функцию 
    //return <button>{res()}</button>
    return <button>{p}</button>
}

//нельзя вывести все сущности, не обернув их в тег
//связано это с тем, что это работает через createElement
//который добавляет элемент 

const App = () =>{
    return (
        <div>

            <Header/>
            <Field/>
            <Btn/>

        </div>
    )
}


//ReactDOM.render(<App />,document.getElementById('root'));
ReactDOM.render(<App />,document.getElementById('root'));

