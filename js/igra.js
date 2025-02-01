var pot = document.getElementById("path");
var qrm = document.getElementById("qrm");
var sos_klic = document.getElementById("klic")
var slider = document.getElementById('power');
var pow_tekst = document.getElementById('power-val');

slider.value = 0;
let powerValues = []; 

slider.addEventListener('input', function() {
    pow_tekst.textContent = slider.value + " W";
});

pot.setAttribute("stroke","none");
qrm.setAttribute("stroke","none");


sos_klic.addEventListener("click", startTransmission);


function zapisiMoč() {
    powerValues.push(parseInt(slider.value));
}

function sosAvdio() {
    var audio = document.getElementById("avdio");
    audio.play();

}
function avdioStop() {
    var audio = document.getElementById("avdio");
    audio.pause();  
    audio.currentTime = 0;  
}

function startTransmission() {
    sos_klic.disabled = true;
    sos_klic.style.cursor = "not-allowed";
    powerValues = [];

    zapisiMoč(); 
    narisiSOS();
    sosAvdio();
    setTimeout(() => {
        narisiQRM();
    }, 2000);
}

function narisiSOS() {
    var totalLength = pot.getTotalLength(); 

    pot.setAttribute("stroke","red");

    pot.style.strokeDasharray = totalLength; 
    pot.style.strokeDashoffset = totalLength; 

    let offset = 0;

    function animiraj() {
        offset += parseInt(slider.value);
        zapisiMoč(); 

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

    qrm.setAttribute("stroke","black");


    qrm.style.strokeDasharray = totalLength; 
    qrm.style.strokeDashoffset = totalLength; 

    let offset = 0;

    function animiraj() {
        let QRM_pow = Math.floor(Math.random() * 5) + 1;
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
    avdioStop();
    let povprecje = izracunajPovprecje(powerValues); 
    let tocke = izracunajTocke(povprecje); 

    povprecje = povprecje.toFixed(2);

    if (status === "sos") {
        window.location.href = "zmaga.html?povprecje=" + povprecje + "&tocke=" + tocke;
    } else {
        window.location.href = "zguba.html?povprecje=" + povprecje
    }

    sos_klic.disabled = false;
    sos_klic.style.cursor = "pointer";
}

function izracunajPovprecje(values) {
    let sum = values.reduce((a, b) => a + b, 0); 
    return sum / values.length; 
}

function izracunajTocke(povprecje) {
    let tocke;

    if (povprecje <= 1) {
        tocke = 100; 
    } else if (povprecje <= 2) {
        tocke = 80;
    } else if (povprecje <= 3) {
        tocke = 50;
    } else if (povprecje <= 4) {
        tocke = 30;
    } else {
        tocke = 10; 
    }

    return tocke;
}