let slideIndex = 0;  // Start from 0 for automatic slideshow
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n >= slides.length) { 
        slideIndex = 0;  // Reset to 0 when exceeding the number of slides
    }
    if (n < 0) { 
        slideIndex = slides.length - 1;  // Go to the last slide if negative
    }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex].style.display = "block";  
    dots[slideIndex].className += " active";
}

// Automatic slideshow
setInterval(() => {
    plusSlides(1);
}, 2000);  // Change slide every 5 seconds