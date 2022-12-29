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


textoEntrada.addEventListener("keyup", () => {
    textoEntrada.value = textoEntrada.value.toLowerCase();
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?ñÑ\s]*$/;
    if (!regex.test(textoEntrada.value)) {
        textoEntrada.value = textoEntrada.value.slice(0, -1);
    }
});


btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault();

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
            btnCopy.focus();
        } else {
            document.querySelector(".warning-info").style.color = "red";
        }
    } else {
        textoEntrada.value = "";
    }
});



function mensajeEncriptado(msj) {


    imgResult.style.display = 'none';
    content.style.display = "none";
    document.querySelector(".content-result-msj").style.display = "flex";

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
    copiarMensaje();
});

async function copiarMensaje() {
    let texto = message.value;
    navigator.clipboard.writeText(texto);

    const alertmesasage = document.querySelector("#copy-alert");

    alertmesasage.textContent = 'Copiado al portapapeles..!';
    alertmesasage.style.display = 'flex';
    setTimeout(() => {
        alertmesasage.style.display = 'none';
        textoEntrada.focus();

        if (screen.width <= 768){
            imgResult.style.display = 'none';
        }else{
            imgResult.style.display = 'block';
        }
        content.style.display = "block";
        document.querySelector(".content-result-msj").style.display = "none";
        btnCopy.style.display = "none";
    }, 2000);


}


/**
 * Desencriptar 
 */

btnDesencriptar.addEventListener("click", () => {
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
            btnCopy.focus();
        } else {
            document.querySelector(".warning-info").style.color = "red";
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
const btnAgregar= document.querySelector("#btn-modal-agregar");

validar.addEventListener("click", () => {
    try {
        const objeto = JSON.parse(textoVariables.value);
        document.querySelector(".message-modal").style.display = "flex";
        document.querySelector(".message-modal").style.background ="#0A3871";
        document.querySelector(".message-modal").textContent = "Formato Correcto";

        setTimeout(() => {
            document.querySelector(".message-modal").style.display = "none";
            btnAgregar.style.display = "block";
        },3000)


    } catch (e) {
        document.querySelector(".message-modal").style.display ="flex";
        document.querySelector(".message-modal").textContent = "Revisar el Formato";
    }
});

/**
 * Agregar Valores 
 */

btnAgregar.addEventListener("click", () => {
    try {
        const objeto = JSON.parse(textoVariables.value);
        variables=objeto;

        console.log(variables);

        document.querySelector(".message-modal").style.display = "flex";
        document.querySelector(".message-modal").style.background = "#0A3871";
        document.querySelector(".message-modal").textContent = "Valores Agregados";

        setTimeout(() => {
            document.querySelector(".message-modal").style.display = "none";
            btnAgregar.style.display = "none";
        }, 3000)


    } catch (e) {
        console.log(e);
        document.querySelector(".message-modal").style.display = "flex";
        document.querySelector(".message-modal").textContent = "Revisar el Formato";
    }
});

const btnPredeterminado=document.querySelector("#btn-predeterminado");

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