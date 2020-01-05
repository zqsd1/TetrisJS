var config = {
    "nbCubeX": 10,
    "nbCubeY": 20,
    "temporisation" : 500
}

var configPieces = {
    1: {
        "nom": "carre",
        "couleur": "orange",
        "cubes": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 0,
                "y": 1,

            },
            {
                "x": 1,
                "y": 1
            }
        ]


    },
    2: {
        "nom": "z",
        "couleur": "blue",
        "cubes": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 1,
                "iscentre": true
            },
            {
                "x": 2,
                "y": 1
            }

        ]


    },
    3: {
        "nom": "s",
        "couleur": "green",
        "cubes": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 1,
                "y": 1,
                "iscentre": true
            },
            {
                "x": 1,
                "y": 0

            },
            {
                "x": 2,
                "y": 0
            }

        ]


    },
    4: {
        "nom": "I",
        "couleur": "purple",
        "cubes": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 1,
                "iscentre": true
            },
            {
                "x": 0,
                "y": 2,

            },
            {
                "x": 0,
                "y": 3
            }
       
        ]


    },
    5: {
        "nom": "L",
        "couleur": "yellow",
        "cubes": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 1,
                "iscentre" : true
            },
            {
                "x": 0,
                "y": 2,
                
            },
            {
                "x": 1,
                "y": 2
            }
 
        ]

    },
    6: {
        "nom": "Linverse",
        "couleur": "red",
        "cubes": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,  
                "y": 1,
                "iscentre" : true
            },
            {
                "x": 0,
                "y": 2,
              
            },
            {
                "x": -1,
                "y": 2
            }
    
        ]


    },
    7: {
        "nom": "pyramide",
        "couleur": "white",
        "cubes": [
            {
                "x": 0,
                "y": 0,
                  "iscentre" : true
            },
            {
                "x": -1,
                "y": 0
            },
            {
                "x": 1,
                "y": 0,
              
            },
            {
                "x": 0,
                "y": 1
            }
         
        ]

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
// return new PieceBase([    
//     new Cube(configPieces[piece].cubes[0].x+x,configPieces[piece].cubes[0].y+y,configPieces[piece].couleur),
//     new Cube(configPieces[piece].cubes[1].x+x,configPieces[piece].cubes[1].y+y,configPieces[piece].couleur),
//     new Cube(configPieces[piece].cubes[2].x+x,configPieces[piece].cubes[2].y+y,configPieces[piece].couleur),
//     new Cube(configPieces[piece].cubes[3].x+x,configPieces[piece].cubes[3].y+y,configPieces[piece].couleur)]
//     );
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

