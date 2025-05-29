export const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.main-nav__link');
    const header = document.getElementById('main-header'); // Asegúrate de que tu header tiene este ID

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                const targetId = this.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
};
