import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
            avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
        });
      } 

    return(
        <PopupWithForm name="avatar-update" isOpen={isOpen} onClose={onClose} title="Обновить аватар" textOnButton="Сохранить" onSubmit={handleSubmit}>
        <input name="updateAvatar" id="avatar" className="form__input-info form__input-info_type_avatar" type="url"
        placeholder="Ссылка на аватар" ref={avatarRef} required></input>
        <span className="form__input-info-error" id="avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup