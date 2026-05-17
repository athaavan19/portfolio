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

// Initial state
sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "0.6s";
});

// Cycle through slideshow images
// Grab all the images inside the slideshow
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  // 1. Fade out the current image
  slides[currentSlide].classList.remove('active');
  
  // 2. Calculate the next slide index (loops back to 0 at the end)
  currentSlide = (currentSlide + 1) % slides.length;
  
  // 3. Fade in the new image
  slides[currentSlide].classList.add('active');
}

// Run the nextSlide function every 4 seconds (4000 milliseconds)
setInterval(nextSlide, 4000); 



const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
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

// Scroll-based video scaling
const video = document.getElementById("scrollVideo");

window.addEventListener("scroll", () => {

    let scrollY = window.scrollY;

    // Adjust scale speed
    let scale = 1 + scrollY * 0.0015;

    // Limit maximum size
    if (scale > 3) scale = 3;

    video.style.transform = `scale(${scale})`;

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