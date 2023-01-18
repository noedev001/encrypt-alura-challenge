let variables =
{
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

const textoEntrada = document.querySelector("#textoEntrada");
const btnEncriptar = document.querySelector("#btn-Encriptar");
const msjEndriptado = document.querySelector("#mesage-encript");
const imgResult = document.querySelector(".image");
const content = document.querySelector(".title-text");
const btnCopy = document.querySelector("#btn-copy");
const message = document.querySelector("#mesage-encript");
const btnDesencriptar = document.querySelector("#btn-Desencriptar");

const btnVarPre = document.querySelector("#btn-predeterminado");
const btnMod = document.querySelector("#btn-modal");
const btnGit = document.querySelector(".git");
const btnLin = document.querySelector(".lin");
const btnEliminar = document.querySelector("#btn-eliminar");
const btnClose = document.querySelector(".close");

btnGit.addEventListener("click", function () { sonidoHomero(); });
btnLin.addEventListener("click", function () { sonidoHomero(); });
btnMod.addEventListener("click", function () { sonidoHomero();  });
btnVarPre.addEventListener("click", () => { sonidoHomero(); });
btnEliminar.addEventListener("click", () => {sonidoHomero(); variables=""; });
btnClose.addEventListener("click",()=> { sonidoHomero(); });


function sonidoTextArea() {
    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "sound/ay-caramba.mp3")
    etiquetaAudio.play()
}
function sonidoHomero() {
    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "sound/homero-ouch-2.mp3")
    etiquetaAudio.play()
}
function sonidoNelson() {
    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "sound/nelson-aha.mp3")
    etiquetaAudio.play()
}

textoEntrada.addEventListener("click", () => {

    if (screen.width > 1024) {
        document.querySelector(".img-bart").style.display = "none";
        document.querySelector(".img-bart2").style.display = "flex";
        document.querySelector(".img-bart2").style.transition = "0.5s";
    }
    sonidoTextArea();
});

textoEntrada.addEventListener("blur", () => {
    if (screen.width > 1024) {
    document.querySelector(".img-bart2").style.display = "none";
    document.querySelector(".img-bart").style.display = "flex";
    }
});


textoEntrada.addEventListener("keyup", () => {
    textoEntrada.value = textoEntrada.value.toLowerCase();
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñÑ\s]*$/;
    if (!regex.test(textoEntrada.value)) {
        textoEntrada.value = textoEntrada.value.slice(0, -1);
    }
});


btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    sonidoHomero()
    if (textoEntrada.value.trim().length !== 0) {

        if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñÑ\s]*$/i.test(textoEntrada.value.trim())) {

            document.querySelector(".warning-info").style.color = "#495057";

            let textEncritado = textoEntrada.value;
            let cambio = "";

            const keys = Object.keys(variables)
            const valores = Object.values(variables)

            for (let i = 0; i < textEncritado.length; i++) {
                let band = true;

                for (let j = 0; j < Object.keys(variables).length; j++) {
                    let text = keys[j];
                    let text1 = valores[j];
                    if (textEncritado[i] == text) {
                        cambio += text1;
                        band = false;
                    }
                }
                if (band) {
                    cambio += textEncritado[i];
                    band = true;
                }
            }
            mensajeEncriptado(cambio);
            textoEntrada.value = "";
            if (screen.width > 1024) {
            document.querySelector(".img-bart").style.display = "flex";
            document.querySelector(".img-bart2").style.display = "none";
            document.querySelector(".img-bart").style.transition = "0.5s";
                document.querySelector(".content-copy-alert").style.display = "flex";
            }
            if (screen.width < 1024) {
            document.querySelector(".content-copy-alert").style.display = "block";
            }
            btnCopy.focus();
        } else {
            document.querySelector(".warning-info").style.color = "red";
            setTimeout(() => {
                sonidoNelson();
            }, 1200);
        }
    } else {
        textoEntrada.value = "";
    }
});



