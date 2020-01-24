var config = {
    "nbCubeX": 10,
    "nbCubeY": 20,
    "temporisation": 500
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
                "iscentre": true
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
                "iscentre": true
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
                "iscentre": true
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
    return new PieceBase(configPieces[getRandomIntInclusive(1, 7)],x,y);


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

