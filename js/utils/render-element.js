const mainPage = document.querySelector(`#main`);

export const showScreen = (element) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(element);
};

export const showModal = (element) => {
  document.body.appendChild(element);
};

export const showScreenWithAnimation = (element) => {
  mainPage.firstChild.classList.add(`hide-animation`);
  element.classList.add(`show-animation`);
  setTimeout(() => showScreen(element), 1000);
};
