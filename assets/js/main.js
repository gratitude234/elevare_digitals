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

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    },
    { threshold: 0.25 }
);

document.querySelectorAll('.section, .hero-card, .work-card, .service-card').forEach((element) => {
    observer.observe(element);
});

const mailLinks = document.querySelectorAll('.mailto-trigger');
mailLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const address = link.dataset.mail;
        if (!address) return;
        const subject = link.dataset.subject ? `?subject=${encodeURIComponent(link.dataset.subject)}` : '';
        window.location.href = `mailto:${address}${subject}`;
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const subject = encodeURIComponent('New project inquiry from Elevare site');
        const bodyLines = [
            `Name: ${formData.get('name') || ''}`,
            `Email: ${formData.get('email') || ''}`,
            `Company: ${formData.get('company') || 'N/A'}`,
            '',
            formData.get('message') || ''
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:elevaredigitals30@gmail.com?subject=${subject}&body=${body}`;
    });
}
