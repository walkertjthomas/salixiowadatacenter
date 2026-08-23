class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="top-nav">
                <div class="nav-brand">Protect Salix <span class="nav-heart" aria-hidden="true">❤️</span></div>
                
                <!-- Mobile Menu Toggle Button -->
                <button class="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="information.html">Information</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="community.html">Community</a></li>
                </ul>
            </nav>
        `;

        // Mobile menu toggle logic
        const toggle = this.querySelector('.mobile-menu-toggle');
        const links = this.querySelector('.nav-links');
        
        toggle.addEventListener('click', () => {
            const isActive = links.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive);
        });
    }
}

// Registers your new custom HTML tag
customElements.define('site-nav', SiteNav);
