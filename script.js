/**
 * Portfolio Website JavaScript
 * Handles navigation, scroll animations, and interactive features
 */

// ==================== Mobile Menu Toggle ====================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between bars and times (X)
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ==================== Navbar Scroll Effect ====================
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });
}

// ==================== Scroll Reveal Animation ====================
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
window.addEventListener('load', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ==================== Smooth Scroll for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Active Navigation Link Highlight ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-primary');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-primary');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==================== Typing Animation for Hero (Optional Enhancement) ====================
// Uncomment to enable typing effect on the subtitle
/*
const heroSubtitle = document.querySelector('.home__subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after page load
    setTimeout(typeWriter, 500);
}
*/

// ==================== Parallax Effect for Background Orbs (Optional) ====================
const orbs = document.querySelectorAll('.animate-pulse');

if (orbs.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== Console Welcome Message ====================
console.log('%c👋 Welcome to Agus Mahari\'s Portfolio!', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
console.log('%c💼 Data Engineer | Cloud & Data Warehousing Specialist', 'color: #10B981; font-size: 14px;');
console.log('%c🚀 Built with HTML5, Tailwind CSS, and Vanilla JavaScript', 'color: #6B7280; font-size: 12px;');

// ==================== Performance Optimization ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced version for scroll-heavy operations
const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedHighlight = debounce(highlightNavLink, 10);

window.removeEventListener('scroll', revealOnScroll);
window.removeEventListener('scroll', highlightNavLink);
window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedHighlight);

// ==================== Initialize on DOM Ready ====================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial reveal check
    revealOnScroll();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    console.log('%c✅ Portfolio initialized successfully!', 'color: #10B981; font-size: 14px;');
});

// ==================== Error Handling ====================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
    // In production, you might want to log this to a monitoring service
});
