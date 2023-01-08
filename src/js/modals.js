export default class Modals {
  static createModal() {
    const modalWrap = Modals.modalWrap();
    modalWrap.insertAdjacentHTML('beforeend', `<div class='modal-container'>
    <p>Добавить тикет</p>
    <form name='add_ticket'><p>Краткое описание</p>
    <input name='modal_name' class='modal-name' required>
    <p>Подробное описание</p>
    <textarea name='modal_discr' class='modal-description' maxlength="200"></textarea></form>
    <div class='modal-btns'>
    <button class='modal-btn' id='mod-cansel-btn'>Отмена</button>
    <button class='modal-btn' id='mod-ok-btn'>ОК</button>
    </div>
    </div>`);
    const modn = document.querySelector('.modal-name');
    modn.focus();
  }

  static delModal() {
    const modalWrap = Modals.modalWrap();
    modalWrap.insertAdjacentHTML('beforeend', `<div class='modal-container'>
    <p>Удалить тикет</p><p>Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
    <div class='modal-btns'>
    <button class='modal-btn' id='mod-cansel-btn'>Отмена</button>
    <button class='modal-btn' id='mod-ok-btn'>ОК</button>
    </div>
    </div>`);
  }

  static changeModal() {
    const modalWrap = Modals.modalWrap();
    modalWrap.insertAdjacentHTML('beforeend', `<div class='modal-container'>
    <p>Изменить тикет</p>
    <form name='add_ticket'><p>Краткое описание</p>
    <input name='modal_new_name' class='modal-name' required>
    <p>Подробное описание</p>
    <textarea name='modal_new_discr' class='modal-description' maxlength="200"></textarea></form>
    <div class='modal-btns'>
    <button class='modal-btn' id='mod-cansel-btn'>Отмена</button>
    <button class='modal-btn' id='mod-ok-btn'>ОК</button>
    </div>
    </div>`);
    const modn = document.querySelector('.modal-name');
    modn.focus();
  }

  static modalWrap() {
    const modalWrap = document.createElement('div');
    modalWrap.dataset.modal = 'modal-wrap';
    modalWrap.classList.add('modal-wrap');
    document.body.append(modalWrap);
    return modalWrap;
  }

  static closemodal() {
    const modalWrap = document.querySelector('[data-modal=modal-wrap]');
    modalWrap.remove();
  }
}
