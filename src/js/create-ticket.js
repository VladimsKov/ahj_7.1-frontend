export default class Ticket {
  static createTicket() {
    const ticketEl = document.createElement('div');
    ticketEl.classList.add('ticket');
    ticketEl.insertAdjacentHTML('afterbegin',
      `<div class="check-ticket select-ctrl select-none"></div>
    <div class="text-data"></div>
    <div class="ticket-date"></div>
    <div class="controls">
    <div class="check-ticket change-ctrl"></div>
    <div class="check-ticket del-ctrl"></div>
    </div>`);
    return ticketEl;
  }

  static createTicketDate(date) {
    const ticketDate = new Date(date);
    const day = (ticketDate.getDate() < 10)
      ? `0${ticketDate.getDate()}` : ticketDate.getDate();
    const month = (ticketDate.getMonth() < 9)
      ? `0${ticketDate.getMonth() + 1}` : ticketDate.getMonth() + 1;
    const year = (ticketDate.getFullYear());
    const hours = (ticketDate.getHours() < 10)
      ? `0${ticketDate.getHours()}` : ticketDate.getHours();
    const minutes = (ticketDate.getMinutes() < 10)
      ? `0${ticketDate.getMinutes()}` : ticketDate.getMinutes();
    const createDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return createDate;
  }
}
