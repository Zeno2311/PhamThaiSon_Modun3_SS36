const toggleButton = document.querySelector('.dark-mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

function toggleMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    modeIcon.src = isDarkMode 
        ? 'https://img.icons8.com/ios-filled/50/moon-symbol.png' 
        : 'https://img.icons8.com/ios-filled/50/sun.png';
    modeIcon.alt = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        modeIcon.src = 'https://img.icons8.com/ios-filled/50/moon-symbol.png';
        modeIcon.alt = 'Light Mode';
    } else {
        modeIcon.src = 'https://img.icons8.com/ios-filled/50/sun.png';
        modeIcon.alt = 'Dark Mode';
    }
};

toggleButton.onclick = toggleMode;