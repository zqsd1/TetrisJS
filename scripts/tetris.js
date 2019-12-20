class Cube{
    constructor(width,height,x,y,couleur) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y =y;
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
    if (canvasTetris.getContext){
    var dessinateur = canvasTetris.getContext("2d");

    tableauCubes.forEach(cube => {
   
        dessinateur.fillStyle = cube.couleur;
        dessinateur.fillRect(cube.x*cubeWidth,cube.y*cubeHeight,cube.width,cube.height);
            console.log("hello");
        
    });
    }
}


var tableauCubes = new Array(nbCubeX*nbCubeY);

var tmp = createPiece();
tableauCubes[4] = tmp;

console.log(tableauCubes);
dessiner();

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
        window.setInterval(deplacement,tempo/*,arg +1Y */)

    }

}

/**
 * 
 * @param {*} params 
 * la fonction qui fait bouger la piece
 */
function deplacement(params) {
    
}

function createPiece(params) {
    var cubeTest = new Cube(cubeWidth,cubeHeight,5,0,"red");
    return cubeTest;
}