const nubeIzq = document.querySelector(".izq-nube");
const nubeDer = document.querySelector(".der-nube");
const titleLod = document.querySelector(".titulo-loading");
const homer= document.querySelector(".homero-img");
const load = document.querySelector("#loading");
const hed = document.querySelector("header");
const inicio = document.querySelector("#Initial");
const etiquetaAudio = document.createElement("audio");
etiquetaAudio.setAttribute("src", "sound/simpson-intro.mp3");


window.addEventListener('load', () => {

    etiquetaAudio.play();

    anime({
        targets: nubeIzq,
        translateY: 12,
        duration: 1000
    });
    anime({
        targets: nubeDer,
        translateY: -25,

    });
    anime({
        targets: titleLod,
        translateY: 20
    });


    setTimeout(() => {
        anime({
            targets: nubeIzq,
            translateX: -2000,
            duration: 5000
        });

        anime({
            targets: nubeDer,
            translateX: 2000,
            duration: 5000
        });

        anime({
            targets: titleLod,
            translateY: 2000,
            duration: 5000,
            delay:600
        });

        anime({
            targets: homer,
            translateY: -2000,
            duration: 5000
        });

        setInterval(() => {
            load.style.display = "none";
            etiquetaAudio.pause();
            
            if (screen.width < 1024) {
                hed.style.display = "block";
                inicio.style.display = "grid";
            }
            else{
                hed.style.display = "flex";
                inicio.style.display = "flex";
            }
        }, 1000)

    }, 3800);
});