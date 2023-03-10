const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItem() {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onItemSubmit(e) {
  e.preventDefault();

  newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item to the list');
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkItemExists(newItem)) {
      alert('Item already exists');
      return;
    }
  }

  addItemToDOM(newItem);

  addItemToStorages(newItem);

  checkUI();

  itemInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const btn = createBtn('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);
}

function createBtn(cls) {
  const btn = document.createElement('button');
  btn.className = cls;
  const icon = createIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}

function createIcon(cls) {
  const icon = document.createElement('i');
  icon.className = cls;
  return icon;
}

function addItemToStorages(item) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemEditable(e.target);
  }
}

function checkItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemEditable(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');

  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = 'mediumseagreen';

  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure you want to remove?')) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value = '';

  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = '';
    itemFilter.style.display = '';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

function init() {
  itemForm.addEventListener('submit', onItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItem());

  checkUI();
}

init();
