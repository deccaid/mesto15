export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__img-container">
        <button
          type="button"
          className="popup__exit"
          id="close__image"
          aria-label="Кнопка закрытия"
          onClick={onClose}
        />
        <div className="popup__figure">
          <img
            className="popup__img"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__caption">
            {card ? card.name : ""}
          </figcaption>
        </div>
      </div>
    </div>
  );
}