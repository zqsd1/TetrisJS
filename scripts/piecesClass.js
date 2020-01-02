class PieceBase {
    /**
     * @param {Array} tableau 4 cubes
     */
    constructor(tableau) {
        this.cubes = tableau;
    }

    /**
     * deplace les 4 cubes de la piece
     * @param {number} dx le decalage en x 
     * @param {number} dy le decalage en y
     */
    deplacer(dx = 0, dy = 0) {
        for (let index = 0; index < this.cubes.length; index++) {
            this.cubes[index].deplacer(dx, dy);
            // this.cubes[index].x += dx;
            // this.cubes[index].y += dy;
        }
        return this.cubes;
    }


    /**
     *
     * test si un deplacement de la piece est possible
     * @param {Array} tableau le tableau du tetris !!! - la piece !!!
     * @param {number} nbX le nombre de cube en x
     * @param {number} nbY le nombre de cube en y
     * @param {number} dx le decalage en x
     * @param {number} dy le decalage en y
     */
    testerDeplacement(tableau, nbX, nbY, dx = 0, dy = 0) {




        for (let j = 0; j < this.cubes.length; j++) {
            if (!this.cubes[j].testerDeplacement(tableau, nbX, nbY, dx, dy)) {
                return false;
            }


            //     //verifie si le cube sort du tetris
            //     if ((this.cubes[j].x + dx) < 0 || this.cubes[j].x + dx >= nbX || this.cubes[j].y + dy >= nbY) {
            //         return false;
            //     }
            //     else {
            //         //verifie si la case est prise
            //         for (let index = 0; index < tableau.length; index++) {
            //             if (this.cubes[j].x + dx === tableau[index].x && this.cubes[j].y + dy === tableau[index].y) {
            //                 return false

            //             }

            //         }
            //     }

        }

        return true;
    }

    tourner(tableau, nbcubex, nbcubey) {
        //TODO voir fct SIN et COS

        let centre = null;


        //trouve lecube qui bouge pas pour la rotation
        for (let index = 0; index < this.cubes.length; index++) {
            if (this.cubes[index].isCentre) {

                centre = this.cubes[index]
                break;

            }

        }
        if (centre != null) {
            //1boucle pour verif une 2eme pour faire la rotation
            var verif = true;
            for (let i = 0; i < 2; i++) {
                if (!verif)
                    break;


                for (let index = 0; index < this.cubes.length; index++) {
                    if (!this.cubes[index].isCentre) {

                        if (!verif)
                            break;

                        /**
                         * bloc pour les cube dont le coté touche le centre
                        */
                        //cube en haut => vas à droite
                        if (this.cubes[index].x - centre.x === 0 && this.cubes[index].y - centre.y === 1) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 1, -1);

                            }
                            else {

                                this.cubes[index].x += 1;
                                this.cubes[index].y -= 1;
                            }
                            continue; //sinon risque de passer dans les autre if


                        }
                        //cube à droite =>vas en bas
                        if (this.cubes[index].x - centre.x === 1 && this.cubes[index].y - centre.y === 0) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], -1, -1);

                            }
                            else {

                                this.cubes[index].x -= 1;
                                this.cubes[index].y -= 1;
                            }
                            continue;

                        }
                        //cube en bas =>vas à gauche
                        if (this.cubes[index].x - centre.x === 0 && this.cubes[index].y - centre.y === -1) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], -1, 1);

                            }
                            else {
                                this.cubes[index].x -= 1;
                                this.cubes[index].y += 1;
                            }
                            continue;

                        }
                        //cube a gauche => vas en haut
                        if (this.cubes[index].x - centre.x === -1 && this.cubes[index].y - centre.y === 0) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 1, 1);

                            }
                            else {
                                this.cubes[index].x += 1;
                                this.cubes[index].y += 1;
                            }
                            continue;
                        }
                        /**
                         * 
                         */

                        /**
                         * bloc pour les cube qui sont en diagonale du centre
                         */
                        //cube haut gauche => bas gauche
                        if (this.cubes[index].x - centre.x === 1 && this.cubes[index].y - centre.y === 1) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 0, -2);

                            }
                            else {
                                this.cubes[index].y -= 2;
                            }
                            continue;
                        }
                        //cube bas gauche => bas droite
                        if (this.cubes[index].x - centre.x === 1 && this.cubes[index].y - centre.y === -1) {
                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], -2);

                            }
                            else {
                                this.cubes[index].x -= 2;
                            }

                            continue;
                        }
                        //cube bas droite => haut droite
                        if (this.cubes[index].x - centre.x === -1 && this.cubes[index].y - centre.y === -1) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 0, 2);

                            }
                            else {
                                this.cubes[index].y += 2;
                            }
                            continue;
                        }
                        //cube haut droite => haut gauche
                        if (this.cubes[index].x - centre.x === -1 && this.cubes[index].y - centre.y === 1) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 2);

                            }
                            else {
                                this.cubes[index].x += 2;
                            }
                            continue;
                        }

                        /**
                         * 
                         */

                        /**
                         * bloc pour le special de la piece I
                         */

                        if (this.cubes[index].x - centre.x === 0 && this.cubes[index].y - centre.y === 2) {

                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 2, -2);

                            }
                            else {
                                this.cubes[index].x += 2;
                                this.cubes[index].y -= 2;
                            }
                            continue;


                        }
                        //cube à droite =>vas en bas
                        if (this.cubes[index].x - centre.x === 2 && this.cubes[index].y - centre.y === 0) {
                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], -2, -2);

                            }
                            else {
                                this.cubes[index].x -= 2;
                                this.cubes[index].y -= 2;
                            }
                            continue;

                        }
                        //cube en bas =>vas à gauche
                        if (this.cubes[index].x - centre.x === 0 && this.cubes[index].y - centre.y === -2) {
                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], -2, 2);

                            }
                            else {
                                this.cubes[index].x -= 2;
                                this.cubes[index].y += 2;
                            }
                            continue;

                        }
                        //cube a gauche => vas en haut
                        if (this.cubes[index].x - centre.x === -2 && this.cubes[index].y - centre.y === 0) {
                            if (i === 0) {
                                verif = this.testerDeplacement(tableau, nbcubex, nbcubey, this.cubes[index], 2, 2);

                            }
                            else {
                                this.cubes[index].x += 2;
                                this.cubes[index].y += 2;
                            }
                            continue;
                        }

                        /**
                         * 
                         */
                    }
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

