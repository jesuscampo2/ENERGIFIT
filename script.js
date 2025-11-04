document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES
    const cartIcon = document.getElementById('open-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    // 2. ESTADO GLOBAL
    let cart = [];

    // 3. FUNCIÓN PARA ACTUALIZAR EL CARRITO EN EL HTML
    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                
                // Muestra el nombre, cantidad y precio
                itemElement.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>€${(item.price * item.quantity).toFixed(2)}</span>
                    <button data-index="${index}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                
                total += item.price * item.quantity;
            });
        }

        // Actualiza el contador del ícono y el total
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalElement.textContent = `€${total.toFixed(2)}`;
    };

    // 4. FUNCIÓN PARA AÑADIR PRODUCTOS
    const addToCart = (productName, productPrice) => {
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1; // Si existe, solo aumenta la cantidad
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 }); // Si no, añade uno nuevo
        }
        
        updateCartDisplay();
        alert(`"${productName}" añadido al carrito.`);
    };

    // 5. FUNCIÓN PARA ELIMINAR PRODUCTOS
    const removeItem = (index) => {
        const itemToRemove = cart[index];
        if (itemToRemove.quantity > 1) {
            itemToRemove.quantity -= 1; // Si hay más de uno, reduce la cantidad
        } else {
            cart.splice(index, 1); // Si solo hay uno, elimina el elemento del array
        }
        updateCartDisplay();
    };

    // 6. EVENT LISTENERS

    // Botones de "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Obtenemos los datos del producto del elemento padre (.product-card)
            const card = e.target.closest('.product-card');
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            
            addToCart(name, price);
        });
    });

    // Abrir/Cerrar Modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar si se hace clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Delegación para eliminar items del carrito
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            removeItem(index);
        }
    });

    // Botón de Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`¡Compra finalizada! Total a pagar: ${cartTotalElement.textContent}`);
            cart = []; // Vacía el carrito
            updateCartDisplay();
            cartModal.style.display = 'none';
        } else {
            alert("El carrito está vacío. ¡Agrega productos primero!");
        }
    });
});