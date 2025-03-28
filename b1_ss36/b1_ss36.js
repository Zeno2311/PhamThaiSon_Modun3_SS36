const nameForm = document.getElementById('nameForm');
const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const greetingMessage = document.getElementById('greetingMessage');

window.onload = function() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        showGreeting(savedName);
    }
};

function saveName() {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        showGreeting(name);
    } else {
        alert('Vui lòng nhập tên của bạn!');
    }
}


function showGreeting(name) {
    nameForm.style.display = 'none';
    greeting.style.display = 'block';
    greetingMessage.textContent = `👋 Chào bạn, ${name}!`;
}

function changeName() {
    nameForm.style.display = 'block';
    greeting.style.display = 'none';
    nameInput.value = ''; 
}