class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="top-nav">
                <div class="nav-brand">My Project</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Information</a></li>
                    <li><a href="#about">News</a></li>
                    <li><a href="#contact">Community</a></li>
                </ul>
            </nav>
        `;
    }
}

// This registers your new custom HTML tag
customElements.define('site-nav', SiteNav);
