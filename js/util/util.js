export const createDomElement = (element) => {
  const template = document.createElement(`template`);
  template.innerHTML = element;
  return template.content;
};

const mainPage = document.querySelector(`#main`);
export const renderScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

