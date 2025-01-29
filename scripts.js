document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = link.getAttribute('href');
        });
    });

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Perform form validation and submission logic here
            alert('Form submitted successfully!');
            form.reset();
        });
    }
});
