// ==========================================
// DOM Elements
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navLinks = document.querySelectorAll('.nav-link');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
const typingText = document.getElementById('typingText');
const particles = document.getElementById('particles');
const pageLoader = document.getElementById('pageLoader');

// ==========================================
// Page Loader
// ==========================================
function hidePageLoader() {
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 3600);
}

// Hide loader when page is fully loaded
window.addEventListener('load', hidePageLoader);

// ==========================================
// Profile Data
// ==========================================
let profileData = null;
let titles = [];

// Load profile data from JSON
async function loadProfileData() {
    try {
        const response = await fetch('assets/data/profile.json');
        if (!response.ok) throw new Error('Failed to fetch');
        profileData = await response.json();
        titles = profileData.titles;
        renderProfile();
        typeText();
    } catch (error) {
        console.error('Error loading profile data:', error);
        // Use fallback data from inline script
        if (window.profileDataFallback) {
            profileData = window.profileDataFallback;
            titles = profileData.titles;
            renderProfile();
            typeText();
        } else {
            // Ultimate fallback
            titles = ['Full Stack Developer 💻', 'UI/UX Designer 🎨'];
            typeText();
        }
    }
}

// Render profile data to DOM
function renderProfile() {
    if (!profileData) return;

    // Personal info
    const { personal, stats, socialLinks, quickLinks, buttons, footer } = profileData;

    // Logo & Name
    document.getElementById('logoText').textContent = personal.initials;
    document.getElementById('nameText').textContent = personal.name;
    document.getElementById('greetingText').textContent = personal.greeting;
    document.getElementById('bioText').textContent = personal.bio;
    document.getElementById('statusText').textContent = personal.status;
    document.getElementById('profileImg').src = personal.profileImage;

    // Stats
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <span class="stat-number" data-count="${stat.count}">0</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');

    // Action Buttons
    const actionButtons = document.getElementById('actionButtons');
    actionButtons.innerHTML = `
        <a href="${buttons.primary.link}" class="btn btn-primary">
            <i class="${buttons.primary.icon}"></i>
            <span>${buttons.primary.text}</span>
        </a>
        <a href="${buttons.secondary.link}" class="btn btn-secondary">
            <i class="${buttons.secondary.icon}"></i>
            <span>${buttons.secondary.text}</span>
        </a>
    `;

    // Social Links
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinksContainer.innerHTML = socialLinks.map(social => `
        <a href="${social.url}" target="_blank" class="social-link ${social.class}" aria-label="${social.name}">
            <i class="${social.icon}"></i>
            <span class="social-tooltip">${social.name}</span>
        </a>
    `).join('');

    // Quick Links (only if container exists)
    const quickLinksContainer = document.getElementById('quickLinks');
    if (quickLinksContainer) {
        quickLinksContainer.innerHTML = quickLinks.map(link => `
            <a href="${link.url}" target="_blank" class="quick-link">
                <div class="quick-link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="quick-link-content">
                    <span class="quick-link-title">${link.title}</span>
                    <span class="quick-link-desc">${link.description}</span>
                </div>
                <i class="fas fa-arrow-right quick-link-arrow"></i>
            </a>
        `).join('');
    }

    // Footer
    document.getElementById('footerText').innerHTML = `${footer.text} <strong>${personal.name}</strong>`;
    document.getElementById('copyrightText').textContent = footer.copyright;

    // Initialize counter animation after rendering
    initStatsObserver();
}

// ==========================================
// Theme Toggle (Dark Mode)
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

themeToggle.addEventListener('click', toggleTheme);

// ==========================================
// Mobile Menu Toggle
// ==========================================
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
    }
});

// ==========================================
// Active Navigation State
// ==========================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            // Update bottom nav items
            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Handle bottom nav item clicks
bottomNavItems.forEach(item => {
    item.addEventListener('click', function() {
        bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==========================================
// Typing Animation
// ==========================================
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (titles.length === 0) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before typing new title
    }

    setTimeout(typeText, typingSpeed);
}

// ==========================================
// Counter Animation
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        const updateCount = () => {
            const currentCount = +counter.innerText;
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    });
}

// Initialize stats observer
function initStatsObserver() {
    const statsSection = document.querySelector('.profile-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }
}

// ==========================================
// Particle Animation
// ==========================================
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random duration
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particles.appendChild(particle);
    }
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Navbar Background on Scroll & Back to Top
// ==========================================
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Show/hide back to top button
    if (backToTop) {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProfileData(); // Load data from JSON
    createParticles();
    updateActiveNav();
    updateNavbarOnScroll();
});

// ==========================================
// Add hover sound effect (optional)
// ==========================================
const buttons = document.querySelectorAll('.btn, .social-link, .quick-link');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ==========================================
// Easter Egg - Konami Code
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// Scroll Reveal Animation
// ==========================================
function initScrollReveal() {
    // Add reveal classes to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Add reveal-item classes to grid items
    const projectCards = document.querySelectorAll('.project-card');
    const productCards = document.querySelectorAll('.product-card');
    const contactCards = document.querySelectorAll('.contact-card');
    
    projectCards.forEach(card => card.classList.add('reveal-item'));
    productCards.forEach(card => card.classList.add('reveal-item'));
    contactCards.forEach(card => card.classList.add('reveal-item'));
    
    // Intersection Observer for scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger child items animation
                const items = entry.target.querySelectorAll('.reveal-item');
                items.forEach(item => {
                    item.classList.add('active');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
}

// Initialize scroll reveal after page load
window.addEventListener('load', () => {
    setTimeout(initScrollReveal, 100);
});
