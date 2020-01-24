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
requirejs(['observer','utils', 'cubeClass', 'piecesClass', 'tetris'],
    function (cubeClass, tetris) {

        class obs extends Observer {
            constructor() {
                super();
            }
            notify(param, tableau) {
                if (param == "modif") {
                    dessiner(tableau, document.getElementById("canvasTetris"), config.nbCubeX, config.nbCubeY)
                }
                else if (param == "fin") {
                    gameOver();
                }
                else if (param == "nvlPiece") {
                    dessiner(tableau, document.getElementById("pieceSuivante"), 4, 4);
                }
                else if ((param == "ligne")) {
                    document.getElementById("nbLigne").innerHTML = "ligne supprimé : " + tetris.compteurLignesSuppr;
                }
            }

        }

        var nbCubeX = config.nbCubeX;
        var nbCubeY = config.nbCubeY;
        var tempo = config.temporisation; //le temps entre chaque chute de piece
        var isPlay = false; 
        var interval;

        var tetris = new Tetris(nbCubeX, nbCubeY);

        //design pattern observer => event
        var o = new obs();
        tetris.subscribeObserver(o);

        //pour agir sur les action utilisateur
        document.onkeydown = inputUser;

        //lance la partie
        var btnStart = document.getElementById("btnStart");
        btnStart.onclick = demarrer;
        // btnStart.addEventListener('click',demarrer);


       


        function demarrer() {
            if (!isPlay) {
                tetris.debuterPartie();
                isPlay = true;
                interval = window.setInterval(game, tempo);
            }

        }
        function game(params) {
            tetris.deplacerPiece("ArrowDown");
        }


        function gameOver(params) {
            clearInterval(interval);
             isPlay = false;
            alert("game over");
        }

        /**
         * 
         * @param {*} params  
         */
        function inputUser(params) {

            if ((params.key == "ArrowLeft" || params.key == "ArrowRight" || params.key == "ArrowUp" || params.key == "ArrowDown") && isPlay) {
                params.preventDefault();// pour que la page bouge pas
                tetris.deplacerPiece(params.key);
            }

        }


        /**
     * dessine les cube d'un tableau dans un canvas
     * @param {array} tableau tab de cub
     * @param {*} canvas le canvas sur lequel il faut dessiner
     * @param {number} cubex nb case en x
     * @param {number} cubey nb case en y
     */
        function dessiner(tableau, canvas, cubex, cubey) {


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


    });