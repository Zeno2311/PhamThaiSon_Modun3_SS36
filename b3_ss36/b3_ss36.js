function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

window.onload = function() {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
};

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

window.onload = function() {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    document.getElementById('red').onclick = function() {
        changeBackgroundColor('red');
    };

    document.getElementById('green').onclick = function() {
        changeBackgroundColor('green');
    };

    document.getElementById('yellow').onclick = function() {
        changeBackgroundColor('yellow');
    };

    document.getElementById('purple').onclick = function() {
        changeBackgroundColor('purple');
    };
};