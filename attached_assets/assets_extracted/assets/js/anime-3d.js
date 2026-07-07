// ==========================================
// ANIME.JS 3D Animations & Effects
// ==========================================

(function () {
    'use strict';

    // Wait for DOM + anime.js ready
    function init3D() {
        if (typeof anime === 'undefined') {
            console.warn('anime.js not loaded');
            return;
        }

        create3DShapes();
        initPageLoaderAnime();
        initHeroAnimations();
        initScrollAnimations();
        initTiltEffects();
        initParallaxMouse();
        initNavbarAnime();
        initFloatingShapes();
    }

    // ==========================================
    // Create 3D Background Shapes
    // ==========================================
    function create3DShapes() {
        const scene = document.getElementById('scene3d');
        if (!scene) return;

        for (let i = 1; i <= 4; i++) {
            const shape = document.createElement('div');
            shape.classList.add('floating-shape', `shape-${i}`);
            scene.appendChild(shape);
        }
    }

    // ==========================================
    // Floating Background Shapes Animation
    // ==========================================
    function initFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        if (shapes.length === 0) return;

        shapes.forEach((shape, i) => {
            anime({
                targets: shape,
                translateX: () => anime.random(-60, 60),
                translateY: () => anime.random(-60, 60),
                rotateX: () => anime.random(-30, 30),
                rotateY: () => anime.random(-30, 30),
                rotateZ: () => anime.random(-15, 15),
                scale: [0.9, 1.1],
                opacity: [0.04, 0.1],
                duration: () => anime.random(6000, 10000),
                easing: 'easeInOutQuad',
                direction: 'alternate',
                loop: true,
                delay: i * 800
            });
        });
    }

    // ==========================================
    // Page Loader with Anime.js
    // ==========================================
    function initPageLoaderAnime() {
        const loaderLetters = document.querySelectorAll('.loader-letter');
        if (loaderLetters.length === 0) return;

        // Enhanced 3D letter animation
        anime({
            targets: '.loader-letter',
            translateY: [60, 0],
            rotateX: [-90, 0],
            rotateY: [45, 0],
            scale: [0.5, 1],
            opacity: [0, 1],
            duration: 1200,
            delay: anime.stagger(200),
            easing: 'easeOutElastic(1, 0.6)'
        });

        // Loader subtitle
        anime({
            targets: '.loader-subtitle',
            opacity: [0, 0.8],
            translateY: [20, 0],
            translateZ: [50, 0],
            duration: 800,
            delay: 1400,
            easing: 'easeOutCubic'
        });

        // Loader dots - 3D bounce
        anime({
            targets: '.loader-dot',
            scale: [0, 1],
            translateZ: [30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(150, { start: 1800 }),
            easing: 'easeOutBack'
        });
    }

    // ==========================================
    // Hero Section Entrance - 3D
    // ==========================================
    function initHeroAnimations() {
        // Wait for page load
        const observer = new MutationObserver((mutations) => {
            if (document.body.classList.contains('loaded')) {
                observer.disconnect();
                runHeroAnimations();
            }
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        // Fallback - in case 'loaded' is already set
        if (document.body.classList.contains('loaded')) {
            runHeroAnimations();
        }
    }

    function runHeroAnimations() {
        const timeline = anime.timeline({
            easing: 'easeOutCubic'
        });

        // Profile image - 3D flip in
        timeline.add({
            targets: '.profile-image-wrapper',
            rotateY: [-90, 0],
            rotateX: [30, 0],
            scale: [0.3, 1],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutElastic(1, 0.5)'
        });

        // Profile name - 3D slide in
        timeline.add({
            targets: '.profile-name',
            translateX: [-100, 0],
            rotateY: [-45, 0],
            opacity: [0, 1],
            duration: 900,
            easing: 'easeOutCubic'
        }, '-=700');

        // Profile title - typewriter depth
        timeline.add({
            targets: '.profile-title',
            translateZ: [-80, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 700,
            easing: 'easeOutCubic'
        }, '-=500');

        // Bio text
        timeline.add({
            targets: '.profile-bio',
            translateY: [40, 0],
            rotateX: [-15, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutCubic'
        }, '-=400');

        // Social links - staggered 3D
        timeline.add({
            targets: '.social-link',
            rotateY: [-90, 0],
            translateZ: [-50, 0],
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(80),
            easing: 'easeOutBack'
        }, '-=400');

        // Stats - 3D flip up
        timeline.add({
            targets: '.stat-item',
            rotateX: [90, 0],
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(120),
            easing: 'easeOutCubic'
        }, '-=400');

        // Action buttons - slide in from sides
        timeline.add({
            targets: '.action-buttons .btn',
            translateX: (el, i) => [i === 0 ? -60 : 60, 0],
            rotateY: (el, i) => [i === 0 ? -30 : 30, 0],
            opacity: [0, 1],
            duration: 700,
            delay: anime.stagger(150),
            easing: 'easeOutCubic'
        }, '-=500');

        // Testimonial button
        timeline.add({
            targets: '.btn-testimonial',
            scaleX: [0, 1],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutBack'
        }, '-=300');
    }

    // ==========================================
    // Scroll-Triggered 3D Animations
    // ==========================================
    function initScrollAnimations() {
        // Project cards
        observeElements('.project-card', (entries) => {
            const visibleCards = entries.filter(e => e.isIntersecting).map(e => e.target);
            if (visibleCards.length > 0) {
                anime({
                    targets: visibleCards,
                    translateY: [60, 0],
                    rotateY: [-25, 0],
                    rotateX: [15, 0],
                    translateZ: [-80, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: anime.stagger(150),
                    easing: 'easeOutCubic'
                });
            }
        });

        // Product cards
        observeElements('.product-card', (entries) => {
            const visible = entries.filter(e => e.isIntersecting).map(e => e.target);
            if (visible.length > 0) {
                anime({
                    targets: visible,
                    scale: [0.5, 1],
                    rotateX: [60, 0],
                    rotateZ: [-10, 0],
                    translateZ: [-100, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: anime.stagger(100),
                    easing: 'easeOutBack'
                });
            }
        });

        // Contact cards
        observeElements('.contact-card', (entries) => {
            const visible = entries.filter(e => e.isIntersecting).map(e => e.target);
            if (visible.length > 0) {
                anime({
                    targets: visible,
                    translateX: (el, i) => [(i % 2 === 0 ? -80 : 80), 0],
                    rotateY: (el, i) => [(i % 2 === 0 ? -30 : 30), 0],
                    opacity: [0, 1],
                    duration: 900,
                    delay: anime.stagger(120),
                    easing: 'easeOutCubic'
                });
            }
        });

        // Section headers
        observeElements('.section-header', (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const header = entry.target;

                    anime({
                        targets: header.querySelector('.section-badge'),
                        translateY: [-30, 0],
                        rotateX: [-45, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutCubic'
                    });

                    anime({
                        targets: header.querySelector('.section-title'),
                        scale: [0.6, 1],
                        rotateX: [45, 0],
                        translateZ: [-60, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        delay: 200,
                        easing: 'easeOutElastic(1, 0.6)'
                    });

                    anime({
                        targets: header.querySelector('.section-subtitle'),
                        translateY: [20, 0],
                        opacity: [0, 1],
                        duration: 700,
                        delay: 400,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    }

    // Helper: IntersectionObserver for elements
    function observeElements(selector, callback) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            callback(entries);
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        elements.forEach(el => {
            // Reset initial state
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ==========================================
    // Detect touch device
    // ==========================================
    const isTouchDevice = () => (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(max-width: 768px)').matches
    );

    // ==========================================
    // 3D Tilt Effect on Cards (Mouse Tracking)
    // Only on desktop
    // ==========================================
    function initTiltEffects() {
        if (isTouchDevice()) return;

        const tiltElements = document.querySelectorAll('.project-card, .product-card, .contact-card, .profile-stats');

        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                anime({
                    targets: el,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    translateZ: 15,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            el.addEventListener('mouseleave', () => {
                anime({
                    targets: el,
                    rotateX: 0,
                    rotateY: 0,
                    translateZ: 0,
                    duration: 600,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            });
        });
    }

    // ==========================================
    // Mouse Parallax on Hero Section (Desktop only)
    // ==========================================
    function initParallaxMouse() {
        if (isTouchDevice()) return;

        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const profileImg = hero.querySelector('.profile-image-wrapper');
        const profileInfo = hero.querySelector('.profile-info');
        const socialSection = hero.querySelector('.social-section');
        const statsSection = hero.querySelector('.profile-stats');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            if (profileImg) {
                anime({
                    targets: profileImg,
                    translateX: x * 12,
                    translateY: y * 8,
                    rotateY: x * 6,
                    rotateX: -y * 4,
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (profileInfo) {
                anime({
                    targets: profileInfo,
                    translateX: x * 6,
                    translateY: y * 4,
                    duration: 1000,
                    easing: 'easeOutQuad'
                });
            }

            if (socialSection) {
                anime({
                    targets: socialSection,
                    translateX: x * 4,
                    translateY: y * 2,
                    duration: 1200,
                    easing: 'easeOutQuad'
                });
            }

            if (statsSection) {
                anime({
                    targets: statsSection,
                    translateX: x * -5,
                    translateY: y * -3,
                    rotateY: x * 2,
                    duration: 900,
                    easing: 'easeOutQuad'
                });
            }

            // Floating shapes parallax
            const shapes = document.querySelectorAll('.floating-shape');
            shapes.forEach((shape, i) => {
                const depth = (i + 1) * 0.25;
                anime({
                    targets: shape,
                    translateX: x * 25 * depth,
                    translateY: y * 15 * depth,
                    duration: 1500,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // ==========================================
    // Navbar anime.js Enhancements
    // ==========================================
    function initNavbarAnime() {
        // Logo hover animation (desktop only)
        if (!isTouchDevice()) {
            const logo = document.querySelector('.nav-logo');
            if (logo) {
                logo.addEventListener('mouseenter', () => {
                    anime({
                        targets: '.logo-text',
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                        duration: 800,
                        easing: 'easeOutElastic(1, 0.5)'
                    });
                });
            }

            // Nav links staggered hover ripple
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    anime({
                        targets: link.querySelector('i'),
                        rotateZ: [0, 15, -15, 0],
                        scale: [1, 1.3, 1],
                        duration: 500,
                        easing: 'easeOutElastic(1, 0.5)'
                    });
                });
            });
        }

        // Bottom nav items - tap animations (works on both)
        const bottomItems = document.querySelectorAll('.bottom-nav-item');
        bottomItems.forEach(item => {
            item.addEventListener('click', () => {
                anime({
                    targets: item.querySelector('i'),
                    translateY: [-10, 0],
                    scale: [1.5, 1],
                    rotateZ: [15, 0],
                    duration: 500,
                    easing: 'easeOutBack'
                });
            });
        });
    }

    // ==========================================
    // Back to Top Button animation
    // ==========================================
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn.querySelector('i'),
                translateY: [-4, 0],
                duration: 400,
                easing: 'easeOutBack',
                loop: 2
            });
        });
    }

    // ==========================================
    // Mobile-friendly touch animations
    // ==========================================
    function initMobileTouchEffects() {
        if (!isTouchDevice()) return;

        // Tap scale effect for cards
        const cards = document.querySelectorAll('.project-card, .product-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                anime({
                    targets: card,
                    scale: 0.97,
                    duration: 150,
                    easing: 'easeOutQuad'
                });
            }, { passive: true });

            card.addEventListener('touchend', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            }, { passive: true });
        });

        // Social links tap pulse
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                anime({
                    targets: link,
                    scale: [1, 0.9],
                    duration: 100,
                    easing: 'easeOutQuad'
                });
            }, { passive: true });

            link.addEventListener('touchend', () => {
                anime({
                    targets: link,
                    scale: [0.9, 1],
                    duration: 400,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            }, { passive: true });
        });

        // Bottom nav tap burst
        const bottomItems = document.querySelectorAll('.bottom-nav-item');
        bottomItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                anime({
                    targets: item,
                    scale: 0.92,
                    duration: 100,
                    easing: 'easeOutQuad'
                });
            }, { passive: true });

            item.addEventListener('touchend', () => {
                anime({
                    targets: item,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            }, { passive: true });
        });
    }

    // ==========================================
    // Wave divider animation
    // ==========================================
    function initWaveDividers() {
        const waves = document.querySelectorAll('.section-wave');
        if (waves.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scaleX: [0, 1],
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        waves.forEach(w => {
            w.style.opacity = '0';
            observer.observe(w);
        });
    }

    // ==========================================
    // Continuous subtle floating for profile
    // ==========================================
    function initProfileFloat() {
        anime({
            targets: '.profile-image',
            translateY: [-6, 6],
            rotateZ: [-0.5, 0.5],
            duration: 4000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true
        });
    }

    // ==========================================
    // Social link hover burst effect (Desktop)
    // ==========================================
    function initSocialBurst() {
        if (isTouchDevice()) return;

        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: link,
                    rotateY: [0, 360],
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    // ==========================================
    // Initialize Everything
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init3D();
            initBackToTop();
            initWaveDividers();
            initMobileTouchEffects();
            setTimeout(initProfileFloat, 4000);
            setTimeout(initSocialBurst, 4500);
        });
    } else {
        init3D();
        initBackToTop();
        initWaveDividers();
        initMobileTouchEffects();
        setTimeout(initProfileFloat, 4000);
        setTimeout(initSocialBurst, 4500);
    }
})();
