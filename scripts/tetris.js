class Tetris {

    /**
     * 
     * @param {number} nbCubeX le nombre de cube sur une ligne
     * @param {number} nbCubeY nombre de cube sur une colonne

     */
    constructor(nbCubeX, nbCubeY) {
        this.nbCubeX = nbCubeX;
        this.nbCubeY = nbCubeY;

        this.listeCubes = [];//tableau qui contient tout les cube de la zone de jeu

        this.isPlay = false;
        //FIXME event pour quand on modif le tetris pour prevenir qu'il faut redessiner
        this.onModif = new Event("modif");
        this.onFin = new Event("fin");


    }

    /**
     * test si on peut mettre une piece a cet emplacement
     * @param {PieceBase} piece 
     */
    testDeplacement(piece) {


        // let t = this.listeCubes.slice(0, -4);
        for (let i = 0; i < piece.cubes.length; i++) {
            //1 verifie que la piece sorte pas du jeux
            if (piece.cubes[i].x < 0
                || piece.cubes[i].x >= this.nbCubeX
                || piece.cubes[i].y >= this.nbCubeY) {
                return false;
            }

            //2 verifie que la place est pas deja prise
            for (let j = 0; j < this.listeCubes.length - 4; j++) {
                if (this.listeCubes[j].x === piece.cubes[i].x && this.listeCubes[j].y === piece.cubes[i].y) {
                    return false
                }

            }

        }
        return true;
    }

    /**
     * 
     * @param {string} params la direction 
     */
    deplacerPiece(params) {
        try {

            if (this.listeCubes.length >= 4) {

                // pour 4 cube

                //recup la piece active
                // c'est les memes cube que dans listeCubes == les modifier modifie ceux dans listeCubes
                var pieceActive = new PieceBase(this.listeCubes.slice(-4));


                //1 piece temp pour faire le deplacement fantome parce que a cause de slice je peux pas faire avec ce que je recup
                //2 deplacer temp
                //3 test deplacement possible dans listecube -4
                //4 deplacer ou pas
                let temp = new PieceBase(
                    [
                        new Cube(pieceActive.cubes[0].x, pieceActive.cubes[0].y, pieceActive.cubes[0].couleur, pieceActive.cubes[0].isCentre),
                        new Cube(pieceActive.cubes[1].x, pieceActive.cubes[1].y, pieceActive.cubes[1].couleur, pieceActive.cubes[1].isCentre),
                        new Cube(pieceActive.cubes[2].x, pieceActive.cubes[2].y, pieceActive.cubes[2].couleur, pieceActive.cubes[2].isCentre),
                        new Cube(pieceActive.cubes[3].x, pieceActive.cubes[3].y, pieceActive.cubes[3].couleur, pieceActive.cubes[3].isCentre),
                    ]
                );





                if (params === "ArrowLeft") {

                    temp.deplacer(-1);
                    if (this.testDeplacement(temp)) {
                        pieceActive.deplacer(-1);
                    }

                }

                if (params === "ArrowRight") {

                    temp.deplacer(1);
                    if (this.testDeplacement(temp)) {
                        pieceActive.deplacer(1);
                    }


                }

                if (params === "bas") {
                    temp.deplacer(0, 1);
                    if (this.testDeplacement(temp)) {
                        pieceActive.deplacer(0, 1);
                    }

                    //si on peut pas descendre la piece faut verifier que les ligne ou elle est sont pas complete 
                    //si oui les suppr et faire descendre celles qui sont en haut 
                    //creer une nouvelle piece                   
                    else {


                        //TODO y'a mieux a faire
                        var lignesCheck = [];
                        // obtenir les numero y 
                        pieceActive.cubes.forEach(cube => {
                            if (!lignesCheck.includes(cube.y)) {
                                lignesCheck.push(cube.y);
                            }
                        });


                        //verifie si la ligne est complete
                        //enleve les element qui sont pas complet              
                        for (let index = 0; index < lignesCheck.length; index++) {
                            if (!this.testerLigneComplete(lignesCheck[index])) {
                                lignesCheck.splice(index, 1);
                                index--;//parce que splice decale le tab
                            }
                        }

                        //////


                        //enleve les ligne complete
                        for (let index = 0; index < lignesCheck.length; index++) {

                            this.effacerLigne(lignesCheck[index]);

                        };
                        //descend les ligne au dessus des ligne supprimé
                        for (let index = 0; index < lignesCheck.length; index++) {


                            this.descendreLigne(lignesCheck[index]);
                        };


                        this.creerPiece();

                    }
                }


                if (params === "ArrowUp") {
                    temp.tourner();
                    if (this.testDeplacement(temp)) {
                        pieceActive.tourner();
                    }

                }
            }
            else
                this.creerPiece();

        } catch (error) {
            console.log(error);
        }

        //FIXME  add event POur redessin        pas sur pour le fait que sa soit sur le document
        document.dispatchEvent(this.onModif);




    }

    /**
     * verifie si une ligne est complete
     * @param {number} params le numero de la ligne a verifier
     *
     */
    testerLigneComplete(params) {

        //lister tout les cube de la ligne 
        let tmp = 0;
        this.listeCubes.forEach(cube => {
            if (cube.y === params) {
                tmp++;
            }
        });

        //ligne complete 
        if (tmp === this.nbCubeX) {
            return true;

        }
        //ligne imcomplete 
        else {
            return false;

        }

    }


    /**
     * effacer les cube de la ligne en params
     * @param {number} params numero de la ligne Y
     */
    effacerLigne(params) {


        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].y === params) {
                this.listeCubes.splice(index, 1);
                index--;//splice decale le tab donc sinon on saute 1 element
            }


        }

    }

    /**
     * descend tout les cube au dessus de la ligne supprimé
     * @param {number} params le numero de la ligne supprimé
     */
    descendreLigne(params) {


        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].y < params) {

                this.listeCubes[index].deplacer(0, 1);// = this.listeCubes[index].y + 1;
            }

        }
    }

    /**
     * creer une nouvelle piece dans la zone de depart
     * si place deja prise fini la partie
     * @param {*} params 
     */
    creerPiece(params) {

        var piece = pieceFactory(Math.floor((this.nbCubeX - 1) / 2), 0);

        // test si on la place de la nouvelle piece est occupé
        if (this.testerDeplacement(piece)) {
            
            this.listeCubes.push(piece.cubes[0], piece.cubes[1], piece.cubes[2], piece.cubes[3]);
            //FIXME event
            document.dispatchEvent(this.onModif);

        }
        else {
            this.finirPartie();
        }

    }

    /**
     * 
     * @param {*} params 
     */
    debuterPartie(params) {

        this.listeCubes = [];
        //FIXME
        //var tempo = window.setInterval(deplacerPiece, params, "bas");

        this.isPlay = true;

    }
    finirPartie() {

        this.isPlay = false;
        document.dispatchEvent(this.onFin);

    }

}