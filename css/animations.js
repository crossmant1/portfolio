// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.experience-item, .skill-card, .project-card, .philosophy-card, .tool-category, .contact-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            setActiveNav();
        });
    });

    // Parallax effect for hero shapes
    const heroShapes = document.querySelectorAll('.visual-shape');
    if (heroShapes.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                shape.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
            });
        });
    }

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });

    // Smooth reveal for page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add subtle cursor trail effect
    const createCursorTrail = () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);

        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            const dx = mouseX - trailX;
            const dy = mouseY - trailY;

            trailX += dx * 0.1;
            trailY += dy * 0.1;

            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    };

    // Uncomment to enable cursor trail
    // createCursorTrail();

    // Add loading animation complete
    setTimeout(() => {
        document.querySelectorAll('.hero-text, .hero-visual').forEach(el => {
            el.style.opacity = '1';
        });
    }, 200);
});

// Add custom cursor for interactive elements
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('a, button, .project-card, .skill-card')) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
});

// Prevent animation replay on resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reset animations if needed
    }, 250);
});