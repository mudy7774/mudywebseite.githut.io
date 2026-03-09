const header = document.querySelector('.header');
const menuIcon = document.querySelector('#meno');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');
const photoViewer = document.querySelector('.foto-viewer');
const mainPhoto = document.querySelector('#foto-main-image');
const mainCaption = document.querySelector('#foto-main-caption');
const photoDotsContainer = document.querySelector('#foto-dots');
const prevPhotoButton = document.querySelector('#foto-prev');
const nextPhotoButton = document.querySelector('#foto-next');
const photoItems = [
    {
        src: 'foto1.jpg',
        alt: 'Erhalt der deutschen Staatsangehörigkeit',
        caption: 'Die deutsche Staatsangehörigkeit erhalten'
    },
    {
        src: 'foto2.jpg',
        alt: 'Besuch im Lieblingsrestaurant',
        caption: 'Mein Lieblingsrestaurant'
    },
    {
        src: 'foto7.jpg',
        alt: 'Foto mit Freunden',
        caption: 'Freunde'
    },
    {
        src: 'foto4.jpg',
        alt: 'Mein Lieblingsauto',
        caption: 'Mein Lieblingsauto'
    },
    {
        src: 'foto5.jpg',
        alt: 'Im Fitnessstudio',
        caption: 'Springer Fitnessstudio'
    },
    {
        src: 'foto6.jpg',
        alt: 'Porträtfoto von mir',
        caption: 'Das bin ich'
    }
];

let currentPhotoIndex = 0;
let autoSlideTimer = null;
let touchStartX = null;
let photoDots = [];

function closeMenu() {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
    menuIcon.setAttribute('aria-expanded', String(isOpen));
}

function updateHeaderState() {
    header.classList.toggle('sticky', window.scrollY > 80);
}

function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

function renderPhoto(index) {
    if (!mainPhoto || !mainCaption || !photoItems.length) {
        return;
    }

    if (index < 0 || index >= photoItems.length) {
        return;
    }

    const photo = photoItems[index];
    mainPhoto.classList.add('is-changing');

    window.setTimeout(() => {
        mainPhoto.src = photo.src;
        mainPhoto.alt = photo.alt;
        mainCaption.textContent = photo.caption;
        mainPhoto.classList.remove('is-changing');
    }, 140);

    currentPhotoIndex = index;
    photoDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentPhotoIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
}

function initPhotoDots() {
    if (!photoDotsContainer || !photoItems.length) {
        return;
    }

    const dotsMarkup = photoItems
        .map((_, index) => `<button class="foto-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Bild ${index + 1} anzeigen" aria-current="${index === 0 ? 'true' : 'false'}"></button>`)
        .join('');

    photoDotsContainer.innerHTML = dotsMarkup;
    photoDots = Array.from(photoDotsContainer.querySelectorAll('.foto-dot'));

    photoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            renderPhoto(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
}

function showRelativePhoto(step) {
    if (!photoItems.length) {
        return;
    }

    const nextIndex = (currentPhotoIndex + step + photoItems.length) % photoItems.length;
    renderPhoto(nextIndex);
}

function showRandomPhoto() {
    if (!photoItems.length) {
        return;
    }

    if (photoItems.length === 1) {
        renderPhoto(0);
        return;
    }

    let randomIndex = currentPhotoIndex;
    while (randomIndex === currentPhotoIndex) {
        randomIndex = Math.floor(Math.random() * photoItems.length);
    }

    renderPhoto(randomIndex);
}

function startAutoSlide() {
    if (autoSlideTimer || !photoItems.length) {
        return;
    }

    autoSlideTimer = window.setInterval(() => {
        showRandomPhoto();
    }, 4500);
}

function stopAutoSlide() {
    if (!autoSlideTimer) {
        return;
    }

    window.clearInterval(autoSlideTimer);
    autoSlideTimer = null;
}

menuIcon.setAttribute('aria-expanded', 'false');

menuIcon.addEventListener('click', toggleMenu);

menuIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }

    if (event.key === '<') {
        showRelativePhoto(-1);
        stopAutoSlide();
        startAutoSlide();
    }

    if (event.key === '>') {
        showRandomPhoto();
        stopAutoSlide();
        startAutoSlide();
    }
});

window.addEventListener('scroll', () => {
    updateHeaderState();
    updateActiveLink();
});

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderState();
    updateActiveLink();
    initPhotoDots();
    renderPhoto(0);

    if (prevPhotoButton) {
        prevPhotoButton.addEventListener('click', () => {
            showRelativePhoto(-1);
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextPhotoButton) {
        nextPhotoButton.addEventListener('click', () => {
            showRandomPhoto();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (photoViewer) {
        photoViewer.addEventListener('mouseenter', stopAutoSlide);
        photoViewer.addEventListener('mouseleave', startAutoSlide);
        photoViewer.addEventListener('focusin', stopAutoSlide);
        photoViewer.addEventListener('focusout', startAutoSlide);

        photoViewer.addEventListener('touchstart', (event) => {
            const touch = event.changedTouches[0];
            touchStartX = touch ? touch.clientX : null;
            stopAutoSlide();
        }, { passive: true });

        photoViewer.addEventListener('touchend', (event) => {
            const touch = event.changedTouches[0];
            if (!touch || touchStartX === null) {
                startAutoSlide();
                return;
            }

            const deltaX = touch.clientX - touchStartX;

            if (deltaX > 45) {
                showRelativePhoto(-1);
            } else if (deltaX < -45) {
                showRandomPhoto();
            }

            touchStartX = null;
            startAutoSlide();
        }, { passive: true });
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        startAutoSlide();
    }

    new Typed('.muuu', {
        strings: ['Medieninformatik'],
        typeSpeed: 90,
        backSpeed: 70,
        backDelay: 1200,
        loop: true
    });

    ScrollReveal({
        distance: '70px',
        duration: 1200,
        delay: 150,
        reset: false
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.img, .foto-viewer, .contact', { origin: 'bottom' });
    ScrollReveal().reveal('.about-img', { origin: 'left' });
    ScrollReveal().reveal('.about-content, .home-content p', { origin: 'right' });
});

