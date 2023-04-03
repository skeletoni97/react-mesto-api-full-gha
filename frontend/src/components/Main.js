import React, { useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext, CurrentCardsContext } from "../contexts/CurrentUserContext"

function Main(props) {
  const CurrentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CurrentCardsContext);

  return (  
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__avatar-hover"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
          <img
            className="profile__avatar-foto"
            src={CurrentUser.avatar}
            alt="фото вашего профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{CurrentUser.name}</h1>
            <button
              type="button"
              className="profile__button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{CurrentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        { cards && cards.map((card) => {
          return (
            <Card cardInfo={card}
             onCardClick={props.onImg}
             onCardLike={props.onLike}
             onCardDelete={props.onDelete}
             key={card._id} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
