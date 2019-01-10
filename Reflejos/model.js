var colores = ["#EC7063", "#A569BD", "#5DADE2", "#45B39D", "#F5B041", "#CACFD2"];
var intervalos = [700, 630, 570, 550, 470, 420];
var numeroCasillas = 6;

class Casilla {

    constructor(id) {
        this.id = id;
    }

    cambiaColor() {
        this.colorActual = this.obtenColorAleatorio();
    }

    dameColorActual() {
        return this.colorActual;
    }

    dameId() {
        return this.id;
    }

    obtenColorAleatorio() {
        let color;
        let parar = false;

        while (!parar) {
            color = colores[Math.floor((Math.random() * (numeroCasillas - 1)))];

            if (color !== this.colorActual)
                parar = true;
        }

        return color;
    }

}

class ReflejosGame {

    constructor() {
        this.casillas = [];
        this.etapaJuego = 0;
        this.colorObjetivo = null;
        this.juegoTerminado = false;

        for (let i = 0; i < numeroCasillas; i++) {
            let casilla = new Casilla(i);

            this.casillas.push(casilla);
        }

    }

    comenzarJuego() {
        this.siguienteEtapa();
    }

    siguienteEtapa() {
        //comprobamos si ha acabado el juego
        if (this.etapaJuego >= numeroCasillas) {
            this.terminarJuego();
            return;
        }

        //Paramos el intervalo actual
        clearInterval(this.intervaloCambioColorActual);

        //obtenemos la casilla actual
        this.casillaActual = this.obtenCasillaPorEtapa(this.etapaJuego);
        //obtenemos el intervalo actual
        let intervaloActual = this.obtenIntervaloPorEtapa(this.etapaJuego);

        //comenzamos a cambiar de color a la casilla
        this.casillaActual.cambiaColor();
        this.reproduceSonido();
        this.pintaJuego();
        this.intervaloCambioColorActual = setInterval(() => {

            this.casillaActual.cambiaColor();
            this.reproduceSonido();
            this.pintaJuego();

        }, intervaloActual);
    }

    reproduceSonido() {
        var audio = document.getElementById("audio");
        if (audio !== null) {
            audio.currentTime = 0;
            audio.pause();

            audio.play();
        }
    }

    botonPulsado() {
        if (this.juegoTerminado) {
            alert("El juego ha acabado");
            return;
        }

        let colorActual = this.obtenColorActual();

        //si es la primera etapa acertara siempre asi que solo guardamos el color actual como objetivo
        if (this.etapaJuego === 0) {
            this.colorObjetivo = this.obtenColorActual();
            this.etapaJuego++;
            this.siguienteEtapa();
            return;
        }

        //Si ha acertado
        if (colorActual === this.colorObjetivo) {
            this.etapaJuego++;
            this.siguienteEtapa();

        } else {
            this.terminarJuego();
        }


    }

    terminarJuego() {
        //Paramos el intervalo actual
        clearInterval(this.intervaloCambioColorActual);
        alert("Juego finalizado");
    }

    obtenColorActual() {
        return this.casillaActual.dameColorActual();
    }

    obtenCasillaPorEtapa(etapa) {
        return this.casillas[etapa];
    }

    obtenIntervaloPorEtapa(etapa) {
        return intervalos[etapa];
    }

    pintaJuego() {
        this.casillas.forEach((casilla) => {
            let idCasilla = casilla.dameId();

            document.getElementById(idCasilla).style.backgroundColor = casilla.dameColorActual();
        });
    }


}

