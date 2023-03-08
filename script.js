const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

function addItem(e) {
  e.preventDefault();

  newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item to the list');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const btn = createBtn('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);

  itemInput.value = '';
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
