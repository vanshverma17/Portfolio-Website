// Hide loader when page is loaded
const loader = document.querySelector('.loader');
if (loader) {
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    } else {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Back to top button and header scroll effect
    const backToTopButton = document.querySelector('.back-to-top');
    const header = document.querySelector('header');
    
    if (backToTopButton || header) {
        window.addEventListener('scroll', () => {
            // Back to top button visibility
            if (backToTopButton) {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }
            
            // Header scroll effect
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }
    
    // Initialize Typed.js
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new Typed(typedElement, {
            strings: ['Frontend Developer', 'UI/UX Designer', 'Web Developer'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Animate skill progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    
    if (progressBars.length) {
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isInView && !bar.classList.contains('animated')) {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = percentage + '%';
                    bar.classList.add('animated');
                }
            });
        };
        
        // Initial check
        animateProgressBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateProgressBars);
    }

    // Initialize scroll progress
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Function to toggle theme
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode);
        
        // Update CSS variables
        if (isDarkMode) {
            document.documentElement.style.setProperty('--background-color', '#0f172a');
            document.documentElement.style.setProperty('--text-color', '#e2e8f0');
            document.documentElement.style.setProperty('--card-bg', '#1e293b');
        } else {
            document.documentElement.style.setProperty('--background-color', '#f8fafc');
            document.documentElement.style.setProperty('--text-color', '#1e293b');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
        }
    }

    // Add click event listener
    themeToggle.addEventListener('change', toggleTheme);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
        toggleTheme(); // Apply the dark theme styles
    }
});