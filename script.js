const header = document.querySelector('.header');
const menuButton = document.querySelector('#meno');
const menuIcon = menuButton ? menuButton.querySelector('i') : null;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');
const languageButtons = document.querySelectorAll('.lang-btn');

const translations = {
    de: {
        title: 'Meine Webseite',
        typed: ['Medieninformatik', 'Web-Entwicklung', 'UI/UX Design'],
        text: {
            'skip.link': 'Direkt zum Inhalt',
            'menu.open': 'Menue oeffnen',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.photos': 'Fotos',
            'nav.contact': 'Contact',
            'language.group': 'Sprachauswahl',
            'home.greeting': 'Hallo, Das bin ich',
            'home.studyPrefix': 'und ich studiere',
            'home.bio': 'Ich komme urspruenglich aus Syrien und lebe seit neun Jahren in Deutschland. Mein Studium ist fuer mich von grosser Bedeutung. Der Studiengang, den ich gewaehlt habe, passt perfekt zu meinen Interessen und meiner beruflichen Ausrichtung.',
            'home.ctaContact': 'Kontakt',
            'home.ctaPhotos': 'Fotos ansehen',
            'about.heading1': 'Ueber',
            'about.heading2': 'Mich',
            'about.bio': 'Ich bin ein leidenschaftlicher Reisender, der gerne neue Kulturen entdeckt und sich von der Vielfalt der Welt inspirieren laesst. In meiner Freizeit tauche ich gerne in spannende Buecher ein, die mir neue Perspektiven eroeffnen und meinen Horizont erweitern. Fitness ist mir wichtig, und ich verbringe regelmaessig Zeit im Fitnessstudio, um Koerper und Geist in Balance zu halten. Zusaetzlich spiele ich gerne Schach, da es mir hilft, strategisches Denken zu foerdern und meine Konzentration zu verbessern.',
            'contact.heading1': 'Kontakt',
            'contact.heading2': 'aufnehmen',
            'contact.text': 'Du kannst mir jederzeit schreiben.',
            'contact.form.nameLabel': 'Name',
            'contact.form.emailLabel': 'E-Mail',
            'contact.form.messageLabel': 'Nachricht',
            'contact.form.name': 'Dein Name',
            'contact.form.email': 'Deine E-Mail',
            'contact.form.message': 'Deine Nachricht',
            'contact.form.send': 'Senden',
            'contact.form.success': 'Danke! Deine Nachricht wurde gesendet.',
            'contact.form.error': 'Bitte alle Felder korrekt ausfuellen.',
            'contact.form.networkError': 'Senden fehlgeschlagen. Bitte spaeter erneut versuchen.',
            'footer.thanks': 'Danke fuer Ihren Besuch'
        }
    },
    en: {
        title: 'My Website',
        typed: ['Media Computer Science', 'Web Development', 'UI/UX Design'],
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
            'contact.heading1': 'Get',
            'contact.heading2': 'in touch',
            'contact.text': 'You can message me anytime.',
            'contact.form.nameLabel': 'Name',
            'contact.form.emailLabel': 'Email',
            'contact.form.messageLabel': 'Message',
            'contact.form.name': 'Your name',
            'contact.form.email': 'Your email',
            'contact.form.message': 'Your message',
            'contact.form.send': 'Send',
            'contact.form.success': 'Thanks! Your message has been sent.',
            'contact.form.error': 'Please fill in all fields correctly.',
            'contact.form.networkError': 'Sending failed. Please try again later.',
            'footer.thanks': 'Thanks for visiting'
        }
    }
};

let currentLanguage = 'de';
let typedInstance = null;

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

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
        const key = node.dataset.i18nPlaceholder;
        const text = translations[nextLanguage].text[key];
        if (text) {
            node.setAttribute('placeholder', text);
        }
    });

    languageButtons.forEach((button) => {
        const isActive = button.dataset.lang === nextLanguage;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    initTypedEffect(nextLanguage);
    window.localStorage.setItem('preferredLanguage', nextLanguage);
}

function closeMenu() {
    if (!navbar || !menuButton) {
        return;
    }

    navbar.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
    }
}

function toggleMenu() {
    if (!navbar || !menuButton) {
        return;
    }

    const isOpen = navbar.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(isOpen));

    if (menuIcon) {
        menuIcon.classList.toggle('bx-menu', !isOpen);
        menuIcon.classList.toggle('bx-x', isOpen);
    }
}

function updateHeaderState() {
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 80);
    }
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

function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    const formFeedback = document.querySelector('#form-feedback');
    if (!contactForm || !formFeedback) {
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nameField = contactForm.querySelector('#form-name');
        const emailField = contactForm.querySelector('#form-email');
        const messageField = contactForm.querySelector('#form-message');

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const message = messageField.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !emailPattern.test(email) || !message) {
            formFeedback.textContent = translations[currentLanguage].text['contact.form.error'];
            formFeedback.style.color = '#f87171';
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const response = await window.fetch('https://formsubmit.co/ajax/mohamad95issa@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: 'Neue Nachricht von mudy.html',
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            formFeedback.textContent = translations[currentLanguage].text['contact.form.success'];
            formFeedback.style.color = 'var(--main-color)';
            contactForm.reset();
        } catch (error) {
            formFeedback.textContent = translations[currentLanguage].text['contact.form.networkError'];
            formFeedback.style.color = '#f87171';
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
    if (!navbar || !menuButton) {
        return;
    }

    if (!navbar.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
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
    initContactForm();

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang || 'de');
        });
    });

    if (window.ScrollReveal) {
        window.ScrollReveal({
            distance: '70px',
            duration: 1200,
            delay: 150,
            reset: false
        });

        window.ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        window.ScrollReveal().reveal('.img, .single-photo-card, .contact', { origin: 'bottom' });
        window.ScrollReveal().reveal('.about-img', { origin: 'left' });
        window.ScrollReveal().reveal('.about-content, .home-content p', { origin: 'right' });
    }
});


