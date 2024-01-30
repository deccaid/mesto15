import React, { useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__info">
          <div className="profile__menu">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button profile__button"
              type="button"
              data-modal-btn="popup_edit-profile"
              aria-label="Кнопка открытия окна редактирования"
              onClick={onEditProfile}
            ></button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button profile__button"
          type="button"
          data-modal-btn="popup_add-card"
          aria-label="Кнопка открытия окна добавления карты"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onDeleteClick={onDeleteClick}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            link={card.link}
            name={card.name}
            likes={[...card.likes]}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
