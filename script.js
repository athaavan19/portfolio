// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
});

// Simple fade-in effect
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
});


// Bulletproof Navbar Toggle with Auto-Close
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Grab all the individual links inside the dropdown
    const menuItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        // 1. Open/Close when the hamburger button is clicked
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // 2. Auto-close the menu when any link is clicked
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // We use 'remove' instead of 'toggle' to ensure it absolutely closes
                navLinks.classList.remove('active'); 
            });
        });
    }
});

// Loading screen
window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 2000); // loader duration

});

// Auto-loading slideshow engine
document.addEventListener("DOMContentLoaded", () => {
    
    // Find all the 'auto-load' slideshow containers
    const autoLoaders = document.querySelectorAll('.slideshow.auto-load');

    autoLoaders.forEach(slideshow => {
        const folder = slideshow.getAttribute('data-folder');
        const extension = slideshow.getAttribute('data-ext') || 'jpg';
        
        let currentIndex = 1;
        let imagesLoaded = 0;

        // The Scanner Function: Looks for images sequentially
        function scanForImages() {
            const img = new Image();
            // Ensure this path matches your directory structure
            img.src = `img/${folder}/${currentIndex}.${extension}`;
            
            // IF FOUND: Add it to the HTML and look for the next one
            img.onload = function() {
                img.alt = `${folder} image ${currentIndex}`;
                img.classList.add('slide');
                
                // Make the very first image visible instantly
                if (currentIndex === 1) {
                    img.classList.add('active');
                }

                slideshow.appendChild(img);
                imagesLoaded++;
                currentIndex++;
                
                // Fire the scanner again for the next number
                scanForImages(); 
            };

            // IF NOT FOUND: End of folder reached. Start the animation.
            img.onerror = function() {
                // If we found at least 2 images, start the loop
                if (imagesLoaded >= 2) {
                    startSlideshowEngine(slideshow);
                }
            };
        }

        // Initialize the scanner
        scanForImages();
    });

    // The Animation Engine: Crossfades the images
    function startSlideshowEngine(container) {
        let activeIndex = 0;

        setInterval(() => {
            const slides = container.querySelectorAll('.slide');
            if (slides.length === 0) return;

            // Fade out current image
            slides[activeIndex].classList.remove('active');
            
            // Calculate next index
            activeIndex = (activeIndex + 1) % slides.length;
            
            // Fade in new image
            slides[activeIndex].classList.add('active');
        }, 3000); 
    }
});