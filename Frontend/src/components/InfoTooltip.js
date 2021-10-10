import React from "react";
import accept from "../images/accept.svg"
import reject from "../images/reject.svg"

export default function InfoTooltip({isRegistred, isOpen, onClose, registerSuccess, registerFail}){
    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container_alternative'>
            <img alt={isRegistred ? 'данные корректны' : 'данные некорректны'} src={isRegistred ? accept : reject} />
            <h2 className='popup__title' style={{textAlign: 'center', marginTop: 32}}>{isRegistred ? registerSuccess : registerFail}</h2>
            <button type="button" aria-label="Закрыть редактирование" className="popup__close popup__close_type_profile" onClick={onClose}></button>
            </div>
        </div>
    )
}