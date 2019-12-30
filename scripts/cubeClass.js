class Cube {
    /**
     * 
     * @param {*} x position x dans le tetris
     * @param {*} y position y dans le tetris
     * @param {*} couleur couleur du cube
     * @param {*} isCentre pour definir le cube autour duquel une piece tourne
     */
    constructor(x, y, couleur, isCentre = false) {

        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.isCentre = isCentre;

    }


    /**
     * verifie si il y a un cube dans le tableau
     * @param {} tableau 
     * @param {*} x 
     * @param {*} y 
     */
    verifier(tableau, x = 0, y = 0) {

        for (let index = 0; index < tableau.length; index++) {
            if (tableau[index].x === this.x + x && tableau[index].y === this.y + y) {
                return false
            }

        }
        return true;
    }
    /**
     * deplcer le cube
     */
    deplacer(x = 0, y = 0) {

        this.x += x;
        this.y += y;
        return this;

    }
}