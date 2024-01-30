import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import success from "../images/success.svg";
import error from "../images/fail.svg";
import auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isTooltipErrorPopup, setIsTooltipErrorPopup] = React.useState(false);
  const [isTooltipSuccessPopup, setIsTooltipSuccessPopup] =
    React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
    api.getUserInfo().then(setCurrentUser).catch(console.log);
    api.getCards().then(setCards).catch(console.log);
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsDeletePopupOpen(false);
    setIsTooltipErrorPopup(false);
    setIsTooltipSuccessPopup(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(newUserData) {
    api
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(data) {
    api
      .setInfoAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card, e) {
    api
      .deleteCardID(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleSignUp = (email, password) => {
    auth
      .registerUser(email, password)
      .then((res) => {
        setIsTooltipSuccessPopup(true);
        setTimeout(() => {
          navigate("/sign-in", { replace: true });
        }, 2000);
      })
      .catch(() => {
        console.error("Что-то пошло не так! Попробуйте еще раз");
        setIsTooltipErrorPopup(true);
      });
  };
  const handleSignIn = ({ email, password }) => {
    auth
      .authUser(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
          return res;
        }
      })
      .catch(() => {
        console.error("Что-то пошло не так! Попробуйте еще раз");
        setIsTooltipErrorPopup(true);
      });
  };
  const handleCheckToken = (jwt) => {
    console.log(jwt);
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        console.error(`Ошибка авторизации`);
      });
  };
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      handleCheckToken(jwt);
    }
  }, []);
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={userEmail} onLogout={handleLogout} />
        <Routes>
        <Route path='*' element={<Navigate to={loggedIn ? '/' : '/sign-in'} replace={true} />} />
          
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onDeleteClick={handleDeleteClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<Register onRegister={handleSignUp} />}
          />
          <Route
            exact
            path="/sign-in"
            element={<Login onLogin={handleSignIn} />}
          />
        </Routes>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        name="deleteCard"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isTooltipSuccessPopup}
        onClose={closeAllPopups}
        title={"Вы успешно зарегистрировались!"}
        image={success}
      />
      <InfoTooltip
        isOpen={isTooltipErrorPopup}
        name={"login"}
        onClose={closeAllPopups}
        title={"Что-то пошло не так! Попробуйте ещё раз."}
        image={error}
      />
      {loggedIn && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
