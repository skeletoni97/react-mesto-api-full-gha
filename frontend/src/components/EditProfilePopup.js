import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(
    () => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    },
    [currentUser],
  );

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_field_name"
        id="name"
        placeholder="Имя"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
        value={name}
      />
      <span className="form-error" id="name-error"></span>
      <input
        className="popup__input popup__input_field_status"
        id="status"
        placeholder="Вид деятельности"
        name="about"
        type="text"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeAbout}
        value={description}
      />
      <span className="form-error" id="status-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
