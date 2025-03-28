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

        // Ẩn phần đăng nhập/đăng ký, hiện phần chào mừng
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('home-section').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Xin chào, ${username}! 👋`;
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');

    // Ẩn phần chào mừng, hiện phần đăng nhập/đăng ký
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
    showLogin(); // Mặc định hiển thị form đăng nhập
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('remember-me').checked = false;
    document.getElementById('error-message').style.display = 'none';
}

// Kiểm tra trạng thái đăng nhập khi tải trang
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    const rememberMe = localStorage.getItem('rememberMe');

    if (currentUser && rememberMe === 'true') {
        // Nếu có trạng thái "Ghi nhớ tôi", hiển thị phần chào mừng
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('home-section').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Xin chào, ${currentUser}! 👋`;
    } else {
        // Nếu không, hiển thị phần đăng nhập/đăng ký
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('home-section').style.display = 'none';
        showLogin(); // Mặc định hiển thị form đăng nhập
    }
};