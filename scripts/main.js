

var canvasTetris = document.getElementById("canvasTetris");

var tetris = new Tetris(10, 20, canvasTetris.getAttribute("width"), canvasTetris.getAttribute("height"));

//event creer dans Tetris qui est trigger a chaque fois que le tab est modifié
//FIXME event
document.addEventListener("modif",dessiner);


//pour agir sur les action utilisateur
document.onkeydown = inputUser;

//lance la partie
var btnStart = document.getElementById("btnStart");
btnStart.onclick = demarrer;

//le temps entre chaque chute de piece
var tempo = 500;
function demarrer(params) {
    if (!tetris.isPlay) {
        tetris.debuterPartie();
        var x = window.setInterval(game,tempo);
        //FIXME window.setInterval(tetris.deplacerPiece, tempo, "bas");
    }


}
function game(params) {
    tetris.deplacerPiece("bas");
}

/**
 * 
 * @param {*} params  
 */
function inputUser(params) {

    if (params.key == "ArrowLeft"||params.key == "ArrowRight") {
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
        dessinateur.clearRect(0, 0, canvasTetris.getAttribute("width"), canvasTetris.getAttribute("height"))



        tetris.listeCubes.forEach(cube => {

            try {
                dessinateur.fillStyle = cube.couleur;
                dessinateur.fillRect(cube.x * tetris.largeurCube, cube.y * tetris.largeurCube, cube.width, cube.height);

            } catch (error) {
                console.log(error);
            }

        });
    }
}











