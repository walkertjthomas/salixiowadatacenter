window.openLightbox = function(imgElement) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption-text');
    
    // Open the modal and set the image
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    
    // Check for a data-caption attribute first
    const dataCaption = imgElement.getAttribute('data-caption');
    // Alternatively, look for a sibling element with the class 'image-caption'
    const captionSibling = imgElement.nextElementSibling;

    if (dataCaption) {
        lightboxCaption.textContent = dataCaption;
        lightboxCaption.style.display = "block";
    } else if (captionSibling && captionSibling.classList.contains('image-caption')) {
        lightboxCaption.textContent = captionSibling.textContent;
        lightboxCaption.style.display = "block";
    } else {
        lightboxCaption.textContent = imgElement.alt || '';
    }
};
