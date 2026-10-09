document.addEventListener("DOMContentLoaded", async () => {
    const sections = document.querySelectorAll("section[data-src]");
    
    // Fetch all HTML partials concurrently for maximum speed
    const loadPromises = Array.from(sections).map(async (section) => {
        try {
            const res = await fetch(section.getAttribute("data-src"));
            if (res.ok) {
                section.innerHTML = await res.text();
            }
        } catch (err) {
            console.error(`Failed to load ${section.id}:`, err);
        }
    });

    await Promise.all(loadPromises);

    // Fire a custom event letting our modular scripts know the DOM is fully populated
    document.dispatchEvent(new Event("SectionsLoaded"));
});
