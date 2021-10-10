import React from 'react'

function ImagePopup(props){

    return(
        <div className={`popup popup_type_photo ${props.card.link ? 'popup_opened' : ''}`}>
        <div className="popup__figurecaption">
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <p className="popup__caption">{props.card.name}</p>
            <button type="button" aria-label="Закрыть картинку" className="popup__close popup__close_type_photo" onClick={props.onClose}></button>
        </div>
    </div>
    )
}

export default ImagePopup