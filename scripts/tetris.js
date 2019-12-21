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
//var canvasTetrisHeight = canvasTetris.getAttribute("height");
//var canvasTetrisWidth = canvasTetris.getAttribute("width");

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

        //efface le canvas
        dessinateur.clearRect(0, 0, canvasTetris.getAttribute("width"), canvasTetris.getAttribute("height"))

        tableauCubes.forEach(cube => {

            try {
                dessinateur.fillStyle = cube.couleur;
                dessinateur.fillRect(cube.x * cubeWidth, cube.y * cubeHeight, cube.width, cube.height);

            } catch (error) {
                console.log(error);
            }

        });
    }
}


//tableau qui represente tout les cases du jeux
var tableauCubes = [];


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
var tempo = 500;
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
            //trouve la piece que l'on deplace
            if (tableauCubes[i].isActive) {


                //verifie si on peut faire le deplacement
                //bord du plateau ?
                if (tableauCubes[i].x > 0) {

                    //cube a coté ?      
                    var isFree = true;
                    for (let j = 0; j < tableauCubes.length; j++) {
                        if (tableauCubes[j].x === tableauCubes[i].x - 1 && tableauCubes[j].y === tableauCubes[i].y) {
                            isFree = false;
                            break;
                        }
                    }

                    //deplacement
                    if (isFree) {
                        tableauCubes[i].x = tableauCubes[i].x - 1;
                        console.log(tableauCubes[i]);
                    }

                }

                dessiner();
                break;

            }
        }
    }


    if (params == "droite") {

        for (let i = 0; i < tableauCubes.length; i++) {
            //trouve la piece que l'on deplace
            if (tableauCubes[i].isActive) {

                //verifie si on peut faire le deplacement
                //bord du plateau ?
                if (tableauCubes[i].x < nbCubeX - 1) {

                    //cube a coté ?      
                    var isFree = true;
                    for (let j = 0; j < tableauCubes.length; j++) {
                        if (tableauCubes[j].x === tableauCubes[i].x + 1 && tableauCubes[j].y === tableauCubes[i].y) {
                            isFree = false;
                            break;
                        }
                    }

                    //deplacement
                    if (isFree) {
                        tableauCubes[i].x = tableauCubes[i].x + 1;
                    }

                }
                dessiner();
                break;

            }
        }
    }


    if (params == "bas") {
        for (let i = 0; i < tableauCubes.length; i++) {
            //trouve la piece que l'on deplace
            if (tableauCubes[i].isActive) {
                //verifie si on peut faire le deplacement
                //bord du plateau ?
                var isFree = true;
                if (tableauCubes[i].y < nbCubeY - 1) {
                    //cube en dessous ?      

                    for (let j = 0; j < tableauCubes.length; j++) {
                        if (tableauCubes[j].x === tableauCubes[i].x && tableauCubes[j].y === tableauCubes[i].y + 1) {
                            isFree = false;
                            break;
                        }
                    }


                }
                else
                    isFree = false;

                if (isFree) {
                    tableauCubes[i].y = tableauCubes[i].y + 1;
                    dessiner();
                }
                else{
                    tableauCubes[i].isActive=false;
                    verifier();
                }



               
                break;
            }
        }



    }
}



function createPiece(params) {
    var cubeTest = new Cube(cubeWidth, cubeHeight, 4, 0, "red");
    cubeTest.isActive = true;
    tableauCubes.push(cubeTest);
    //return cubeTest;
}

function verifier(params) {
    //TODO verifier si la ligne ou la piece s'arrete est complete si oui effacer 
    // if (condition) {
    //     effacerLigne();
    // }

    createPiece();
    dessiner();
}




function effacerLigne(params) {

}