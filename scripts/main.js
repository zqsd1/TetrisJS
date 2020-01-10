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
            notify(param) {
                if (param == "modif") {

                    dessiner()
                }
                else if (param == "fin") {
                    gameOver();
                }
                else if (param == "nvlPiece") {
                    dessiner();
                    dessinerSuivant();
                }
            }

        }

        var nbCubeX = 10;
        var nbCubeY = 20;
        var tempo = 500;
        var canvasTetris = document.getElementById("canvasTetris");
        var canvasLargeur = canvasTetris.getAttribute("width");
        var canvasHauteur = canvasTetris.getAttribute("height");
        var largeurCube = canvasLargeur / nbCubeX;
        var hauteurCube = canvasHauteur / nbCubeY;


        var canvasSuivant = document.getElementById("pieceSuivante");
        var suivantLargeur = canvasSuivant.getAttribute("width");
        var suivantHauteur = canvasSuivant.getAttribute("height");
        var cubeSuivantL = suivantLargeur / 4;
        var cubeSuivantH = suivantHauteur / 4;


        var tetris = new Tetris(nbCubeX, nbCubeY);

        //event creer dans Tetris qui est trigger a chaque fois que le tab est modifié
        //FIXME event
        //document.addEventListener("modif", dessiner);
        var o = new obs();
        tetris.subscribeObserver(o);

        //document.addEventListener("fin", gameOver);


        //pour agir sur les action utilisateur
        document.onkeydown = inputUser;

        //lance la partie
        var btnStart = document.getElementById("btnStart");
        btnStart.onclick = demarrer;

        //le temps entre chaque chute de piece

        var interval;
        function demarrer(params) {
            if (!tetris.isPlay) {
                tetris.debuterPartie();
                interval = window.setInterval(game, tempo);
                //FIXME window.setInterval(tetris.deplacerPiece, tempo, "bas");
            }


        }
        function game(params) {
            tetris.deplacerPiece("ArrowDown");
            //soit use event soit appel dessiner ici pour actualiser tetris
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


        /**
         * 
         * @param {Array} params 
         * la fonction qui fait le dessin dans le canvas
         */
        function dessiner(tableau) {

            if (canvasTetris.getContext) {
                let dessinateur = canvasTetris.getContext("2d");

                //efface le canvas
                dessinateur.clearRect(0, 0, canvasLargeur, canvasHauteur);

                tetris.listeCubes.forEach(cube => {

                    try {
                        dessinateur.fillStyle = cube.couleur;
                        dessinateur.fillRect(cube.x * largeurCube, cube.y * hauteurCube, largeurCube, hauteurCube);

                    } catch (error) {
                        console.log(error);
                    }

                });
            }
        }


        function dessinerSuivant(tableau) {

            if (canvasSuivant.getContext) {
                let dessinateur = canvasSuivant.getContext("2d");

                //efface le canvas
                dessinateur.clearRect(0, 0, suivantLargeur, suivantHauteur);

                if (tetris.pieceSuivante != null) {


                    tetris.pieceSuivante.cubes.forEach(cube => {

                        try {
                            dessinateur.fillStyle = cube.couleur;
                            dessinateur.fillRect((cube.x + 1) * cubeSuivantL, cube.y * cubeSuivantH, cubeSuivantL, cubeSuivantH);

                        } catch (error) {
                            console.log(error);
                        }

                    });
                }
            }
        }









    });