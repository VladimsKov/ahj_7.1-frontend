// code for widget0tickets
import Requests from './requests';
import Modals from './modals';

const addTicket = document.querySelector('[data-btn=add_ticket]');

document.addEventListener('DOMContentLoaded', () => {
  Requests.showTicketsRequest();
});

addTicket.addEventListener('click', () => {
  Modals.createModal();
  const canselBtn = document.querySelector('#mod-cansel-btn');
  canselBtn.addEventListener('click', () => {
    Modals.closemodal();
  });
  const okBtn = document.querySelector('#mod-ok-btn');
  okBtn.addEventListener('click', () => {
    Requests.addTicket();
    const nameField = document.querySelector('.modal-name').value;
    if (nameField) {
      Modals.closemodal();
    }
  });
});
