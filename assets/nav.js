class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="top-nav" aria-label="Main Navigation">
                <a href="#home" class="nav-brand" style="text-decoration: none;">
                    Protect Salix <span class="nav-heart" aria-hidden="true">❤️</span>
                </a>
                
                <!-- Mobile Menu Toggle Button (Preserving custom SVG icon) -->
                <button class="mobile-menu-toggle" id="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <ul class="nav-links" id="nav-menu">
                    <li><a href="#home" class="active">Home</a></li>
                    <li><a href="#information">Information</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#community">Community</a></li>
                </ul>
            </nav>
        `;

        const toggle = this.querySelector('#mobile-toggle');
        const menu = this.querySelector('#nav-menu');
        const navLinks = this.querySelectorAll('.nav-links a');

        // Toggle mobile drawer
        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.setAttribute('aria-expanded', String(isActive));
        });

        // Automatically close mobile menu when an anchor link is selected
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Scrollspy: Track scroll position and highlight the current section
        const sectionElements = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-25% 0px -65% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
                    });
                }
            });
        }, observerOptions);

        sectionElements.forEach(section => observer.observe(section));
    }
}

// Register the custom element
customElements.define('site-nav', SiteNav);
