document.getElementById("path").setAttribute("stroke","none");
document.getElementById("klic").addEventListener("click", animirajResitev);

function animirajResitev() {
    const polyline = document.getElementById("path"); 
    const totalLength = polyline.getTotalLength(); 
    polyline.setAttribute("stroke","red");

    polyline.style.strokeDasharray = totalLength; 
    polyline.style.strokeDashoffset = totalLength; 

    let offset = 0;

    function animiraj() {
        offset += 2; 

        polyline.style.strokeDashoffset = totalLength - offset;

        if (offset < totalLength) {
            requestAnimationFrame(animiraj); 
        }
    }

    animiraj();
}
