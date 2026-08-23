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

    // ==========================================
    // 2. Theme Toggle Logic
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    
    // Check localStorage on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save the new state to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // 3. Font Sizing Logic
    // ==========================================
    const fontBtn = document.getElementById('font-toggle');
    const fontSizes = ['16px', '20px', '24px'];
    let fontIndex = 0;

    // Check localStorage on load
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize && fontSizes.includes(savedFontSize)) {
        fontIndex = fontSizes.indexOf(savedFontSize);
        document.body.style.fontSize = fontSizes[fontIndex];
    }
    
    fontBtn.addEventListener('click', () => {
        fontIndex = (fontIndex + 1) % fontSizes.length;
        document.body.style.fontSize = fontSizes[fontIndex];
        
        // Save the new font size to localStorage
        localStorage.setItem('fontSize', fontSizes[fontIndex]);
    });

    // ==========================================
    // 4. Cursor Trailer Logic
    // ==========================================
    const cursorBtn = document.getElementById('cursor-toggle');
    const trailer = document.createElement('div');
    trailer.className = 'cursor-trailer';
    document.body.appendChild(trailer);

    let trailerEnabled = false;

    const moveTrailer = (e) => {
        trailer.style.left = e.clientX + 'px';
        trailer.style.top = e.clientY + 'px';
    };

    // Helper function to handle turning the cursor on/off and saving it
    const toggleCursor = (enable) => {
        trailerEnabled = enable;
        
        if (trailerEnabled) {
            window.addEventListener('mousemove', moveTrailer);
            trailer.style.opacity = '1';
            cursorBtn.classList.add('active');
        } else {
            window.removeEventListener('mousemove', moveTrailer);
            trailer.style.opacity = '0';
            cursorBtn.classList.remove('active');
        }
        
        // Save the new cursor state to localStorage
        localStorage.setItem('cursorEnabled', trailerEnabled);
    };

    // Check localStorage on load
    if (localStorage.getItem('cursorEnabled') === 'true') {
        toggleCursor(true);
    }

    cursorBtn.addEventListener('click', () => {
        toggleCursor(!trailerEnabled);
    });
});
