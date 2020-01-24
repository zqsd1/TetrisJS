class PieceBase {
    /**
     * @param {Array} tableau 4 cubes
     */

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
                    this.cubes[index].deplacer(-tmpx - tmpY, -tmpY + tmpx)//double deplacement => deplace sur le centre et fait le deplacement de la rotation

                }
            }


        }
        return this.cubes;
    }
}
