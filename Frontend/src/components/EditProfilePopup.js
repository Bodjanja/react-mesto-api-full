import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    //Меняем значение состояния имени и описания пользователя на ту информацию, которая приходит из API
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  return (
    <PopupWithForm name="type_profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Редактировать профиль" textOnButton="Сохранить">
      <input id="username" name="name" type="text" className="form__input-info form__input-info_type_name" required placeholder="Введите имя" minLength="2" maxLength="40" onChange={handleNameChange} value={name || ""}></input>
      <span className="form__input-info-error" id="username-error"></span>
      <input id="description" name="description" type="text" className="form__input-info form__input-info_type_description" required placeholder="Введите описание" minLength="2" maxLength="200" onChange={handleDescriptionChange} value={description || ""}></input>
      <span className="form__input-info-error" id="description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
