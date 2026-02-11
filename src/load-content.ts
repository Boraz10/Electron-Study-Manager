// Function for loading html files into content
// 11/02/2026

async function loadHtmlFile(url : string, elementId : string, pageTitle : string) {
    let content = document.getElementById(elementId) as HTMLElement;
    let titleText = document.getElementById('titlebarText') as HTMLDivElement;

    if (titleText) {
        titleText.innerHTML = `<p>${pageTitle}</p>`;
    }
    else {
        alert("Error: Could not find title text!");
    }

    document.title = pageTitle;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();

        if (content) content.innerHTML = htmlContent;
    } catch (error) {
        console.error("Could not load the HTML file:", error);
        if (content) content.innerHTML = "<p>Error loading content.</p>";
    }
}