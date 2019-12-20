class Cube {
    constructor(width, height, x, y, couleur) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.couleur = couleur;
    }
}


//param du tetris
var nbCubeX = 10;
var nbCubeY = 20;

var canvasTetris = document.getElementById("canvasTetris");
var canvasTetrisHeight = canvasTetris.getAttribute("height");
var canvasTetrisWidth = canvasTetris.getAttribute("width");

var cubeHeight = canvasTetris.getAttribute("height") / nbCubeY;
var cubeWidth = canvasTetris.getAttribute("width") / nbCubeX;


/**
 * 
 * @param {*} params 
 * la fonction qui fait le dessin dans le canvas
 */
function dessiner(params) {
    if (canvasTetris.getContext) {
        var dessinateur = canvasTetris.getContext("2d");

        tableauCubes.forEach(cube => {

            try {
                dessinateur.fillStyle = cube.couleur;
                dessinateur.fillRect(cube.x * cubeWidth, cube.y * cubeHeight, cube.width, cube.height);

            } catch (error) {

            }

        });
    }
}


var tableauCubes = new Array(nbCubeX * nbCubeY);

//remplissage du tableau par des cubes noir
var index = 0;
//position y
for (let y = 0; y < nbCubeY; y++) {

    //position x
    for (let x = 0; x < nbCubeX; x++) {

        tableauCubes[index] = new Cube(cubeWidth, cubeHeight, x, y, "black");
        index++;
    }

}
var tmp = createPiece();
tableauCubes[4] = tmp;

dessiner();

//pour agir sur les action utilisateur
document.onkeydown = inputUser;
function inputUser(params) {

    if (params.key == "ArrowLeft") {

        deplacement("gauche");
    }

    if (params.key == "ArrowRight") {
        deplacement("droite");
    }
}

//lance la partie
var btnStart = document.getElementById("btnStart");
btnStart.onclick = demarrer;
var isPlay = false;
var tempo = 1000;
function demarrer(params) {

    //pour eviter de lancer plusieur fois
    if (!isPlay) {
        isPlay = !isPlay;

        window.setInterval(deplacement, tempo, "bas")

    }

}

/**
 * 
 * @param {*} params 
 * la fonction qui fait bouger la piece
 */
function deplacement(params) {


    if (params == "gauche") {
       
        for (let i = 0; i < tableauCubes.length; i++) {
            
            if (tableauCubes[i].couleur != "black") {
               
                //pour si c'est un bord
                if (Math.floor(i / nbCubeX) == Math.floor((i - 1) / nbCubeX)) {
                    tableauCubes[i - 1].couleur = tableauCubes[i].couleur
                    tableauCubes[i].couleur = "black";
                    console.log("1");
                }
            }
            break;
        }

    }
    if (params == "droite") {
        
        for (let i = 0; i < tableauCubes.length; i++) {
            if (tableauCubes[i].couleur != "black") {
                if (Math.floor(i / nbCubeX) == Math.floor((i + 1) / nbCubeX)) {
                    tableauCubes[i + 1].couleur = tableauCubes[i].couleur
                    tableauCubes[i].couleur = "black";
                    
                }
                break;
            }

        }
    }
    if (params == "bas") {


        for (let i = 0; i < tableauCubes.length; i++) {
            if (tableauCubes[i].couleur != "black") {

                if (i + nbCubeX < tableauCubes.length) {

                    tableauCubes[i + nbCubeX].couleur = tableauCubes[i].couleur
                    tableauCubes[i].couleur = "black";
                }
                break;
            }

        }
    }
    dessiner();

}

function createPiece(params) {
    var cubeTest = new Cube(cubeWidth, cubeHeight, 5, 0, "red");
    return cubeTest;
}