class Cube {
    /**
     * 
     * @param {number} x position x dans le tetris
     * @param {number} y position y dans le tetris
     * @param {string} couleur couleur du cube
     * @param {boolean} isCentre pour definir le cube autour duquel une piece tourne
     */
    constructor(x, y, couleur, isCentre = false) {

        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.isCentre = isCentre;

    }

  /**
   * deplacer un cube
   * @param {number} dx le deplacement en x
   * @param {number} dy le deplacement en y
   */
    deplacer(dx = 0, dy = 0) {

        this.x += dx;
        this.y += dy;
        return this;

    }

}