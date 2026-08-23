document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the floating controls into the DOM
    const controls = document.createElement('div');
    controls.className = 'floating-controls';
    controls.innerHTML = `
        <button id="theme-toggle">🌙 Theme</button>
        <button id="font-toggle">Aa Size</button>
        <button id="cursor-toggle">✨ Cursor</button>
    `;
    document.body.appendChild(controls);

    // ==========================================
    // 2. Theme Toggle Logic
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    
    // Helper function to update the button icon based on the current mode
    const updateThemeIcon = (isDark) => {
        themeBtn.innerHTML = isDark ? '☀️ Theme' : '🌙 Theme';
    };
    
    // Check localStorage on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update the icon to Sun or Moon
        updateThemeIcon(isDark);
        
        // Save the new state to localStorage
        if (isDark) {
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
    // 4. Cursor Trailer Logic (5-Second Fading Dots)
    // ==========================================
    const cursorBtn = document.getElementById('cursor-toggle');
    let trailerEnabled = false;

    // Function to spawn a dot at the mouse location
    const spawnDot = (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        
        // Automatically delete the dot from the DOM after 5 seconds (5000ms)
        setTimeout(() => {
            dot.remove();
        }, 5000);
    };

    // Helper function to handle turning the cursor on/off and saving it
    const toggleCursor = (enable) => {
        trailerEnabled = enable;
        
        if (trailerEnabled) {
            window.addEventListener('mousemove', spawnDot);
            cursorBtn.classList.add('active');
        } else {
            window.removeEventListener('mousemove', spawnDot);
            cursorBtn.classList.remove('active');
            
            // Instantly clear any trailing dots still on screen when turned off
            document.querySelectorAll('.cursor-dot').forEach(dot => dot.remove());
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
