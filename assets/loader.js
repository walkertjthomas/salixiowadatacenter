document.addEventListener("DOMContentLoaded", async () => {
    const sections = document.querySelectorAll("section[data-src]");
    
    const loadPromises = Array.from(sections).map(async (section) => {
        try {
            // Fetch the root file (e.g., news.html)
            const res = await fetch(section.getAttribute("data-src"));
            if (res.ok) {
                const htmlString = await res.text();
                
                // Parse the fetched page
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
                
                // Extract ONLY the inner content of the <main> tag
                const mainContent = doc.querySelector("main.content");
                
                if (mainContent) {
                    section.innerHTML = mainContent.innerHTML;
                }
            }
        } catch (err) {
            console.error(`Failed to load ${section.id}:`, err);
        }
    });

    await Promise.all(loadPromises);

    // Fire the event so your news.js script knows it's time to fetch Bing News
    document.dispatchEvent(new Event("SectionsLoaded"));
});
