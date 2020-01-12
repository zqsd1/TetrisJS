requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../main'
    }
});


// Start the main app logic.
requirejs(['utils', 'cubeClass', 'piecesClass', 'tetris'],
    function (cubeClass, tetris) {

        class obs extends Observer {
            constructor() {
                super();
            }
            notify(param, tableau) {
                if (param == "modif") {
                    dessin(tableau, document.getElementById("canvasTetris"), config.nbCubeX, config.nbCubeY)
                }
                else if (param == "fin") {
                    gameOver();
                }
                else if (param == "nvlPiece") {
                    dessin(tableau, document.getElementById("pieceSuivante"), 4, 4);
                }
                else if ((param == "ligne")) {
                    document.getElementById("nbLigne").innerHTML = "ligne supprimé : " + tetris.compteurLignesSuppr;
                }
            }

        }

        var nbCubeX = config.nbCubeX;
        var nbCubeY = config.nbCubeY;
        var tempo = config.temporisation; //le temps entre chaque chute de piece

        /**
         * dessine les cube d'un tableau dans un canvas
         * @param {array} tableau tab de cub
         * @param {*} canvas le canvas sur lequel il faut dessiner
         * @param {number} cubex nb case en x
         * @param {number} cubey nb case en y
         */
        function dessin(tableau, canvas, cubex, cubey) {


            let canvasLargeur = canvas.getAttribute("width");
            let canvasHauteur = canvas.getAttribute("height");
            let largeurCube = canvasLargeur / cubex;
            let hauteurCube = canvasHauteur / cubey;

            if (canvas.getContext) { 
                try {
                let dessinateur = canvas.getContext("2d");
               
                    //efface le canvas
                    dessinateur.clearRect(0, 0, canvasLargeur, canvasHauteur);

                    tableau.forEach(cube => {
                        dessinateur.fillStyle = cube.couleur;
                        dessinateur.fillRect(cube.x * largeurCube, cube.y * hauteurCube, largeurCube, hauteurCube);



                    });
                } catch (error) {
                    console.log(error);
                }
            }

        }

        var tetris = new Tetris(nbCubeX, nbCubeY);


        //design pattern observer => event
        var o = new obs();
        tetris.subscribeObserver(o);

        //pour agir sur les action utilisateur
        document.onkeydown = inputUser;

        //lance la partie
        var btnStart = document.getElementById("btnStart");
        btnStart.onclick = demarrer;



        var interval;
        function demarrer(params) {
            if (!tetris.isPlay) {
                tetris.debuterPartie();
                interval = window.setInterval(game, tempo);

            }


        }
        function game(params) {
            tetris.deplacerPiece("ArrowDown");
        }


        function gameOver(params) {
            clearInterval(interval);
            alert("game over");
        }

        /**
         * 
         * @param {*} params  
         */
        function inputUser(params) {

            if (params.key == "ArrowLeft" || params.key == "ArrowRight" || params.key == "ArrowUp" || params.key == "ArrowDown") {
                params.preventDefault();// pour que la page bouge pas
                tetris.deplacerPiece(params.key);
            }

        }  

    });