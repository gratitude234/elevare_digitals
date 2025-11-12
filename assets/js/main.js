const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const navLinks = document.querySelectorAll('.nav a[href^="#"]');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

if (document.body) {
    window.requestAnimationFrame(() => {
        document.body.classList.add('reveal-ready');
    });
}

const header = document.querySelector('.site-header');
if (header) {
    const toggleHeaderState = () => {
        const scrolled = window.scrollY > 20;
        header.setAttribute('data-scrolled', scrolled ? 'true' : 'false');
    };
    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState, { passive: true });
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((element) => {
        observer.observe(element);
    });
} else {
    document.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('in-view');
    });
}
