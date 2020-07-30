/* eslint-disable */

export const showAlert = (type, msg) => {
  const div = document.createElement('div');
  div.className = 'hideAlert';
  div.innerHTML = '<i class="fa fa-window-close"></i>';
  const divMarkup = document.createElement('div');
  divMarkup.className = `alert alert--${type}`;
  divMarkup.innerHTML = `${msg} <span> ${div.outerHTML} </span>`;
  document
    .querySelector('body')
    .insertAdjacentHTML('afterbegin', divMarkup.outerHTML);

  const hideAlert = document.getElementsByClassName('hideAlert')[0];
  const ViewAlert = document.getElementsByClassName(`alert alert--${type}`)[0];

  hideAlert.addEventListener('click', () => {
    ViewAlert.style.display = 'none';
  });
};
