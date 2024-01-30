import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Добавить"}
      children={
        <>
          <input
            name="name"
            className="popup__input popup__input_type_title"
            type="text"
            autoComplete="off"
            placeholder="Название"
            required
            id="title-input"
            minLength="2"
            maxLength="30"
            onChange={handleNameChange}
            value={name}
          />
          <span className="title-input-error popup__input-error"></span>

          <input
            name="link"
            className="popup__input popup__input_type_image"
            type="url"
            autoComplete="off"
            placeholder="Ссылка на картинку"
            required
            id="url-input"
            onChange={handleLinkChange}
            value={link}
          />
          <span className="url-input-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
