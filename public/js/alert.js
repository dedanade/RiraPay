/* eslint-disable */

export const showAlert = (type, msg) => {
  const div = document.createElement('div');
  div.id = 'hideAlertNotification';
  div.innerHTML = '<i class="fa fa-window-close"></i>';

  var alertNotification = document.getElementById(`alert-notification`);

  if (typeof alertNotification != 'undefined' && alertNotification != null) {
    alertNotification.style.display = 'flex';
    alertNotification.className = `alert alert--${type}`;
    alertNotification.innerHTML = `${msg} <span> ${div.outerHTML} </span>`;
  } else {
    const divMarkup = document.createElement('div');
    divMarkup.id = 'alert-notification';
    divMarkup.className = `alert alert--${type}`;
    divMarkup.innerHTML = `${msg} <span> ${div.outerHTML} </span>`;
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', divMarkup.outerHTML);
  }
  const hideAlert = document.getElementById('hideAlertNotification');
  const ViewAlert = document.getElementById(`alert-notification`);

  if (hideAlert)
    hideAlert.addEventListener('click', () => {
      ViewAlert.style.display = 'none';
    });
};
