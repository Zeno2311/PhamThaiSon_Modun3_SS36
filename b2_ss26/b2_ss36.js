const dishes = [
    {
        id: 1,
        name: "Bún bò Huế",
        image: "https://hoasenfoods.vn/wp-content/uploads/2024/01/bun-bo-hue.jpg",
        likes: 0
    },
    {
        id: 2,
        name: "Phở bò Hà Nội",
        image: "https://mia.vn/media/uploads/blog-du-lich/top-19-quan-pho-ha-noi-ngon-nuc-tieng-an-la-ghien-phan-1-06-1639125006.jpg",
        likes: 0
    },
    {
        id: 3,
        name: "Cơm tấm Sài Gòn",
        image: "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
        likes: 0
    }
];

const savedLikes = localStorage.getItem("dishLikes");
if (savedLikes) {
    const parsedLikes = JSON.parse(savedLikes);
    dishes.forEach(dish => {
        if (parsedLikes[dish.id]) {
            dish.likes = parsedLikes[dish.id];
        }
    });
}

const dishContainer = document.getElementById("dishContainer");

function renderDishes() {
    dishContainer.innerHTML = ""; 
    dishes.forEach(dish => {
        const dishCard = document.createElement("div");
        dishCard.classList.add("dish-card");

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <p>❤️ ${dish.likes} lượt thích</p>
            </div>
            <button class="like-button" onclick="likeDish(${dish.id})">Thích +1</button>
        `;

        dishContainer.appendChild(dishCard);
    });
}

function likeDish(dishId) {
    const dish = dishes.find(d => d.id === dishId);
    if (dish) {
        dish.likes += 1;
        const likesData = {};
        dishes.forEach(d => {
            likesData[d.id] = d.likes;
        });
        localStorage.setItem("dishLikes", JSON.stringify(likesData));
        renderDishes();
    }
}
renderDishes();