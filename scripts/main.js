import { initCart, addToCart } from './carrito.js';
import { initModal } from './vistaRapida.js';
import { initSmoothScroll } from './scrollSuave.js';
import { initRevealAnimations } from './animaciones.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los módulos
    initCart(); // Inicializa el carrito y su contador al cargar la página
    initModal(); // Inicializa la lógica del modal
    initSmoothScroll(); // Inicializa el desplazamiento suave
    initRevealAnimations(); // Inicializa las animaciones de revelado

    // Event listener para los botones "Añadir al Carrito" en las tarjetas de producto
    // Estos deben seguir aquí porque necesitan acceder a la función addToCart globalmente
    document.querySelectorAll('.product-card__action-button--add').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.closest('.product-card').dataset.productId;
            addToCart(productId);
        });
    });

    // Si tienes alguna otra lógica que no encaje en los módulos anteriores,
    // puedes colocarla aquí directamente.
});
