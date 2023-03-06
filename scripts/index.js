const popup = document.querySelector('.popup');

const editForm = popup.querySelector('#popup__edit-form');
const addForm = popup.querySelector('#popup__add-form');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__description');

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');

const exitBtn = document.querySelectorAll('.popup__exit');

const nameField = document.getElementById('title');
const statusField = document.getElementById('description');

const placeTitle = document.getElementById('place-title');
const placePhoto = document.getElementById('place-photo');

const popupImageContainer = document.querySelector('.popup__image-container');
const popupImage = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__image-title');

const showPopup = (e) => {
    e.target.blur();
    popup.classList.add('popup_opened');
    const classN = e.target.className;
    if (classN === 'profile__edit') {
        editForm.classList.remove('popup__container_hidden');
        nameField.value = profileName.textContent;
        statusField.value = profileStatus.textContent;
    } else if (classN === 'profile__add') {
        addForm.classList.remove('popup__container_hidden');
    } else if (classN === 'card__image') {
        popupImageContainer.classList.remove('popup__image-container_hidden');
        popupImage.src = e.target.src;
        popupImageCaption.textContent = e.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    }
};

const hidePopup = (e) => {
    popup.classList.remove('popup_opened');
    if (e && e.target.classList.contains('popup__exit')) {
        const exitButton = e.target;
        if (exitButton.classList.contains('popup__exit_place_image-container')) {
            exitButton.parentElement.classList.add('popup__image-container_hidden');
        } else {
            exitButton.parentElement.classList.add('popup__container_hidden');
        }
    } else {
        return;
    }
};

const fillColor = (e) => {
    e.target.classList.toggle('card__button_active');
    e.target.blur();
};

// CARD TEMPLATE GENERATOR
const articleSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// CARD TEMPLATE GENETATOR

const updateText = (e) => {
    e.preventDefault();
    profileName.textContent = nameField.value;
    profileStatus.textContent = statusField.value;
    hidePopup();
};

const removeBtn = document.querySelectorAll('.card__remove');

const removeCard = (e) => {
    const cardToRemove = e.target.closest('.card');
    cardToRemove.remove();
}

const updateCard = (e) => {
    e.preventDefault();
    const obj = {name: placeTitle.value, link: placePhoto.value};
    appendCard(obj);
    hidePopup();
}

const appendCard = (card) => {
    const article = cardTemplate.cloneNode(true);
    const cardImage = article.querySelector('.card__image')
    cardImage.src = card.link;
    cardImage.addEventListener('click', showPopup);
    article.querySelector('.card__title').textContent = card.name;
    article.querySelector('.card__button').addEventListener('click', fillColor);
    const removeBtn = article.querySelector('.card__remove');
    removeBtn.src = "./images/remove.svg";
    removeBtn.addEventListener('click', removeCard);
    articleSection.prepend(article);
};

initialCards.forEach(appendCard);

editBtn.addEventListener('click', showPopup);
addBtn.addEventListener('click', showPopup);

exitBtn.forEach(exit => exit.addEventListener('click', hidePopup));

editForm.addEventListener('submit', updateText);
addForm.addEventListener('submit', updateCard);

removeBtn.forEach(btn => btn.addEventListener('click', removeCard));
