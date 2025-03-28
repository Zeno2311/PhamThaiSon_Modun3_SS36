// Chuyển đổi giữa form đăng nhập và đăng ký
function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showSignup() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

// Đăng ký
function signup() {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra trùng tên đăng nhập
    if (users.some(user => user.username === username)) {
        alert('Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.');
        return;
    }

    // Thêm người dùng mới
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    showLogin();
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
}

// Đăng nhập
function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const rememberMe = document.getElementById('remember-me').checked;

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Lưu trạng thái đăng nhập
        localStorage.setItem('currentUser', username);
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        window.location.href = 'home.html';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    window.location.href = 'index.html';
}

// Kiểm tra trạng thái đăng nhập khi tải trang
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    const rememberMe = localStorage.getItem('rememberMe');

    // Nếu đang ở trang đăng nhập và có trạng thái "Ghi nhớ tôi"
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        if (currentUser && rememberMe === 'true') {
            window.location.href = 'home.html';
        }
    }

    // Nếu đang ở trang home
    if (window.location.pathname.includes('home.html')) {
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('welcome-message').textContent = `Xin chào, ${currentUser}! 👋`;
        }
    }
};