var config = {
    "nbCubeX": 10,
    "nbCubeY": 20
}

var configPieces = {
    1: {
        "nom": "carre",
        "couleur": "orange"

    },
    2: {
        "nom": "z",
        "couleur": "bleu"
    },
    3: {
        "nom": "s",
        "couleur": "vert"
    },
    4: {
        "nom": "I",
        "couleur": "violet"
    },
    5: {
        "nom": "L",
        "couleur": "jaune"
    },
    6: {
        "nom": "Linverse",
        "couleur": "rouge"
    },
    7: {
        "nom": "pyramide",
        "couleur": "blanc"
    }


}


/**
 * generer les differente piece aleatoirement
 * @param {number} x position x 
 * @param {number} y position y
 */
function pieceFactory(x = 0, y = 0) {
    //TODO voir reflection


    let piece = getRandomIntInclusive(1, 7);
    switch (piece) {
        case 1:
            return new PieceCarre(x, y);
        case 2:
            return new PieceZ(x, y);
        case 3:
            return new PieceS(x, y);
        case 4:
            return new PieceI(x, y);
        case 5:
            return new PieceL(x, y);
        case 6:
            return new PieceInvertL(x, y);
        case 7:
            return new PiecePyramide(x, y);

        default:
            break;

    }


}
/**
 * genere un entier aleatoire entre min et max inclus
 * @param {number} min 
 * @param {number} max 
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * test si le deplacement d'un cube est possible dans le tableau de cube
 * @param {Array} tableau le tableau de cube
 * @param {number} nbcubeX le nombre de cube sur une ligne
 * @param {number} nbcubeY le nombre de ligne de cube
 * @param {Cube} cube le cube a tester
 * @param {number} dx le deplacement en x
 * @param {number} dy le deplacement en y
//TODO rename
 */
function cubeIsFreeDeplacement(tableau, nbcubeX, nbcubeY, cube, dx = 0, dy = 0) {

    //verifie si y'a des cube dans le jeux qui peuvent gener
    if (tableau.length > 0) {
        for (let index = 0; index < tableau.length; index++) {
            if (tableau[index].x === cube.x + dx && tableau[index].y === cube.y + dy) {
                return false;
            }
        }
    }

    //verifie si le cube depasse pas du jeux
    if (cube.x + dx < 0
        || cube.x + dx >= nbcubeX
        || cube.y + dy >= nbcubeY) {
        return false;
    }


return true;

}