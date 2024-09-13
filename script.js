document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle between hamburger and close icon
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const cartIcon = document.querySelector('.cart-icon');
    const floatingCart = document.querySelector('.floating-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    let cart = [];

    cartIcon.addEventListener('click', () => {
        floatingCart.classList.toggle('active');
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotalAmount.textContent = total.toFixed(2);
        document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('minus')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                }
            } else if (e.target.classList.contains('plus')) {
                cart[index].quantity++;
            }
            updateCart();
        } else if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT') {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                updateCart();
            }
        }
    });

    const cartCount = document.querySelector('.cart-count');
    const orderButtons = document.querySelectorAll('.order-btn');

    let cartItems = 0;

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuCard = button.closest('.menu-card');
            const name = menuCard.querySelector('h3').textContent;
            const price = 9.99;
            const image = menuCard.querySelector('img').src;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            updateCart();
        });
    });
