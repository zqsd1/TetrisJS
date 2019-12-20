class Cube {
    constructor(width, height, x, y, couleur, isActive = false) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.isActive = isActive;

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


//tableau qui represente tout les cases du jeux
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

//test faire tomber piece
createPiece();


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

        //createPiece();
        window.setInterval(deplacement, tempo, "bas")


    }

}

/**
 * 
 * @param {string} params 
 * la fonction qui fait bouger la piece
 */
function deplacement(params) {


    if (params == "gauche") {

        for (let i = 0; i < tableauCubes.length; i++) {

            var tmp = tableauCubes[i];
            if (tmp.isActive) {

                //pour si c'est un bord on decale pas
                if (Math.floor(i / nbCubeX) == Math.floor((i - 1) / nbCubeX)) {

                    tableauCubes[i - 1].isActive = true;
                    tableauCubes[i - 1].couleur = tmp.couleur;
                    tmp.isActive = false;
                    tmp.couleur = "black";
                    tableauCubes[i] = tmp;

                }
                break;
            }

        }

    }
    if (params == "droite") {

        for (let i = 0; i < tableauCubes.length; i++) {
            if (tableauCubes[i].isActive) {
                if (Math.floor(i / nbCubeX) == Math.floor((i + 1) / nbCubeX)) {


                    tableauCubes[i + 1].isActive = true;
                    tableauCubes[i + 1].couleur = tableauCubes[i].couleur;

                    tableauCubes[i].isActive = false;
                    tableauCubes[i].couleur = "black";

                }
                break;
            }

        }
    }
    if (params == "bas") {


        for (let i = 0; i < tableauCubes.length; i++) {
            if (tableauCubes[i].isActive) {
                //verifie si on est pas en bas
                if (i + nbCubeX < tableauCubes.length) {

                    tableauCubes[i + nbCubeX].isActive = true;
                    tableauCubes[i + nbCubeX].couleur = tableauCubes[i].couleur

                    tableauCubes[i].isActive = false
                    tableauCubes[i].couleur = "black";
                }
                //en bas
                else {
                    tableauCubes[i].isActive = false;

                    //creer nouvelle piece 
                    createPiece();


                }
                break;
            }

        }
    }
    dessiner();

}



function createPiece(params) {
    var cubeTest = new Cube(cubeWidth, cubeHeight, 4, 0, "red");
    cubeTest.isActive = true;
    tableauCubes[4] = cubeTest;
    //return cubeTest;
}