function mensajeEncriptado(msj) {

   
    imgResult.style.display = 'none';
    content.style.display = "none";
    if (screen.width > 1024) {
    document.querySelector(".content-result-msj").style.display = "flex";
    }else{
        document.querySelector(".content-result-msj").style.display = "block";
    }
    let strings = [
        msj
    ];
    let counter = 0;

    const options = {
        offset: 0,
        timeout: 5,
        iterations: 10,
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        resolveString: strings[counter],
        element: document.querySelector('[data-target-resolver]')
    }
    const resolver = {
        resolve: function resolve(options, callback) {
            const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
            const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

            function getRandomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            function randomCharacter(characters) {
                return characters[getRandomInteger(0, characters.length - 1)];
            };

            function doRandomiserEffect(options, callback) {
                const characters = options.characters;
                const timeout = options.timeout;
                const element = options.element;
                const partialString = options.partialString;
                let iterations = options.iterations;
                setTimeout(() => {
                    if (iterations >= 0) {
                        const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
                        if (iterations === 0) {
                            element.textContent = partialString;
                        } else {
                            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                        }
                        doRandomiserEffect(nextOptions, callback)
                    } else if (typeof callback === "function") {
                        callback();
                    }
                }, options.timeout);
            };

            function doResolverEffect(options, callback) {
                const resolveString = options.resolveString;
                const characters = options.characters;
                const offset = options.offset;
                const partialString = resolveString.substring(0, offset);
                const combinedOptions = Object.assign({}, options, { partialString: partialString });

                doRandomiserEffect(combinedOptions, () => {
                    const nextOptions = Object.assign({}, options, { offset: offset + 1 });

                    if (offset <= resolveString.length) {
                        doResolverEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                });
            };
            doResolverEffect(combinedOptions, callback);
        }
    }


    function callback() {
        setTimeout(() => {
            counter++;
            if (counter >= strings.length) {
                counter = 0;
            }
            btnCopy.style.display = "block";

        }, 1000);
    }
    resolver.resolve(options, callback);
}



btnCopy.addEventListener("click", () => {
    let texto = message.value;
    navigator.clipboard.writeText(texto);

    const alertmesasage = document.querySelector("#copy-alert");

    alertmesasage.textContent = 'Copiado al portapapeles..!';
    if(screen.width>1024){
        alertmesasage.style.display = 'flex';
    }else{
        alertmesasage.style.display = 'block';
    }
    sonidoHomero();
    setTimeout(() => {
        alertmesasage.style.display = 'none';

        if (screen.width < 1024) {
            imgResult.style.display = 'none';
        } else {
            imgResult.style.display = 'block';
        }
        content.style.display = "block";
        document.querySelector(".content-result-msj").style.display = "none";
        document.querySelector(".content-copy-alert").style.display = "none";
        btnCopy.style.display = "none";
    }, 2000);
});


/**
 * Desencriptar 
 */

btnDesencriptar.addEventListener("click", (e) => {

    e.preventDefault();
    sonidoHomero()
    if (textoEntrada.value.trim().length !== 0) {
        if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñÑ\s]*$/i.test(textoEntrada.value.trim())) {
            let mensaje = textoEntrada.value;
            const keys = Object.keys(variables)
            const valores = Object.values(variables)
            for (let i = 0; i < Object.keys(variables).length; i++) {
                let text = keys[i];
                let text1 = valores[i];
                let regex = new RegExp("(" + text1 + ")", "gi");
                mensaje = mensaje.replace(regex, text);
            }
            mensajeEncriptado(mensaje);
            textoEntrada.value = "";
            if(screen.width>1024){
                document.querySelector(".img-bart").style.display = "flex";
                document.querySelector(".img-bart2").style.display = "none";
                document.querySelector(".img-bart").style.transition = "0.5s";
                document.querySelector(".content-copy-alert").style.display = "flex";
            }

            if(screen.width<1024){
                document.querySelector(".content-copy-alert").style.display = "block";
            }
            
            btnCopy.focus();
        } else {
            document.querySelector(".warning-info").style.color = "red";
            setTimeout(() => {
                sonidoNelson();
            }, 1500);
        }
    } else {
        textoEntrada.value = "";
    }
});


