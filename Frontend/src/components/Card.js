import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props){

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `button-effects ${isOwn ? 'element__bin' : 'element__bin_hidden'}`
);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
    `element__icon ${isLiked ? 'element__icon_liked' : ''}`
); 

    function handleClick() {
        props.onCardClick(props.card);
        // console.log(props.card)
      }

    function handleLikeClick() {
        props.onCardLike(props.card);
      }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }    

    return(
        <li className="element">
                <img className="element__image" src={props.card.link} alt="" onClick={handleClick}/>
                <div className="element__container">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__subcontainer">
                        <button type="button" aria-label="Поставить лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <p className="element__like-counter">{props.card.likes.length}</p>
                    </div>
                </div>
                <button type="button" aria-label="Удалить карточку" id="removebutton"
                    className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            </li>
    )
}

export default Card