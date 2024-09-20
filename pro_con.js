let mutex = 1, full = 0, empty = 10, buffer = [];
const itemsContainer = document.getElementById('items');
const messageContainer = document.getElementById('message');
const itemNameInput = document.getElementById('itemName');

const updateBufferDisplay = () => {
    itemsContainer.innerHTML = '';
    buffer.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = item;
        itemsContainer.appendChild(div);
    });
};

const produce = () => {
    const itemName = itemNameInput.value.trim();
    if (itemName === "") {
        messageContainer.textContent = "Please enter an item name.";
        return;
    }

    if (mutex === 1 && empty > 0) {
        mutex = wait(mutex);
        full = signal(full);
        empty = wait(empty);
        buffer.push(itemName);
        updateBufferDisplay();
        messageContainer.textContent = `Produced: ${itemName}`;
        itemNameInput.value = ""; // Clear input
        mutex = signal(mutex);
    } else {
        messageContainer.textContent = "Buffer is full";
    }
};

const consume = () => {
    if (mutex === 1 && full > 0) {
        mutex = wait(mutex);
        full = wait(full);
        empty = signal(empty);
        const item = buffer.shift();
        updateBufferDisplay();
        messageContainer.textContent = `Consumed: ${item}`;
        mutex = signal(mutex);
    } else {
        messageContainer.textContent = "Buffer is empty";
    }
};

const wait = (s) => --s;
const signal = (s) => ++s;

document.getElementById('produce').addEventListener('click', produce);
document.getElementById('consume').addEventListener('click', consume);
