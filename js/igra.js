var pot = document.getElementById("path");
var qrm = document.getElementById("qrm");
var sos_klic = document.getElementById("klic")
var slider = document.getElementById('power');
var pow_tekst = document.getElementById('power-val');

slider.value = 0;

slider.addEventListener('input', function() {
    pow_tekst.textContent = slider.value + " W";
});

pot.setAttribute("stroke","none");
qrm.setAttribute("stroke","none");

sos_klic.addEventListener("click", narisiSOS);
sos_klic.addEventListener("click", narisiQRM);
sos_klic.addEventListener("click", prekini);

function prekini(){
    sos_klic.disabled = true
    sos_klic.style.cursor = "not-allowed";

    slider.disabled = true;
    slider.style.cursor = "not-allowed";
}

function narisiSOS() {
    var totalLength = pot.getTotalLength(); 

    pot.setAttribute("stroke","red");

    pot.style.strokeDasharray = totalLength; 
    pot.style.strokeDashoffset = totalLength; 

    let offset = 0;

    function animiraj() {
        offset += parseInt(slider.value);

        pot.style.strokeDashoffset = totalLength - offset;

        if (offset < totalLength) {
            requestAnimationFrame(animiraj); 
        }
        else {
            konec("sos");
        }
    }

    animiraj();
}


function narisiQRM() {
    var totalLength = qrm.getTotalLength(); 
    let QRM_pow = Math.floor(Math.random() * 5) + 1

    qrm.setAttribute("stroke","black"); //nastavi nazaj na none black je za debug

    qrm.style.strokeDasharray = totalLength; 
    qrm.style.strokeDashoffset = totalLength; 

    let offset = 0;

    function animiraj() {
        offset += QRM_pow;

        qrm.style.strokeDashoffset = totalLength - offset;

        if (offset < totalLength) {
            requestAnimationFrame(animiraj); 
        }
        else {
            konec("qrm");
        }
    }

    animiraj();
}

function konec(status) {
    if (status === "sos") {
        alert("resili ste se!");
    } else {
        alert("poguba!");
    }

    sos_klic.disabled = false;
    sos_klic.style.cursor = "pointer";

    slider.disabled = false;
    slider.style.cursor = "pointer";
}