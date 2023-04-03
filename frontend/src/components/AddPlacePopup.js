import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          onChange={handleChangeName}
          name="name"
          className="popup__input popup__input_card_name"
          id="name-card"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form-error" id="name-card-error"></span>
        <input
          onChange={handleChangeLink}
          name="link"
          placeholder="Ссылка на картинку"
          id="link-card"
          className="popup__input popup__input_card_link"
          type="url"
          required
        />
        <span className="form-error" id="link-card-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
