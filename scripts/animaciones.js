const addToCartConfirmation = document.getElementById('add-to-cart-confirmation');
const cartIcon = document.getElementById('cart-icon');

// Función para mostrar el mensaje de confirmación
let confirmationTimeout;
export const showConfirmationMessage = () => {
    clearTimeout(confirmationTimeout); // Limpia cualquier timeout anterior
    addToCartConfirmation.classList.add('show');
    confirmationTimeout = setTimeout(() => {
        addToCartConfirmation.classList.remove('show');
    }, 2500); // El mensaje desaparece después de 2.5 segundos
};

// Función para animar el icono del carrito
export const animateCartIcon = () => {
    cartIcon.classList.remove('bouncing'); // Resetear la animación
    void cartIcon.offsetWidth; // Truco para forzar el reflow y reiniciar la animación
    cartIcon.classList.add('bouncing');
};

// Animaciones de Revelado al Scroll (Quiénes Somos)
export const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll('.reveal');

    const handleReveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que se activa
            }
        });
    };

    const revealObserver = new IntersectionObserver(handleReveal, {
        root: null, // viewport como root
        threshold: 0.15 // Al menos el 15% del elemento debe estar visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
};