/**
 * Validar Variables y llaves
 */

const validar = document.querySelector("#btn-modal-validar");
const textoVariables = document.querySelector("#variables");

const textLLave = document.querySelector("#llave");
const textValor = document.querySelector("#valor");

textLLave.addEventListener("keyup", () => {
    textLLave.value = textLLave.value.toLowerCase();
    const regex = /^[a-zA-ZñÑ\s]*$/;
    if (!regex.test(textLLave.value)) {
        textLLave.value = textLLave.value.slice(0, -1);
    }
    if (textLLave.value.length > 1) {
        textLLave.value = textLLave.value.slice(0, -1);
    }
});
textValor.addEventListener("keyup", () => {
    textValor.value = textValor.value.toLowerCase();
    const regex = /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñ\s]*$/
    if (!regex.test(textValor.value)) {
        textValor.value = textValor.value.slice(0, -1);
    }
});



validar.addEventListener("click", () => {

    let aux = "";

    textLLave.value = textLLave.value.trim();
    textValor.value = textValor.value.trim();

    sonidoHomero();

    if (textLLave.value.length > 0 && textValor.value.length > 0) {
        if (textLLave.value.length === 1) {
            if (/^[a-zñ\s]*$/i.test(textLLave.value.trim())) {
                if (/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñ\s]*$/i.test(textValor.value.trim())) {
                    try {
                        document.querySelector(".message-modal").style.display = "none";
                        if (Object.keys(variables).length>0){
                            let tranformar = JSON.stringify(variables);
                            tranformar=tranformar.substring(0, tranformar.length-1);
                            tranformar = tranformar + "," + '"' + textLLave.value + '":"' + textValor.value + '"}'
                            const objeto = JSON.parse(tranformar);
                            variables = objeto;

                            document.querySelector(".message-modal").style.display = "flex";
                            document.querySelector(".message-modal").style.background = "#0A3871";
                            document.querySelector(".message-modal").textContent = "Valores Agregados";
                            setTimeout(() => {
                                document.querySelector(".message-modal").style.display = "none";
                                textLLave.value = "";
                                textValor.value = "";
                            }, 3000)

                
                        }else{
                            aux = '{"' + textLLave.value + '":"' + textValor.value + '"}'
                            const objeto = JSON.parse(aux);
                            variables = objeto;
                       
                        }
                    } catch (e) {
                        console.log(e);
                        document.querySelector(".message-modal").style.display = "flex";
                        document.querySelector(".message-modal").textContent = "Error Fallo Algo";
                    }
                } else {
                    document.querySelector(".message-modal").style.display = "flex";
                    document.querySelector(".message-modal").textContent = "Valor de Llave n aceptado";
                }
            } else {
                document.querySelector(".message-modal").style.display = "flex";
                document.querySelector(".message-modal").textContent = "La LLave caracteres especiales";
            }
        } else {
            document.querySelector(".message-modal").style.display = "flex";
            document.querySelector(".message-modal").textContent = "La LLave solo de un Consonante";
        }
    } else {
        document.querySelector(".message-modal").style.display = "flex";
        document.querySelector(".message-modal").textContent = "Elemento Vacio";
    }

});

/**
 * Agregar Valores 
 */

const btnPredeterminado = document.querySelector("#btn-predeterminado");

btnPredeterminado.addEventListener("click", () => {
    variables =
    {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };
});



window.onscroll = function () {
    var elemento = document.querySelector('#container-menu');
    var posicionScroll = window.scrollY;

    if (posicionScroll > 20) {
        elemento.style.display = "none";
    } else {
        elemento.style.display = "block";
    }
};