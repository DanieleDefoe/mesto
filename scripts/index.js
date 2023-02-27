const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__container');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__description');

const editBtn = document.querySelector('.profile__edit');
const exitBtn = document.querySelector('.popup__exit');
const likeBtn = document.querySelectorAll('.card__button');

const nameField = document.getElementById('title');
const statusField = document.getElementById('description');

const showPopup = () => {
    popup.classList.add('popup_opened');
};

const hidePopup = () => {
    popup.classList.remove('popup_opened');
};

const fillColor = (e) => {
    if (e.target.src.includes('like-active')) {
        e.target.src = './images/like.svg';
    } else {
        e.target.src = './images/like-active.svg';
    }
};

const updateText = (e) => {
    e.preventDefault();
    profileName.textContent = nameField.value;
    profileStatus.textContent = statusField.value;
    nameField.value = '';
    statusField.value = '';
    hidePopup();
};

editBtn.addEventListener('click', showPopup);
exitBtn.addEventListener('click', hidePopup);
likeBtn.forEach(like => like.addEventListener('click', fillColor));
form.addEventListener('submit', updateText);
