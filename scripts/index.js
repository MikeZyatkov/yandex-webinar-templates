const TODO_LIST = [
    { title: 'Съесть печеньку 🍪' },
    { title: 'Изучить React ⚛️' },
    { title: 'Полить цветы 🌸' },
    { title: 'Сделать свой сайт 👨‍💻' },
    { title: 'Погулять в парке 🌳' },
];

const listContainerEl = document.querySelector('.todo__list');
const templateEl = document.querySelector('.template');
const addButtonEl = document.querySelector('.button_add');
const inputEl = document.querySelector('.input');


function render() {
    const html = TODO_LIST
        .map(getItem)

    listContainerEl.append(...html);
}


function getItemHTML(item) {
    return `<li class="todo__item card">
                    <h2 class="card__title">${item.title}</h2>
                    <div class="card__actions">
                        <button type="button" class="button button_edit"></button>
                        <button type="button" class="button button_duplicate"></button>
                        <button type="button" class="button button_remove"></button>
                    </div>
                </li>`
}


function getItem(item) {
    const newItem = templateEl.content.cloneNode(true);
    const headerEl = newItem.querySelector('.card__title');
    headerEl.textContent = item.title;

    const removeBtn = newItem.querySelector('.button_remove');
    removeBtn.addEventListener('click', handleDelete);

    const duplicateBtn = newItem.querySelector('.button_duplicate');
    duplicateBtn.addEventListener('click', handleDuplicate);

    return newItem;
}

function handleAdd() {
    const inputText = inputEl.value;
    const listItem = getItem({title: inputText});
    listContainerEl.prepend(listItem);
    inputEl.value = ''
}

function handleDelete(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.card');
    targetItem.remove();
}

function handleDuplicate(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.card');
    const headerEl = targetItem.querySelector('.card__title');
    const title = headerEl.textContent;
    const newItem = getItem({title});
    targetItem.after(newItem);
}

addButtonEl.addEventListener('click', handleAdd);

render();
