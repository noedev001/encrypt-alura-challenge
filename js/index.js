window.addEventListener('load',()=>{
    const textoEntrada = document.querySelector("#textoEntrada");
    textoEntrada.focus();

});


window.onbeforeunload = function (e) {
    const textoEntrada = document.querySelector("#textoEntrada");
    textoEntrada.focus();
    textoEntrada.value="";
    return "You have some unsaved changes";
};


