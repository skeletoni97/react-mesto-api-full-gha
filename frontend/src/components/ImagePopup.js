import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : "popup"
      }`}
    >
      <div className="popup__open-image">
        <img className="popup__image" src={props.link} alt={props.nameImg} />
        <button
          type="button"
          className="popup__close popup__close_show-photo"
          onClick={props.closeAllPopups}
        ></button>
        <h2 className="popup__text">{props.nameImg}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
