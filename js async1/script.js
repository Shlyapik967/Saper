const productList = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');
const categorySelect = document.getElementById('category-select');
let currentCategory = '';
let currentPage = 1;

async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error('Ошибка при получении категорий');
        const categories = await response.json();
        populateCategorySelect(categories);
    } catch (error) {
        alert(error.message);
    }
}

function populateCategorySelect(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

categorySelect.addEventListener('change', (event) => {
    currentCategory = event.target.value;
    currentPage = 1;
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products${currentCategory ? `/category/${currentCategory}` : ''}?limit=6&page=${currentPage}`);
        if (!response.ok) throw new Error('Ошибка при получении товаров');
        const products = await response.json();
        displayProducts(products);
        
        
        document.getElementById('load-more').style.display = products.length > 0 ? 'block' : 'none';
    } catch (error) {
        alert(error.message);
    }
}

function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Цена: $${product.price}</p>
            <p>${product.description}</p>
            <p>Категория: ${product.category}</p>
            <button class="delete-button" onclick="deleteProduct(${product.id})">Удалить товар</button>
        `;
        productList.appendChild(productCard);
    });
}

async function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;

    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: name, price: parseFloat(price), description, category }),
        });
        if (!response.ok) throw new Error('Ошибка при добавлении товара');
        alert('Товар успешно добавлен!');
        document.getElementById('add-product-form').reset();
        fetchProducts();
    } catch (error) {
        alert(error.message);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Ошибка при удалении товара');
        alert('Товар успешно удален!');
        fetchProducts(); 
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    fetchProducts();
});

fetchCategories(); 
fetchProducts(); 