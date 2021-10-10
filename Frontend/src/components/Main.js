import React from 'react';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

  return (
<main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"></img>
                </div>
                
                <div className="profile__container">
                    <div className="profile__subcontainer">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        <button onClick={props.onEditProfile} type="button" aria-label="Отредактировать профиль"
                            className="profile__edition-button button-effects"></button>
                    </div>
                    <button type="button" aria-label="Добавить" id="add" onClick={props.onAddPlace}
                        className="profile__add-button button-effects"></button>
                </div>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card, i) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>
  );
}

export default Main;