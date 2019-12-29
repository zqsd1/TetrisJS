class PieceBase {
    /**
     * 
     * @param {Array} tableau 4 cubes
     */
    constructor(tableau) {
        this.cubes = tableau;
    }

    /**
     * deplace les 4 cubes de la piece
     * @param {number} x le decalage en x 
     * @param {number} y le decalage en y
     */
    deplacer(x = 0, y = 0) {
        for (let index = 0; index < this.cubes.length; index++) {
            this.cubes[index].x += x;
            this.cubes[index].y += y;
        }
        return this.cubes;
    }


    /**
     * verifie si un deplacement est possible
     * @param {Array} tableau le tableau du tetris
     * @param {number} nbX le nombre de cube en x
     * @param {number} nbY le nombre de cube en y
     * @param {number} x le decalage en x
     * @param {number} y le decalage en y
     */
    verifier(tableau, nbX, nbY, x = 0, y = 0) {

        for (let j = 0; j < this.cubes.length; j++) {

            //verifie si le cube sort du tetris
            if ((this.cubes[j].x + x) < 0 || this.cubes[j].x + x >= nbX || this.cubes[j].y + y >= nbY) {
                return false;
            }
            else {
                //verifie si la case est prise
                for (let index = 0; index < tableau.length; index++) {
                    if (this.cubes[j].x + x === tableau[index].x && this.cubes[j].y + y === tableau[index].y) {
                        return false

                    }

                }
            }

        }

        return true;
    }

    tourner(tableau) {

        for (let index = 0; index < cubes.length; index++) {
            if (cubes[index].isCentre) {

            }

        }
        //TODO trouver le cube centre
        //TODO trouver les piece qui soont a +-1y/+-1x
        //TODO trouver les cube a +-2
        //TODO verifier les autre
        //TODO tourner
        return this.cubes;
    }

}



class PieceL extends PieceBase {

    /**
     * 
     * @param {number} posX 
     * @param {number} posY 
     * @param {string} couleur 
     */
    constructor(posX, posY, couleur = "red") {
        let cubeA = new Cube(posX, posY, couleur);
        let cubeB = new Cube(posX, posY + 1, couleur, true);
        let cubeC = new Cube(posX, posY + 2, couleur);
        let cubeD = new Cube(posX + 1, posY + 2, couleur);

        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }
}

class PieceInvertL extends PieceBase {

    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "yellow") {
        let cubeA = new Cube(posX, posY, couleur);
        let cubeB = new Cube(posX, posY + 1, couleur, true);
        let cubeC = new Cube(posX, posY + 2, couleur);
        let cubeD = new Cube(posX - 1, posY + 2, couleur);
        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }
}

class PieceCarre extends PieceBase {


    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "orange") {
        let cubeA = new Cube(posX, posY, couleur);
        let cubeB = new Cube(posX + 1, posY, couleur);
        let cubeC = new Cube(posX, posY + 1, couleur);
        let cubeD = new Cube(posX + 1, posY + 1, couleur);
        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }
}

class PieceI extends PieceBase {

    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "purple") {
        let cubeA = new Cube(posX, posY, couleur);
        let cubeB = new Cube(posX, posY + 1, couleur, true);
        let cubeC = new Cube(posX, posY + 2, couleur);
        let cubeD = new Cube(posX, posY + 3, couleur);
        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }

}

class PieceS extends PieceBase {

    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "green") {

        let cubeA = new Cube(posX, posY + 1, couleur);
        let cubeB = new Cube(posX + 1, posY + 1, couleur, true);
        let cubeC = new Cube(posX + 1, posY, couleur);
        let cubeD = new Cube(posX + 2, posY, couleur);

        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );

    }

}

class PieceZ extends PieceBase {

    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "white") {
        let cubeA = new Cube(posX, posY, couleur);
        let cubeB = new Cube(posX + 1, posY, couleur);
        let cubeC = new Cube(posX + 1, posY + 1, couleur, true);
        let cubeD = new Cube(posX + 2, posY + 1, couleur);
        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }

}
class PiecePyramide extends PieceBase {

    /**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {string} couleur 
 */
    constructor(posX, posY, couleur = "blue") {
        let cubeA = new Cube(posX, posY, couleur, true);
        let cubeB = new Cube(posX - 1, posY, couleur);
        let cubeC = new Cube(posX + 1, posY, couleur);
        let cubeD = new Cube(posX, posY + 1, couleur);
        super(
            [
                cubeA,
                cubeB,
                cubeC,
                cubeD

            ]
        );
    }
}

