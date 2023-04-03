import React, { useEffect, useDebugValue, useState, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { apiAuth } from "../utils/ApiAuth";
import {
  CurrentUserContext,
  CurrentCardsContext,
} from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {
  BrowserRouter,
  Route,
  Routes,
  Redirect,
  Navigate,
  useNavigate,
  Switch,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfpToolTip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  const [linkImg, setLinkImg] = React.useState("");
  const [nameImg, setNameImg] = React.useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isFail, setIsFail] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {})
      .catch();
    const newCard = cards.filter((newCard) => newCard._id !== card._id);
    setCards(newCard);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked !== true) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch();
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch();
    }
  }

  useEffect(() => {
    handleTokenCheck();
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([res, items]) => {
        setcurrentUser(res);
        setCards(items);
      })
      .catch();
    return () => {};
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setLinkImg(data.link);
    setNameImg(data.name);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        closeAllPopups();
        setcurrentUser(res);
      })
      .catch();
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        closeAllPopups();
        setcurrentUser(res);
      })
      .catch();
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch();
  }

  function handleAutorizUser(email, paswsord) {
    apiAuth
      .authorization(email, paswsord)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLogin(true);
        setIsEmail(email)
      })
      .catch((err) => {});
  }

  function handleRegistr(email, password) {
    apiAuth
      .postUser(email, password)
      .then((res) => {
        navigate("/sign-in");
        setSuccess(true);
      })
      .catch((err) => {
        setIsFail(true);
      });
  }
  //Проверяем токен

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      
      apiAuth
        .checkTokenUser(jwt)
        .then((res) => {
          if (res) {
            setIsEmail(res.email);
            setIsLogin(true);
            navigate("/");
            return true;
          } else {
            navigate("/sign-in");
            setIsLogin(false);
          }
        })
        
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function closeResponsePopup() {
    if (isSuccess) {
      setSuccess(false);
      navigate("/sign-in", { replace: true });
    } else {
      setIsFail(false);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/');
  };

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardsContext.Provider value={cards}>
            <Header email={isEmail} loggedIn={isLogin} login={setIsLogin} handleSignOut={handleSignOut}/>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    loggedIn={isLogin}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onImg={handleCardClick}
                    onLike={handleCardLike}
                    onDelete={handleCardDelete}
                    component={Main}
                    element={<Main></Main>}
                  />
                }
              />

              <Route
                path="/sign-up"
                element={
                  isLogin ? (
                    <Navigate to="/" />
                  ) : (
                    <Register
                      handleRegistr={handleRegistr}
                    />
                  )
                }
              />

              <Route
                path="/sign-in"
                element={
                  isLogin ? (
                    <Navigate to="/" />
                  ) : (
                    <Login
                      onSignin={handleAutorizUser}
                    />
                  )
                }
              />
            </Routes>

            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />

            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            />

            <AddPlacePopup
              onAddPlaceSubmit={handleAddPlaceSubmit}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
            />

            <ImagePopup
              link={linkImg}
              nameImg={nameImg}
              name="showPhoto"
              isOpen={isImagePopupOpen}
              closeAllPopups={closeAllPopups}
            />
            <InfoToolTip
              isSuccess={isSuccess}
              isFail={isFail}
              onClose={closeResponsePopup}
            />

            <Footer />
          </CurrentCardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
