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
    
    const updateThemeIcon = (isDark) => {
        themeBtn.innerHTML = isDark ? '☀️ Theme' : '🌙 Theme';
    };
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        updateThemeIcon(isDark);
        
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

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize && fontSizes.includes(savedFontSize)) {
        fontIndex = fontSizes.indexOf(savedFontSize);
        document.body.style.fontSize = fontSizes[fontIndex];
    }
    
    fontBtn.addEventListener('click', () => {
        fontIndex = (fontIndex + 1) % fontSizes.length;
        document.body.style.fontSize = fontSizes[fontIndex];
        localStorage.setItem('fontSize', fontSizes[fontIndex]);
    });

    // ==========================================
    // 4. Cursor Trailer Logic (5-Second Fading Dots)
    // ==========================================
    const cursorBtn = document.getElementById('cursor-toggle');
    let trailerEnabled = false;
    let lastSpawnTime = 0;

    const spawnDot = (e) => {
        const now = Date.now();
        // Throttle: Only spawn a dot every 40ms to prevent browser lag
        if (now - lastSpawnTime < 40) return;
        lastSpawnTime = now;

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        
        // Automatically delete the dot from the DOM after 5 seconds
        setTimeout(() => {
            dot.remove();
        }, 5000);
    };

    const toggleCursor = (enable) => {
        trailerEnabled = enable;
        
        if (trailerEnabled) {
            window.addEventListener('mousemove', spawnDot);
            cursorBtn.classList.add('active');
        } else {
            window.removeEventListener('mousemove', spawnDot);
            cursorBtn.classList.remove('active');
            
            // Clear any lingering dots immediately when turned off
            document.querySelectorAll('.cursor-dot').forEach(dot => dot.remove());
        }
        
        localStorage.setItem('cursorEnabled', trailerEnabled);
    };

    if (localStorage.getItem('cursorEnabled') === 'true') {
        toggleCursor(true);
    }

    cursorBtn.addEventListener('click', () => {
        toggleCursor(!trailerEnabled);
    });
});
