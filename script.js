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
const languageButtons = document.querySelectorAll('.lang-btn');
const translations = {
    de: {
        title: 'Meine Webseite',
        typed: ['Medieninformatik'],
        dotLabel: 'Bild',
        dotAction: 'anzeigen',
        text: {
            'skip.link': 'Direkt zum Inhalt',
            'menu.open': 'Menue oeffnen',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.photos': 'Foto',
            'nav.contact': 'Contact',
            'language.group': 'Sprachauswahl',
            'home.greeting': 'Hallo, Das bin ich',
            'home.studyPrefix': 'und ich studiere',
            'home.bio': 'Ich komme urspruenglich aus Syrien und lebe seit neun Jahren in Deutschland. Mein Studium ist fuer mich von grosser Bedeutung. Der Studiengang, den ich gewaehlt habe, passt perfekt zu meinen Interessen und meiner beruflichen Ausrichtung.',
            'home.ctaContact': 'Kontakt',
            'home.ctaPhotos': 'Fotos ansehen',
            'about.heading1': 'About',
            'about.heading2': 'Me',
            'about.bio': 'Ich bin ein leidenschaftlicher Reisender, der gerne neue Kulturen entdeckt und sich von der Vielfalt der Welt inspirieren laesst. In meiner Freizeit tauche ich gerne in spannende Buecher ein, die mir neue Perspektiven eroeffnen und meinen Horizont erweitern. Fitness ist mir wichtig, und ich verbringe regelmaessig Zeit im Fitnessstudio, um Koerper und Geist in Balance zu halten. Zusaetzlich spiele ich gerne Schach, da es mir hilft, strategisches Denken zu foerdern und meine Konzentration zu verbessern.',
            'photos.heading1': 'Meine',
            'photos.heading2': 'Fotos',
            'photos.prev': 'Vorheriges Foto',
            'photos.next': 'Naechstes Foto',
            'photos.dots': 'Bildauswahl',
            'contact.heading1': 'Kontakt',
            'contact.heading2': 'aufnehmen',
            'contact.text': 'Du kannst mir jederzeit schreiben.',
            'footer.thanks': 'Danke fuer Ihren Besuch'
        }
    },
    en: {
        title: 'My Website',
        typed: ['Media Computer Science'],
        dotLabel: 'Image',
        dotAction: 'show',
        text: {
            'skip.link': 'Skip to content',
            'menu.open': 'Open menu',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.photos': 'Photos',
            'nav.contact': 'Contact',
            'language.group': 'Language switch',
            'home.greeting': 'Hi, this is me',
            'home.studyPrefix': 'and I study',
            'home.bio': 'I am originally from Syria and have been living in Germany for nine years. My studies are very important to me. The degree program I chose fits my interests and my professional goals perfectly.',
            'home.ctaContact': 'Contact',
            'home.ctaPhotos': 'View photos',
            'about.heading1': 'About',
            'about.heading2': 'Me',
            'about.bio': 'I am a passionate traveler who enjoys discovering new cultures and drawing inspiration from the diversity of the world. In my free time, I like reading exciting books that open new perspectives and broaden my horizon. Fitness is important to me, and I regularly spend time at the gym to keep body and mind in balance. I also enjoy playing chess because it helps me improve strategic thinking and concentration.',
            'photos.heading1': 'My',
            'photos.heading2': 'Photos',
            'photos.prev': 'Previous photo',
            'photos.next': 'Next photo',
            'photos.dots': 'Image selection',
            'contact.heading1': 'Get',
            'contact.heading2': 'in touch',
            'contact.text': 'You can message me anytime.',
            'footer.thanks': 'Thanks for visiting'
        }
    }
};
const photoItemsByLanguage = {
    de: [
        {
            src: 'foto1.jpg',
            alt: 'Erhalt der deutschen Staatsangehoerigkeit',
            caption: 'Die deutsche Staatsangehoerigkeit erhalten'
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
            alt: 'Portraetfoto von mir',
            caption: 'Das bin ich'
        }
    ],
    en: [
        {
            src: 'foto1.jpg',
            alt: 'Receiving German citizenship',
            caption: 'Receiving German citizenship'
        },
        {
            src: 'foto2.jpg',
            alt: 'Visit to my favorite restaurant',
            caption: 'My favorite restaurant'
        },
        {
            src: 'foto7.jpg',
            alt: 'Photo with friends',
            caption: 'Friends'
        },
        {
            src: 'foto4.jpg',
            alt: 'My favorite car',
            caption: 'My favorite car'
        },
        {
            src: 'foto5.jpg',
            alt: 'At the gym',
            caption: 'Springer Gym'
        },
        {
            src: 'foto6.jpg',
            alt: 'Portrait photo of me',
            caption: 'This is me'
        }
    ]
};

let currentPhotoIndex = 0;
let autoSlideTimer = null;
let touchStartX = null;
let photoDots = [];
let currentLanguage = 'de';
let typedInstance = null;
let photoItems = photoItemsByLanguage.de;

