document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the floating controls into the DOM
    const controls = document.createElement('div');
    controls.className = 'floating-controls';
    controls.innerHTML = `
        <button id="theme-toggle">🌓 Theme</button>
        <button id="font-toggle">Aa Size</button>
        <button id="cursor-toggle">✨ Cursor</button>
    `;
    document.body.appendChild(controls);

    // 2. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // 3. Font Sizing Logic
    const fontBtn = document.getElementById('font-toggle');
    const fontSizes = ['16px', '20px', '24px'];
    let fontIndex = 0;
    
    fontBtn.addEventListener('click', () => {
        // Cycle to the next font size in the array
        fontIndex = (fontIndex + 1) % fontSizes.length;
        document.body.style.fontSize = fontSizes[fontIndex];
    });

    // 4. Cursor Trailer Logic
    const cursorBtn = document.getElementById('cursor-toggle');
    const trailer = document.createElement('div');
    trailer.className = 'cursor-trailer';
    document.body.appendChild(trailer);

    let trailerEnabled = false;

    // Function to update trailer position
    const moveTrailer = (e) => {
        trailer.style.left = e.clientX + 'px';
        trailer.style.top = e.clientY + 'px';
    };

    cursorBtn.addEventListener('click', () => {
        trailerEnabled = !trailerEnabled;
        
        if (trailerEnabled) {
            window.addEventListener('mousemove', moveTrailer);
            trailer.style.opacity = '1';
            cursorBtn.classList.add('active'); // Highlights the button
        } else {
            window.removeEventListener('mousemove', moveTrailer);
            trailer.style.opacity = '0';
            cursorBtn.classList.remove('active'); // Removes highlight
        }
    });
});
