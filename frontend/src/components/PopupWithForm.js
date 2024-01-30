export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  return (
    <>
      <div
        className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <button
            className="popup__exit"
            type="button"
            id="close_edit"
            aria-label="Кнопка закрытия"
            onClick={onClose}
          ></button>
          <h2 className="popup__title">{title}</h2>
          <form className="form popup__form" name={name} onSubmit={onSubmit}>
            <fieldset className="popup__inputs">{children}</fieldset>
            <button
              type="submit"
              className="popup__button"
              aria-label="Кнопка сохранения новой информации о профиле"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
