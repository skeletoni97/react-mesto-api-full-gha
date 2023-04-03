import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {

  const CurrentUser = React.useContext(CurrentUserContext);
  const isOwn = props.cardInfo.owner._id === CurrentUser._id;
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  
  const isLiked = props.cardInfo.likes.some(i => i._id === CurrentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = ( 
  `element__like ${isLiked && 'element__like_active'}` 
);;
  
  function handleClick() {
    props.onCardClick(props.cardInfo);
  }
  function handleLikeClick() {
    props.onCardLike(props.cardInfo);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardInfo);
  }

  return (
    <div className="element">
      {isOwn && <button className="element__delete-card" type="button" onClick={handleDeleteClick}/>}
      <img
        className="element__image"
        src={props.cardInfo.link}
        type="button"
        alt={props.cardInfo.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{props.cardInfo.name}</h2>
        <div className="element__like_zone">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like_counter">{props.cardInfo.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
