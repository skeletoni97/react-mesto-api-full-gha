import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const videoRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: videoRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          ref={videoRef}
          name="avatar"
          className="popup__input"
          id="link-avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form-error" id="link-avatar-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
