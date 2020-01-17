class PieceBase {
    /**
     * @param {Array} tableau 4 cubes
     */
    //TODO multiple choice ctor
    constructor(param, dx, dy) {

        if (Array.isArray(param)) {

            this.cubes = param;
        }
        else if (typeof (param) == "object") {
            this.cubes = [];
            for (let index = 0; index < param.cubes.length; index++) {

                this.cubes.push(
                    new Cube(
                        param.cubes[index].x + dx,
                        param.cubes[index].y + dy,
                        param.couleur,
                        param.cubes[index].iscentre !== undefined ? true : false)
                );

            }

        }
    }

    /**
     * deplace les 4 cubes de la piece
     * @param {number} dx le decalage en x 
     * @param {number} dy le decalage en y
     */
    deplacer(dx = 0, dy = 0) {

        for (let index = 0; index < this.cubes.length; index++) {
            this.cubes[index].deplacer(dx, dy);
        }
        return this.cubes;
    }

    get couleur() {
        return this.cubes[0].couleur;
    }  
    
    //trouve lecube qui bouge pas pour la rotation    
    get cubeCentral() {
        for (let index = 0; index < this.cubes.length; index++) {
            if (this.cubes[index].isCentre) {
                return this.cubes[index];
            }

        }
        return null;
    }


    /**
     * fait tourner la piece
     */
    tourner() {
        //TODO voir fct SIN et COS

        let centre = this.cubeCentral;    

        if (centre != null) {
            for (let index = 0; index < this.cubes.length; index++) {
                if (!this.cubes[index].isCentre) {

                    //recup du decallage par rapport au centre
                    let tmpx = this.cubes[index].x - centre.x;
                    let tmpY = this.cubes[index].y - centre.y;

                    // decalage x+1 = - decalage y
                    // decalage y+1 = decalage x
                    this.cubes[index].x = centre.x - tmpY;
                    this.cubes[index].y = centre.y + tmpx;
                }
            }


        }
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

