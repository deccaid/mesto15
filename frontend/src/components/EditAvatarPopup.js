import React, {useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
      children={
        <input
          className="popup__input popup__input_type_avatar"
          autoComplete="off"
          placeholder="Ссылка на картинку"
          required
          type="url"
          id="link-input"
          name="editAvatar"
          ref={avatarRef}
        />
      }
    />
  );
}

export default EditAvatarPopup;
