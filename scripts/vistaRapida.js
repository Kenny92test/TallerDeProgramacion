import { productsData } from './data.js';
import { addToCart } from './carrito.js'; // Importa la función addToCart del módulo de carrito

const mainHeader = document.getElementById('main-header');
const quickViewModal = document.getElementById('quick-view-modal');
const closeQuickViewModalBtn = document.getElementById('close-quick-view-modal');
const quickViewImage = document.getElementById('quick-view-image');
const quickViewName = document.getElementById('quick-view-name');
const quickViewPrice = document.getElementById('quick-view-price');
const quickViewDescription = document.getElementById('quick-view-description');
const quickViewFeatures = document.getElementById('quick-view-features');
const quickViewAddToCartBtn = document.getElementById('quick-view-add-to-cart');


// Función para mostrar el modal de vista rápida
const showQuickViewModal = (productId) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        quickViewImage.src = product.image.replace('250x250', '300x300'); // Asegura una imagen de buen tamaño
        quickViewImage.alt = product.name;
        quickViewName.textContent = product.name;
        quickViewPrice.textContent = `S/.${product.price.toFixed(2)}`;
        quickViewDescription.textContent = product.description;

        quickViewFeatures.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            quickViewFeatures.appendChild(li);
        });

        // Asigna el ID del producto al botón de añadir al carrito en el modal
        quickViewAddToCartBtn.dataset.productId = productId;

        quickViewModal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Evita el scroll del body
        mainHeader.classList.add('is-hidden'); // Oculta el header
    }
};

// Función para ocultar el modal de vista rápida
const hideQuickViewModal = () => {
    quickViewModal.classList.remove('is-active');
    document.body.style.overflow = ''; // Restaura el scroll del body
    mainHeader.classList.remove('is-hidden'); // Muestra el header
};

// Inicializa los event listeners del modal
export const initModal = () => {
    // Event listener para abrir el modal (en los botones de Vista Rápida)
    document.querySelectorAll('.product-card__quick-view').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.closest('.product-card').dataset.productId;
            showQuickViewModal(productId);
        });
    });

    // Event listener para cerrar el modal
    closeQuickViewModalBtn.addEventListener('click', hideQuickViewModal);

    // Cerrar modal al hacer clic fuera del contenido del modal
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            hideQuickViewModal();
        }
    });

    // Botón "Añadir al Carrito" dentro del modal de Vista Rápida
    quickViewAddToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = quickViewAddToCartBtn.dataset.productId; // Obtenemos el ID del dataset del botón
        addToCart(productId); // Llama a la función addToCart del módulo de carrito
        // El modal no se cierra automáticamente. La confirmación y la animación del carrito se activan.
    });
};
