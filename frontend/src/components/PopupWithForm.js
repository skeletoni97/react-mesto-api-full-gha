import React from "react";

function PopupWithForm(props) {

  
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : "popup"
      }`}
    >
      <div className="popup__container">
        <form className="popup__content" onSubmit={props.onSubmit} name={props.name} noValidate>
          <button
            type="button"
            className="popup__close popup__close-profile"
            onClick={props.closeAllPopups}
          ></button>
          <h2 className={`popup__title`}>{props.title}</h2>
          {props.children}
          <button
            className="popup__button-save popup__submit"
            type="submit"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
