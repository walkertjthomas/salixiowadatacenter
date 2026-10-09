document.addEventListener('SectionsLoaded', () => {
    const newsContainer = document.getElementById('live-news-feed');
    const loadingText = document.getElementById('news-loading');
    const searchInput = document.getElementById('news-search');
    const searchBtn = document.getElementById('search-btn');

    // Failsafe in case the news section hasn't loaded properly
    if (!newsContainer) return; 

    function renderCards(articles) {
        newsContainer.innerHTML = '';
        articles.slice(0, 4).forEach(article => {
            const dateStr = article.pubDate.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });

            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderTop = '4px solid var(--accent)';
            card.innerHTML = `
                <span class="news-date">${dateStr} &bull; ${article.source}</span>
                <h3 style="margin-top: 0; font-size: 1.15rem; line-height: 1.4;">${article.title}</h3>
                <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-link" aria-label="Read full article: ${article.title.replace(/"/g, '&quot;')}">Read Full Article &rarr;</a>
            `;
            newsContainer.appendChild(card);
        });
    }

    async function fetchLiveNews(filterTerm = '') {
        newsContainer.innerHTML = '';
        loadingText.style.display = 'block';
        loadingText.textContent = 'Fetching the latest coverage from Bing News...';
        newsContainer.appendChild(loadingText);

        let query = 'Salix Iowa data center';
        const term = filterTerm.trim();
        if (term !== '') {
            query += ` ${term}`;
        }

        const bingWebUrl = `https://www.bing.com/news/search?q=${encodeURIComponent(query)}`;
        const bingRssUrl = `${bingWebUrl}&format=rss`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(bingRssUrl)}&_t=${Date.now()}`;

        try {
            const res = await fetch(proxyUrl, { cache: "no-store" });
            if (!res.ok) throw new Error('Proxy network error');
            
            const data = await res.json();
            const xmlString = data.contents;
            if (!xmlString) throw new Error('Empty payload returned from proxy');

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) throw new Error('XML parsing failed');

            const items = xmlDoc.getElementsByTagName('item');
            let articles = Array.from(items).map(item => ({
                title: item.getElementsByTagName('title')[0]?.textContent || 'Untitled Article',
                link: item.getElementsByTagName('link')[0]?.textContent || '#',
                pubDate: new Date(item.getElementsByTagName('pubDate')[0]?.textContent || 0),
                source: 'Bing News'
            })).filter(art => art.pubDate.getTime() > 0);

            // Sort newest first
            articles.sort((a, b) => b.pubDate - a.pubDate);

            // De-duplicate by normalized title
            const uniqueArticles = [];
            const seenTitles = new Set();
            for (const art of articles) {
                const normalized = art.title.trim().toLowerCase();
                if (!seenTitles.has(normalized)) {
                    seenTitles.add(normalized);
                    uniqueArticles.push(art);
                }
            }

            if (uniqueArticles.length > 0) {
                renderCards(uniqueArticles);
            } else {
                newsContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px;">
                        <p class="loading-text" style="margin-bottom: 0.75rem;">No live articles found matching "<strong>${filterTerm}</strong>".</p>
                        <a href="${bingWebUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-weight: 600; text-decoration: underline;">Open live Bing News search directly &rarr;</a>
                    </div>
                `;
            }

        } catch (err) {
            console.error('Bing fetch error:', err);
            newsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px;">
                    <p class="loading-text" style="margin-bottom: 0.75rem;">Live news preview is temporarily unreachable.</p>
                    <a href="${bingWebUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-weight: 600; text-decoration: underline;">View live Salix data center coverage on Bing News &rarr;</a>
                </div>
            `;
        }
    }

    fetchLiveNews();

    searchBtn.addEventListener('click', () => fetchLiveNews(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchLiveNews(searchInput.value);
        }
    });
});
