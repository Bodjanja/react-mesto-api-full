import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';

import Register from "./Register";
import Login from "./Login"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";

import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";

import * as auth from "../utils/auth";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //Хуки-переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [signinPageActive, setSigninPageActive] = React.useState(true);
  const [isRegistred, setIsRegistred] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState('')

  const [currentUser, setCurrentUser] = React.useState({}); //Хук состояния для рендера информации о профиле
  const [cards, setCards] = React.useState([]); //Хук состояния для добавления карт из начального массива

  const history = useHistory()

  // ---------------------------------------------------

  React.useEffect(() => {
    if(loggedIn){
    api.getUserData()
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
      }}, [loggedIn]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((card) => {
        const arr = card.data.reverse()
        setCards(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck()
  }, [])


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegistrationClick(){
    setIsRegistrationPopupOpen(true)
  }

  function handleUpdateUser(data) {
    //Отправка отредактированных данных пользователя на сервер и их рендер на странице
    api.editProfileData(data.name, data.about)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    //Отправка отредактированного аватара пользователя на сервер и его рендер на странице
    api.updateProfileAvatar(data.avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    //Отправка новый карточек на сервер и добавление их в общий массив для рендера
    api.postNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegistrationPopupOpen(false)
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard.data : c)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const restCards = cards.filter((item) => {
          return item._id !== card._id;
        });
        setCards(restCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePageRedirect(){//Изменение состояния переменной при перемещении между страницами приложения
    setSigninPageActive(!signinPageActive)
  }
  function handleLogin(password, email){
    auth.login(password, email)
    .then((res) => {
        if (res.token) {
            localStorage.setItem('token', res.token)
            setLoggedIn(true)
            tokenCheck()
            return res;
        } else {
            return;
        }
    })
    .catch((err) => console.log(err));
  }

  function handleUserData(info){//Сохранение почты для вставки в header при логине
    const userData = {
      email: info.data.email
    }
    setUserData(userData)
  }


  function handleSignOut(){
    localStorage.removeItem('token')
    history.push('/sign-in')
    setLoggedIn(false)
  }

  function tokenCheck(){
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      auth.checkToken(token)
      .then((res) => {
        if(res){
          setLoggedIn(true)
          history.push('/')
          handleUserData(res)
          }
        return res;
      })
      .catch((err) => console.log(err));
      }
  }

  const onRegister = (password, email) => {//Запрос к бэкэнду для регистрации нового пользователя
        auth.register(password, email)
        .then((res) => {
          if(!res.message){
            history.goBack()
            handlePageRedirect()
            setIsRegistred(true)//Стейт для попапа успешной/неуспешной регистрации
            handleRegistrationClick()
            }else{
            setIsRegistred(false)
            handleRegistrationClick()
            }
            return res;
        })
        .catch((err) => {
        console.log(err)});
      }

// -------------------------------------------------------------------------------
  
  React.useEffect(() => {
    //Хук, отвечающий за закрытие попапов при нажатии на кнопку Escape
    const escCloseHandler = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", escCloseHandler);
    return () => {
      document.removeEventListener("keydown", escCloseHandler);
    };
  }, []);

  React.useEffect(() => {
    //Хук, отвечающий за закрытие попапов при клике на оверлей
    const outerClickCloseHandler = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", outerClickCloseHandler);
    return () => {
      document.removeEventListener("click", outerClickCloseHandler);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div style={{ backgroundColor: "black", minHeight: '100vh' }}>
        <div className="page">
          <div id="#root" className="root">
            <Header loginPage={signinPageActive} redirectHandler={handlePageRedirect} loggedIn={loggedIn} userData={userData} signOut={handleSignOut} />
            <Switch>
            <Route path='/sign-up'>
              <Register onRegister={onRegister} redirectHandler={handlePageRedirect}/>
            </Route>

            <Route path='/sign-in'>
              <Login loginHandler={handleLogin} tokenCheck={tokenCheck} />
            </Route>

            <ProtectedRoute path='/' loggedIn={loggedIn} component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}>
              </ProtectedRoute>
            
            <Footer />
            </Switch>
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <InfoTooltip isRegistred={isRegistred} registerSuccess={'Вы успешно зарегистрировались!'} registerFail={'Что-то пошло не так! Попробуйте ещё раз'} isOpen={isRegistrationPopupOpen} onClose={closeAllPopups}/>

          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            textOnButton="Да"
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
