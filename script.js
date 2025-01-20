document.getElementById("klic").addEventListener("click", animateSineWave);

function animateSineWave() {
    const polyline = document.getElementById("path"); // The solution polyline from the SVG
    const totalLength = polyline.getTotalLength(); // Get the total length of the polyline

    polyline.style.strokeDasharray = totalLength; // Set the dash array to the polyline's total length
    polyline.style.strokeDashoffset = totalLength; // Initially hide the path by offsetting the dash

    // Create the wave-like animation
    let offset = 0;

    function animateWave() {
        offset += 2; // Increment the offset to make the polyline move

        // Set the strokeDashoffset to create the moving effect
        polyline.style.strokeDashoffset = totalLength - offset;

        if (offset < totalLength) {
            requestAnimationFrame(animateWave); // Continue the animation
        }
    }

    animateWave(); // Start the animation
}
