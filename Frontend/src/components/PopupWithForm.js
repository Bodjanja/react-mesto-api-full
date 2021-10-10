import React from 'react'

function PopupWithForm (props) {

    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <form name={props.name} className={`form form_type_${props.name}`} onSubmit={props.onSubmit} noValidate>
                <fieldset className="form__item">
                    {props.children}
                    {/* Этот пропс передаёт уникальную разметку для разных попапов */}
                    <button type="submit" className="popup__submit-button popup__submit-button_edition" value="Save"
                        aria-label="Добавить новую информацию профиля">{props.textOnButton}</button>
                </fieldset>
            </form>
            <button type="button" aria-label="Закрыть редактирование" className="popup__close popup__close_type_profile" onClick={props.onClose}></button>
        </div>
    </div>
        )
    }
    
    export default PopupWithForm;