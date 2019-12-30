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
requirejs(['cubeClass', 'piecesClass', 'tetris','utils'],
    function (cubeClass, tetris) {



        var nbCubeX = 6;
        var nbCubeY = 10;
        var canvasTetris = document.getElementById("canvasTetris");
        var canvasLargeur = canvasTetris.getAttribute("width");
        var canvasHauteur = canvasTetris.getAttribute("height");
        var largeurCube = canvasLargeur / nbCubeX;
        var hauteurCube = canvasHauteur / nbCubeY;

        var tetris = new Tetris(nbCubeX, nbCubeY);

        //event creer dans Tetris qui est trigger a chaque fois que le tab est modifié
        //FIXME event
        document.addEventListener("modif", dessiner);

        document.addEventListener("fin", gameOver);


        //pour agir sur les action utilisateur
        document.onkeydown = inputUser;

        //lance la partie
        var btnStart = document.getElementById("btnStart");
        btnStart.onclick = demarrer;

        //le temps entre chaque chute de piece
        var tempo = 500;
        var interval;
        function demarrer(params) {
            if (!tetris.isPlay) {
                tetris.debuterPartie();
                interval = window.setInterval(game, tempo);
                //FIXME window.setInterval(tetris.deplacerPiece, tempo, "bas");
            }


        }
        function game(params) {
            tetris.deplacerPiece("bas");
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
            params.preventDefault();
            if (params.key == "ArrowLeft" || params.key == "ArrowRight") {
                tetris.deplacerPiece(params.key);
            }
            
        }


        /**
         * 
         * @param {Array} params 
         * la fonction qui fait le dessin dans le canvas
         */
        function dessiner(params) {

            if (canvasTetris.getContext) {
                var dessinateur = canvasTetris.getContext("2d");

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











    });