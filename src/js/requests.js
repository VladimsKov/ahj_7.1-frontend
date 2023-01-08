import Ticket from "./create-ticket";
import Modals from "./modals";
const ticketsContainer = document.querySelector('.tickets-wrap');
const baseUrl = 'http://localhost:7000/';


export default class Requests {
    
  static showTicketsRequest() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          ticketsContainer.replaceChildren();
          if (!data.length) {
            ticketsContainer.append('Пока нет тикетов');
            return;
          }
          data.forEach(elem => {
            const ticket = Ticket.createTicket();
            ticket.dataset.id = elem.id;
            const selCtrl = ticket.querySelector('.select-ctrl');
            const delCtrl = ticket.querySelector('.del-ctrl');
            const changeCtrl = ticket.querySelector('.change-ctrl');
            
            
            selCtrl.addEventListener('click', () => {
              selCtrl.classList.toggle('select-none');              
            });
            
            ticket.addEventListener('click', (evt) => {
              if (!(evt.target.classList.contains('change-ctrl') || evt.target.classList.contains('del-ctrl') ||
              evt.target.classList.contains('select-ctrl'))) {
                const descrEl = ticket.querySelector('.descr-data');
                if (!descrEl) {
                  Requests.detailTicket(elem.id);
                  return;
                }
                descrEl.remove();                
              }
            });
            
            changeCtrl.addEventListener('click', (evt) => {
              Modals.changeModal();
              const canselBtn = document.querySelector('#mod-cansel-btn');
              canselBtn.addEventListener('click', () => {
                Modals.closemodal();    
              });
              const ticketId = evt.currentTarget.closest('.ticket').dataset.id;
              const okBtn =  document.querySelector('#mod-ok-btn');
              okBtn.addEventListener('click', () => {
                Requests.changeTicket(ticketId);
                const nameField = document.querySelector('.modal-name').value;
                if (nameField) {
                  Modals.closemodal();
                } 
              });              
            });
            
            delCtrl.addEventListener('click', (evt) => {
              Modals.delModal();
              const canselBtn = document.querySelector('#mod-cansel-btn');
              canselBtn.addEventListener('click', () => {
                Modals.closemodal();    
              });
              const ticketId = evt.currentTarget.closest('.ticket').dataset.id;
              const okBtn =  document.querySelector('#mod-ok-btn');
              okBtn.addEventListener('click', () => {
                
                Requests.deleteTicket(ticketId);
                Modals.closemodal();
              });                       
            });
            
            const ticketDate = Ticket.createTicketDate(elem.created);
            ticket.querySelector('.text-data').insertAdjacentHTML('beforeend', `<p>${elem.name}</p>`);
            ticket.querySelector('.ticket-date').append(ticketDate);
            ticketsContainer.append(ticket);            
          });
        } catch (e) {
          console.error(e);            
        }
      }
    });
    
    const url = baseUrl + '?method=allTickets';
    xhr.open('GET', url);
    xhr.send();
  }
  
  
  static addTicket() {
    const namefield = document.querySelector('.modal-name');
    if (!namefield.value) {
      alert('Введите краткое описание');
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        Requests.showTicketsRequest();
      }
    });
    const formData = new FormData(document.forms.add_ticket);
    const url = baseUrl + '?method=addTicket';
    xhr.open('PUT', url);
    xhr.send(formData);            
  }
  
  
  static detailTicket(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const descr = JSON.parse(xhr.response);
          const ticket = document.querySelector(`[data-id="${ticketId}"]`);
          ticket.querySelector('.text-data').insertAdjacentHTML("beforeend",
          `<p class='descr-data'>${descr}</p>`);                    
        } catch(e) {
          console.error(e);
        }
      }
    }); 
    const elId = encodeURIComponent(ticketId);
    const url = baseUrl + '?method=ticketById' + `&id=${elId}`;
    xhr.open('GET', url);
    xhr.send(); 
  }
  
  static deleteTicket(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        Requests.showTicketsRequest();
      }
    });
    const elId = encodeURIComponent(ticketId);
    const url = baseUrl + '?method=deleteTicket' + `&delId=${elId}`
    xhr.open('DELETE', url);
    xhr.send();
  }
  
  static changeTicket(ticketId) {
    const namefield = document.querySelector('.modal-name');
    if (!namefield.value) {
      alert('Введите краткое описание');
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        Requests.showTicketsRequest();
      }
    });
    const formData = new FormData(document.forms.add_ticket);
    const url = baseUrl + '?method=changeTicket' + `&changeId=${ticketId}`;
    xhr.open('PATCH', url);
    xhr.send(formData);    
  } 
}
