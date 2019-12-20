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