import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import "../pages/index.css";
import {
  popupcContentAvatar,
  profileButton,
  formElement,
  formAddFoto,
  elements,
  enableValidationConfig,
  userInfoConfig,
  popupSelectors
} from "../utils/сonstans.js";

import { api } from "../components/Api";
import { data } from "autoprefixer";

let userID;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, items]) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      userID = res._id;
     
      listItem.renderItems(items)
  })
  .catch((err) => {
    console.log(err);
  });

const listItem = new Section(
  {
   
    renderer: (items) => {
      const newCard = createCardLayout(items, ".element-template");
      listItem.addListItem(newCard);
    },
  },
  elements
);

function createCardLayout(data, templateSelector) {
  const card = new Card(userID,
    data,
    templateSelector,
    handleOpenImgFullScreen,
    (id) => {
      popupDeliteCard.open();
      popupDeliteCard.changeSubmit(() => {
        api
          .deleteCard(id)
          .then((res) => {
            card.handleDelete();
            popupDeliteCard.close();
          })
          .catch((error) =>
            console.log(`Ошибка при удалении карточки: ${error}`)
          );
      });
    },

    (_id) => {
      if (card.isLiked()) {
        api
          .deleteLike(_id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((error) => console.log(error));
      } else {
        api
          .addLike(_id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((error) => console.log(error));
      }
    }
  );
  const newcard = card.createCard();

  return newcard;
}

const popupImg = new PopupWithImage(
  popupSelectors.popupImage
);
popupImg.setEventListeners();

function handleOpenImgFullScreen(title, link) {
  popupImg.open(title, link);
}

const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, (evt, data) => {
  popupAddCard.renderLoading(true);
  api
    .addCard(data)
    .then((res) => {
      const card = createCardLayout(res, ".element-template");
      listItem.addNewItem(card);
      popupAddCard.close();
    })
    .catch((error) => console.log(error))

    .finally(() => {
      popupAddCard.renderLoading(false);
      
    });
});
popupAddCard.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  formAddFotoValidator.disabledButton();
  popupAddCard.open();
});

const popupProfile = new PopupWithForm(popupSelectors.popupEdit, function (
  evt,
  data
) {
  popupProfile.renderLoading(true);
  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupProfile.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupProfile.renderLoading(false);
    });
});
popupProfile.setEventListeners();

const avatarPopup = new PopupWithForm(popupSelectors.popupAvatar, function (
  evt,
  data
) {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      avatarPopup.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

avatarPopup.setEventListeners();
document
  .querySelector(".profile__avatar-hover")
  .addEventListener("click", () => {
    avatarPopup.open();
    formAvatarValidator.disabledButton();
  });

const popupDeliteCard = new PopupConfirm(popupSelectors.popupDelete);
popupDeliteCard.setEventListeners();

const userInfo = new UserInfo(
  userInfoConfig
);

profileButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
});

const formAddFotoValidator = new FormValidator(
  enableValidationConfig,
  formAddFoto
);
formAddFotoValidator.enableValidation();

const formProfileValidator = new FormValidator(
  enableValidationConfig,
  formElement
);
formProfileValidator.enableValidation();

const formAvatarValidator = new FormValidator(
  enableValidationConfig,
  popupcContentAvatar
);
formAvatarValidator.enableValidation();

