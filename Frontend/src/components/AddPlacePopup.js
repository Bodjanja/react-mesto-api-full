import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  React.useEffect(() => {
    return () => {
      placeNameRef.current.value = "";
      placeLinkRef.current.value = "";
    };
  }, [isOpen]);

  return (
    <PopupWithForm name="type_addition" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Новое место" textOnButton="Создать">
      <input id="newplace" name="additionName" className="form__input-info form__input-info_type_place" type="text" placeholder="Название" required minLength="2" maxLength="30" ref={placeNameRef}></input>
      <span className="form__input-info-error" id="newplace-error"></span>
      <input id="newplaceimg" name="additionPhoto" className="form__input-info form__input-info_type_image" type="url" placeholder="Ссылка на картинку" ref={placeLinkRef} required></input>
      <span className="form__input-info-error" id="newplaceimg-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
