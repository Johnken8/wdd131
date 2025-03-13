// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

// Function to update wind chill display
function updateWindChill() {
    const temperature = 28; // Temperature in Celsius
    const windSpeed = 10; // Wind speed in km/h
    const windChillElement = document.getElementById('windchill');
    
    // Check if wind chill conditions are met
    if (temperature <= 10 && windSpeed > 4.8) {
        // Calculate wind chill and display it
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)}°C`;
    } else {
        // If conditions not met, display N/A
        windChillElement.textContent = "N/A";
    }
}

// Update year in footer
function updateYear() {
    const currentYearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Update last modified date in footer
function updateLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;
}

// Run all update functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateWindChill();
    updateYear();
    updateLastModified();
});