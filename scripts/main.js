var xxx = 5;
var yyy = 8;
var canvasTetris = document.getElementById("canvasTetris");

var tetris = new Tetris(xxx, yyy, canvasTetris.getAttribute("width"), canvasTetris.getAttribute("height"));

//event creer dans Tetris qui est trigger a chaque fois que le tab est modifié
//FIXME event
document.addEventListener("modif",dessiner);

document.addEventListener("fin",gameOver);


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
        interval = window.setInterval(game,tempo);
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











