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

    /**
     * 
     * @param {Array} tableau tableau pour tester si il y a deja un cube dans le nouvel emplacement
     * @param {number} nbY le nombre de cube possible en x
     * @param {number} nbX le nombre de cube possible en y
     * @param {number} dx le decalage en y
     * @param {number} dy le decalage en x
     */
    testerDeplacement(tableau,nbX,nbY, dx = 0, dy = 0) {
        //1 test pour si le cube depasse du plateau
        if (this.x +dx <0
            ||this.x +dx >=nbX
            || this.y+dy>= nbY) {
                return false;
            
        }
        //2 test pour si la case du deplacement est deja occupé
        for (let index = 0; index < tableau.length; index++) {
           if (tableau[index].x ===this.x+dx &&tableau[index].y ===this.y+dy) {
               return false;
           } 
            
        }
        return true;
    }
}