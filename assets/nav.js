class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="top-nav">
                <div class="nav-brand">Protect Salix</div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="information.html">Information</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="community.html">Community</a></li>
                </ul>
            </nav>
        `;
    }
}

// This registers your new custom HTML tag
customElements.define('site-nav', SiteNav);
