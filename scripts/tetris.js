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

                if (params === "ArrowLeft") {

                    //slice pour enlever la piece active de la verification
                    if (pieceActive.verifier(this.listeCubes.slice(0, -4), this.nbCubeX, this.nbCubeY, -1)) {
                        pieceActive.deplacer(-1);
                    }
                }

                if (params === "ArrowRight") {


                    if (pieceActive.verifier(this.listeCubes.slice(0, -4), this.nbCubeX, this.nbCubeY, 1)) {
                        pieceActive.deplacer(1);
                    }

                }

                if (params === "bas") {

                    if (pieceActive.verifier(this.listeCubes.slice(0, -4), this.nbCubeX, this.nbCubeY, 0, 1)) {
                        pieceActive.deplacer(0, 1);

                    }
                    //si on peut pas descendre la piece faut verifier que les ligne ou elle est sont pas complete 
                    //si oui les suppr et faire descendre celles qui sont en haut 
                    //creer une nouvelle piece                   
                    else {
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
                            if (!this.verifierLigne(lignesCheck[index])) {
                                lignesCheck.splice(index, 1);
                                index--;//parce que splice decale le tab
                            }
                        }

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


                if (params ==="ArrowUp") {
                    pieceActive.tourner(this.listeCubes.slice(0, -4),this.nbCubeX, this.nbCubeY);
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
    verifierLigne(params) {

        //lister tout les cube de la ligne 
        var tmp = [];
        this.listeCubes.forEach(cube => {
            if (cube.y === params) {
                tmp.push(cube);
            }
        });

        //ligne complete 
        if (tmp.length === this.nbCubeX) {
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
                this.listeCubes[index].y = this.listeCubes[index].y + 1;
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
        if (piece.verifier(this.listeCubes, this.nbCubeX, this.nbCubeY)) {
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