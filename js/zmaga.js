function igraj(){
    window.location.href = "igra.html";
}
function domov(){
    window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const povprecje = urlParams.get('povprecje');
const tocke = urlParams.get('tocke');

document.getElementById("tocke").textContent = tocke;

document.getElementById("avgTxPw").textContent = povprecje + " w";