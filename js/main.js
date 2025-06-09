document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

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