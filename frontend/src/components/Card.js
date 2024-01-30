import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  id,
  onCardDelete,
  onCardClick,
  link,
  name,
  likes,
  card,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  function handleClick() {
    onCardClick({ link, name });
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="card">
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          id="delete_card"
          aria-label="удаление карты"
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        className="card__image"
        alt={name}
        data-modal-btn="popup_increase-image"
        src={link}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__name"> {name} </h2>
        <div className="card__like-block">
          <button
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="card__number-likes"> {likes.length}</span>
        </div>
      </div>
    </div>
  );
}
