export default (html) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = html;
  return wrapper;
};
