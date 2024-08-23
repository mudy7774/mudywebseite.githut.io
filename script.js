document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed('.muuu', {
        strings: ["Medieninformatik", ],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});



let header = document.querySelector('header');
header.classList.toggle('sticky', window.scrollY > 100);


ScrollReveal({
    reset: true,
    distance: '80px',
    duration:2000,
    delay:200
});
ScrollReveal().reveal('.home-content, .heading', { origin:'top' });
ScrollReveal().reveal('.home-img, .port-box', { origin:'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin:'left' });
ScrollReveal().reveal('.home-content p, .about-content,', { origin:'left' });

