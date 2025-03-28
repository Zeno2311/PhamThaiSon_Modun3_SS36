// Lấy các phần tử DOM
const stars = document.querySelectorAll('.stars');
const selectedRating = document.getElementById('selected-rating');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('comment-list');

let currentRating = 0;

// Xử lý đánh giá sao
stars.forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.getAttribute('data-value'));
        updateStarDisplay();
        selectedRating.textContent = `Bạn đã đánh giá ${currentRating} sao.`;
    });

    // Hover effect
    star.addEventListener('mouseover', function() {
        const hoverValue = parseInt(this.getAttribute('data-value'));
        stars.forEach(s => {
            s.style.color = parseInt(s.getAttribute('data-value')) <= hoverValue ? '#ffd700' : '#ccc';
        });
    });

    star.addEventListener('mouseout', updateStarDisplay);
});

// Cập nhật hiển thị sao dựa trên rating hiện tại
function updateStarDisplay() {
    stars.forEach(star => {
        star.style.color = parseInt(star.getAttribute('data-value')) <= currentRating ? '#ffd700' : '#ccc';
    });
}

// Gửi đánh giá và bình luận
function submitReview() {
    const commentText = commentInput.value.trim();
    
    if (currentRating === 0) {
        alert('Vui lòng chọn số sao trước khi gửi!');
        return;
    }
    
    if (commentText === '') {
        alert('Vui lòng nhập bình luận!');
        return;
    }

    // Tạo phần tử bình luận mới
    const li = document.createElement('li');
    const starSpan = document.createElement('span');
    starSpan.textContent = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
    const commentBold = document.createElement('b');
    commentBold.textContent = commentText;

    li.appendChild(starSpan);
    li.appendChild(document.createTextNode(' ')); 
    li.appendChild(commentBold);
    commentList.appendChild(li);

    // Lưu vào localStorage
    saveComments();

    // Reset form
    commentInput.value = '';
    currentRating = 0;
    updateStarDisplay();
    selectedRating.textContent = 'Bạn chưa đánh giá.';
}

// Lưu bình luận vào localStorage
function saveComments() {
    const comments = [];
    const commentItems = commentList.getElementsByTagName('li');
    for (let item of commentItems) {
        const stars = item.querySelector('span').textContent;
        const text = item.querySelector('b').textContent;
        comments.push({ stars, text });
    }
    localStorage.setItem('productComments', JSON.stringify(comments));
}

// Tải bình luận từ localStorage khi trang được tải
function loadComments() {
    const savedComments = localStorage.getItem('productComments');
    if (savedComments) {
        const comments = JSON.parse(savedComments);
        comments.forEach(comment => {
            const li = document.createElement('li');
            const starSpan = document.createElement('span');
            starSpan.textContent = comment.stars;
            const commentBold = document.createElement('b');
            commentBold.textContent = comment.text;

            li.appendChild(starSpan);
            li.appendChild(document.createTextNode(' '));
            li.appendChild(commentBold);
            commentList.appendChild(li);
        });
    }
}

// Khởi tạo khi trang tải
window.onload = loadComments;