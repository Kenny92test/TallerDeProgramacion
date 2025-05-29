import { productsData } from './data.js';
import { animateCartIcon, showConfirmationMessage } from './animaciones.js'; // Importa funciones de animación

const cartDropdownItems = document.getElementById('cart-dropdown-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCountBadge = document.getElementById('cart-count-badge');
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');

let cart = []; // Estado del carrito

// Función para actualizar la viñeta del contador del carrito
const updateCartBadge = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    if (totalItems > 0) {
        cartCountBadge.style.display = 'flex'; // Mostrar el badge
    } else {
        cartCountBadge.style.display = 'none'; // Ocultar el badge
    }
};

// Función para renderizar el carrito desplegable
const renderCart = () => {
    cartDropdownItems.innerHTML = ''; // Limpiar el contenido actual del carrito
    let total = 0;

    if (cart.length === 0) {
        cartDropdownItems.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7); padding: 20px 0;">El carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const product = productsData.find(p => p.id === item.id);
            if (product) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.dataset.productId = item.id; // Almacena el ID para JS

                cartItemDiv.innerHTML = `
                    <img src="${product.image.replace('250x250', '60x60')}" alt="${product.name}" class="cart-item__image">
                    <div class="cart-item__details">
                        <span class="cart-item__name">${product.name}</span>
                        <span class="cart-item__price">S/.${(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-item__quantity-controls">
                        <button class="cart-item__btn cart-item__btn--minus" data-action="decrease-qty">-</button>
                        <span class="cart-item__quantity">${item.quantity}</span>
                        <button class="cart-item__btn cart-item__btn--plus" data-action="increase-qty">+</button>
                    </div>
                `;
                cartDropdownItems.appendChild(cartItemDiv);
                total += product.price * item.quantity;
            }
        });
    }
    cartTotalAmount.textContent = `S/.${total.toFixed(2)}`;
    updateCartBadge(); // Actualiza el contador cada vez que el carrito se renderiza
};

// Función para añadir producto al carrito
const addToCart = (productId) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1, price: product.price });
        }
        renderCart();
        showConfirmationMessage(); // Llama a la función de animación
        animateCartIcon(); // Llama a la función de animación
    }
};

// Event listener para el icono del carrito (mostrar/ocultar)
cartIcon.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el enlace recargue la página
    cartDropdown.classList.toggle('is-active');
});

// Cerrar el carrito si se hace clic fuera de él, pero no si es dentro del carrito mismo.
document.addEventListener('click', (e) => {
    const isClickInsideCartDropdown = cartDropdown.contains(e.target);
    const isClickOnCartIcon = cartIcon.contains(e.target);
    const isClickOnViewCartBtn = e.target.classList.contains('cart-dropdown__view-cart-btn'); // Cierra si se hace clic en "Ver mi Carrito"

    // Si el carrito está activo Y el clic no fue dentro del carrito Y el clic no fue en el icono del carrito Y no fue en el botón "Ver mi Carrito"
    if (cartDropdown.classList.contains('is-active') && !isClickInsideCartDropdown && !isClickOnCartIcon && !isClickOnViewCartBtn) {
        cartDropdown.classList.remove('is-active');
    }
});


// Event listener para los botones + y - en el carrito desplegable (delegación de eventos)
cartDropdownItems.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('cart-item__btn')) {
        e.stopPropagation(); // Evita que el clic se propague al document y cierre el carrito.
        const productId = target.closest('.cart-item').dataset.productId;
        const item = cart.find(i => i.id === productId);

        if (item) {
            if (target.dataset.action === 'increase-qty') {
                item.quantity++;
            } else if (target.dataset.action === 'decrease-qty') {
                item.quantity--;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== productId); // Eliminar si la cantidad llega a 0
                }
            }
            renderCart(); // Vuelve a renderizar el carrito, pero NO lo cierra
        }
    }
});

// Inicializa el carrito al cargar la página
export const initCart = () => {
    renderCart();
};

// Exporta la función addToCart para que pueda ser usada desde otros módulos
export { addToCart };
