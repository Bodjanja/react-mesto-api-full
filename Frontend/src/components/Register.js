import React from "react";
import { Link } from "react-router-dom";

export default function Register({redirectHandler, onRegister}){
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        onRegister(password, email)
    }
    
        return(
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2 className='popup__title popup__title_alternative'>Регистрация</h2>
            <form className='form form_alternative' onSubmit={handleSubmit}>
                <fieldset className='form__item form__item_alternative'>
                    <input name='email' type='email' className='form__input-info form__input-info_alternative' placeholder='Email' onChange={handleEmailChange}></input>
                    <input name='password' type='password' className='form__input-info form__input-info_alternative' placeholder='Пароль' onChange={handlePasswordChange}></input>
                    <button className='popup__submit-button popup__submit-button_alternative'>Зарегистрироваться</button>
                </fieldset>
            </form>
            <Link to='/sign-in' onClick={redirectHandler} className='link button-effects'>Уже зарегистрированы? Войти</Link>
            </div>
        )
}