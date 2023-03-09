const popups = document.querySelectorAll('.popup')

const profilePopup = document.querySelector('.profile-popup')
const editForm = document.forms['edit-form']

const cardPopup = document.querySelector('.card-popup')
const addForm = document.forms['add-form']

const imagePopup = document.querySelector('.image-popup')
const popupImage = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__image-title')

const profileName = document.querySelector('.profile__name')
const profileStatus = document.querySelector('.profile__description')

const editBtn = document.querySelector('.profile__edit')
const addBtn = document.querySelector('.profile__add')

const exitBtns = document.querySelectorAll('.popup__exit')

const nameField = document.getElementById('title')
const statusField = document.getElementById('description')

const placeTitle = document.getElementById('place-title')
const placePhoto = document.getElementById('place-photo')

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

const showProfilePopup = (e) => {
  e.target.blur()
  nameField.value = profileName.textContent
  statusField.value = profileStatus.textContent
  openPopup(profilePopup)
}

const showAddPopup = (e) => {
  e.target.blur()
  openPopup(cardPopup)
}

const showImagePopup = (name, link) => {
  popupImage.src = link
  popupImageCaption.textContent = name
  popupImage.alt = name
  openPopup(imagePopup)
}

const closePopupByClickingOnOverlay = (e) => {
  if (e.target !== e.currentTarget) return
  closePopup()
}

const closePopup = () => {
  document.querySelector('.popup_opened').classList.remove('popup_opened')
}

const toggleColor = (e) => {
  e.target.classList.toggle('card__button_active')
  e.target.blur()
}

// CARD TEMPLATE GENERATOR
const articleSection = document.querySelector('.elements')
const cardTemplate = document.querySelector('.card-template').content
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
]

// CARD TEMPLATE GENETATOR

const handleProfileFormSubmit = (e) => {
  e.preventDefault()
  profileName.textContent = nameField.value
  profileStatus.textContent = statusField.value
  closePopup()
}

const removeCard = (e) => {
  const cardToRemove = e.target.closest('.card')
  cardToRemove.remove()
}

const handleCardFormSubmit = (e) => {
  e.preventDefault()
  const obj = { name: placeTitle.value, link: placePhoto.value }
  prependCard(obj)
  e.target.reset()
  closePopup()
}

const createCard = (name, link) => {
  const article = cardTemplate.cloneNode(true)
  const cardImage = article.querySelector('.card__image')
  cardImage.src = link
  cardImage.alt = name
  cardImage.addEventListener('click', () => showImagePopup(name, link))
  article.querySelector('.card__title').textContent = name
  article.querySelector('.card__button').addEventListener('click', toggleColor)
  const removeBtn = article.querySelector('.card__remove')
  removeBtn.addEventListener('click', removeCard)
  return article
}

const prependCard = ({ name, link }) => {
  const article = createCard(name, link)
  articleSection.prepend(article)
}

initialCards.forEach(prependCard)

editBtn.addEventListener('click', showProfilePopup)
addBtn.addEventListener('click', showAddPopup)

exitBtns.forEach((exit) => exit.addEventListener('click', closePopup))

editForm.addEventListener('submit', handleProfileFormSubmit)
addForm.addEventListener('submit', handleCardFormSubmit)

popups.forEach((popup) =>
  popup.addEventListener('click', closePopupByClickingOnOverlay)
)
