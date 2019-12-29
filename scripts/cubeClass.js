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
}