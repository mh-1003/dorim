/**
 * Portfolio Website Main JavaScript
 * Author: [Your Name]
 * Description: JS functionality for responsive portfolio website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const backToTop = document.querySelector('.back-to-top');
    const contactForm = document.querySelector('.contact-form');
    
    // Create overlay element for mobile navigation
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    /**
     * Close mobile navigation menu
     */
    function closeMobileNav() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    /**
     * Implement scrollspy functionality to highlight active navigation link
     */
    function scrollSpy() {
        const scrollPosition = window.scrollY;
        
        // Add shadow to header when scrolled
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
            backToTop.style.display = 'block';
        } else {
            header.classList.remove('scrolled');
            backToTop.style.display = 'none';
        }
        
        // Update active navigation link based on current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    /**
     * Smooth scroll to section when clicking navigation links
     * @param {Event} e - The click event
     */
    function smoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            const headerHeight = header.offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight + 20,
                behavior: 'smooth'
            });
            
            // Close mobile navigation if open
            if (navLinks.classList.contains('active')) {
                closeMobileNav();
            }
        }
    }
    
    /**
     * Handle form submission
     * @param {Event} e - The submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        alert(`Thank you for your message, ${name}! I will get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
    }
    
    /**
     * Initialize animations for elements as they enter the viewport
     */
    function initAnimations() {
        // Add animation classes to elements when they enter the viewport
        const animateElements = document.querySelectorAll('.project-card, .contact-item, .skill-tag');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    
    links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    window.addEventListener('scroll', scrollSpy);
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize scrollspy on page load
    scrollSpy();
    
    // Initialize animations
    if ('IntersectionObserver' in window) {
        initAnimations();
    }
    
    // Add CSS animations for project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
