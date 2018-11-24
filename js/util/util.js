export const renderElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const mainPage = document.querySelector(`#main`);

export const changeScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

export const wrapHeaderBlocks = (...blocks) => {
  const wrapper = document.createElement(`header`);
  wrapper.classList.add(`header`);
  blocks.forEach((block) => {
    wrapper.appendChild(block);
  });
  return wrapper;
};

export const containScreenBlocks = (...blocks) => {
  const fragment = document.createDocumentFragment();
  blocks.forEach((block) => {
    fragment.appendChild(block);
  });
  return fragment;
};

