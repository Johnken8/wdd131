// getdates.js - Dynamically display dates for WDD 131 home page
document.addEventListener("DOMContentLoaded", function() {
    // Set current year for copyright
    const currentYearElement = document.getElementById("currentyear");
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});