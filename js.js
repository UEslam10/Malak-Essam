// Language switching functionality
const navLangButtons = document.querySelectorAll('.nav-lang-btn');

navLangButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');

        // Update active button
        navLangButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Switch language
        switchLanguage(lang);
    });
});

// Language switching function
function switchLanguage(lang) {
    // Update body class and direction
    document.body.className = lang;
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update all elements with data attributes
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            const newContent = element.getAttribute(`data-${lang}`);

            if (element.tagName === 'IMG') {
                element.setAttribute('alt', newContent);
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', newContent);
            } else {
                element.innerHTML = newContent;
            }
        }
    });

     // Re-apply animations
    document.querySelectorAll('.section-title, .subsection-title, .project-item').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = '';
        }, 10);
    });
}
 
// them

const themeSwitch = document.getElementById("theme-switch");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


  // Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter functionality
const counters = document.querySelectorAll('.counter');
let animationStarted = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Intersection Observer for animations and counters
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Add specific animations based on element
            if (entry.target.classList.contains('project-item') ||
                entry.target.classList.contains('testimonial-card') ||
                entry.target.classList.contains('stat-card')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }

            // PROJECT TITLES ANIMATION: Add animation class to subsection titles
            if (entry.target.classList.contains('subsection-title')) {
                entry.target.classList.add('animated');
            }

            // Start counter animation for statistics section
            if (entry.target.id === 'statistics' && !animationStarted) {
                animationStarted = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation including testimonial cards and statistics
document.querySelectorAll('.project-item, .about-image, .about-text, .testimonial-card, .stat-card, #statistics, .subsection-title').forEach(el => {
    observer.observe(el);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // On larger screens, ensure nav is visible
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }, 250);
});

/* Reveal divs except header, nav, footer */

const divs = document.querySelectorAll(
    "div:not(header div):not(nav div):not(footer div)"
);

divs.forEach(div => {
    div.classList.add("reveal");
});

window.addEventListener("scroll", () => {

    divs.forEach(div => {

        const top = div.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (top < screenHeight - 100) {
            div.classList.add("show");
        }

    });

});