function initTechBackground() {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    const depth = 1.25;
    let particles = [];
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let pixelRatio = 1;
    const particleCount = noHover ? 28 : 52;

    function createParticle() {
        return {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * depth + 0.2,
            speed: 0.002 + Math.random() * 0.003,
            size: 0.8 + Math.random() * 1.7
        };
    }

    function resizeCanvas() {
        pixelRatio = Math.min(window.devicePixelRatio || 1, 1.8);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * pixelRatio);
        canvas.height = Math.floor(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function project(particle) {
        const zoom = 0.35 / particle.z;
        const offsetX = mouseX * (1.6 - particle.z);
        const offsetY = mouseY * (1.6 - particle.z);

        return {
            x: particle.x * width * zoom + width * 0.5 + offsetX,
            y: particle.y * height * zoom + height * 0.5 + offsetY,
            z: particle.z,
            size: particle.size * (1.6 - particle.z * 0.6)
        };
    }

    function drawFrame() {
        context.clearRect(0, 0, width, height);

        const points = particles.map((particle) => {
            particle.z -= particle.speed;
            if (particle.z <= 0.16) {
                particle.x = Math.random() * 2 - 1;
                particle.y = Math.random() * 2 - 1;
                particle.z = depth;
            }

            return project(particle);
        });

        for (let i = 0; i < points.length; i += 1) {
            const pointA = points[i];

            context.beginPath();
            context.fillStyle = `rgba(56, 189, 248, ${0.22 + (1.4 - pointA.z) * 0.26})`;
            context.arc(pointA.x, pointA.y, Math.max(0.8, pointA.size), 0, Math.PI * 2);
            context.fill();

            for (let j = i + 1; j < points.length; j += 1) {
                const pointB = points[j];
                const dx = pointA.x - pointB.x;
                const dy = pointA.y - pointB.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 120) {
                    const alpha = (1 - distance / 120) * 0.18;
                    context.beginPath();
                    context.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                    context.lineWidth = 1;
                    context.moveTo(pointA.x, pointA.y);
                    context.lineTo(pointB.x, pointB.y);
                    context.stroke();
                }
            }
        }
    }

    function animate() {
        drawFrame();
        if (!document.hidden && !reduceMotion) {
            animationFrameId = window.requestAnimationFrame(animate);
        }
    }

    particles = Array.from({ length: particleCount }, createParticle);
    resizeCanvas();
    drawFrame();

    if (!reduceMotion) {
        animationFrameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / width - 0.5) * 26;
        mouseY = (event.clientY / height - 0.5) * 18;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
            return;
        }

        if (!document.hidden && !reduceMotion && !animationFrameId) {
            animationFrameId = window.requestAnimationFrame(animate);
        }
    });
}

function initTypedEffect(language) {
    if (!window.Typed) {
        return;
    }

    if (typedInstance) {
        typedInstance.destroy();
        const typedTarget = document.querySelector('.muuu');
        if (typedTarget) {
            typedTarget.textContent = '';
        }
    }

    typedInstance = new window.Typed('.muuu', {
        strings: translations[language].typed,
        typeSpeed: 90,
        backSpeed: 70,
        backDelay: 1200,
        loop: true
    });
}

function setLanguage(language) {
    const nextLanguage = translations[language] ? language : 'de';
    currentLanguage = nextLanguage;
    photoItems = photoItemsByLanguage[nextLanguage];

    document.documentElement.lang = nextLanguage;
    document.title = translations[nextLanguage].title;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.dataset.i18n;
        const text = translations[nextLanguage].text[key];
        if (text) {
            node.textContent = text;
        }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
        const key = node.dataset.i18nAriaLabel;
        const label = translations[nextLanguage].text[key];
        if (label) {
            node.setAttribute('aria-label', label);
        }
    });

    languageButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.lang === nextLanguage);
        button.setAttribute('aria-pressed', String(button.dataset.lang === nextLanguage));
    });

    initPhotoDots();
    const safeIndex = Math.min(currentPhotoIndex, photoItems.length - 1);
    renderPhoto(Math.max(0, safeIndex));
    initTypedEffect(nextLanguage);
    window.localStorage.setItem('preferredLanguage', nextLanguage);
}

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

    const dotLabel = translations[currentLanguage].dotLabel;
    const dotAction = translations[currentLanguage].dotAction;

    const dotsMarkup = photoItems
        .map((_, index) => `<button class="foto-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="${dotLabel} ${index + 1} ${dotAction}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`)
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
    const browserLanguage = window.navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
    const savedLanguage = window.localStorage.getItem('preferredLanguage');
    const initialLanguage = savedLanguage || browserLanguage;

    updateHeaderState();
    updateActiveLink();
    setLanguage(initialLanguage);
    initTechBackground();

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang || 'de');
        });
    });

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

    if (window.ScrollReveal) {
        window.ScrollReveal({
            distance: '70px',
            duration: 1200,
            delay: 150,
            reset: false
        });

        window.ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        window.ScrollReveal().reveal('.img, .foto-viewer, .contact', { origin: 'bottom' });
        window.ScrollReveal().reveal('.about-img', { origin: 'left' });
        window.ScrollReveal().reveal('.about-content, .home-content p', { origin: 'right' });
    }
});


