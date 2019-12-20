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
    if (canvasTetris.getContext){
    var dessinateur = canvasTetris.getContext("2d");

    }
}

//pour agir sur les action utilisateur
document.onKeyDown = inputUser;
function inputUser(params) {
    if (params.key == "ArrowLeft") {
     
        deplacement(/**x-1 */);
    }
    
    if (params.key == "ArrowRight") {
        deplacement(/**x+1 */);
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
        window.setInterval(deplacement,tempo,/*arg +1Y */)

    }

}

/**
 * 
 * @param {*} params 
 * la fonction qui fait bouger la piece
 */
function deplacement(params) {
    
}