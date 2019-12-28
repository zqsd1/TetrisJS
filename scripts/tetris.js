class Tetris {

    /**
     * 
     * @param {number} nbCubeX le nombre de cube sur une ligne
     * @param {number} nbCubeY nombre de cube sur une colonne
     * @param {number} largeurJeux la largeur du canvas
     * @param {number} HauteurJeux la hauteur du canvas
     */
    constructor(nbCubeX, nbCubeY, largeurJeux, HauteurJeux) {
        this.nbCubeX = nbCubeX;
        this.nbCubeY = nbCubeY;
        this.largeurCube = largeurJeux / nbCubeX;
        this.hauteurCube = HauteurJeux / nbCubeY;

        this.listeCubes = [];

        this.isPlay = false;
        //FIXME event pour quand on modif le tetris pour prevenir qu'il faut redessiner
        this.onModif = new Event("modif");
        this.onFin = new Event("fin");


    }


    /**
     * 
     * @param {string} params 
     */
    deplacerPiece(params) {
        try {

            var isLibre = true;

            if (this.listeCubes.length >= 4) {

                 // pour 4 cube

                //recup la piece active
                // c'est les memes cube que dans listeCubes == les modifier modifie ceux dans listeCubes
                var pieceActive = this.listeCubes.slice(-4);

                if (params === "ArrowLeft") {

                    /**
                     * TODO bloc dans fct 
                     * param pieceactiv , x ,y  ,listecube?et virer la verif de la class?
                     * return bool
                     * 
                     * */
                    pieceActive.forEach(cube => {
                        //verifie si sa deborde
                        if ((cube.x - 1) < 0) {
                            isLibre = false;
                        }
                        else {
                            //verifie si la case est prise
                            for (let index = 0; index < this.listeCubes.length - 4; index++) {
                                if (cube.x - 1 === this.listeCubes[index].x && cube.y === this.listeCubes[index].y) {
                                    isLibre = false;
                                    break;
                                }

                            }
                        }
                    });
                    /**
                     * 
                     */

                    if (isLibre) {
                        pieceActive.forEach(cube => {
                            cube.x = cube.x - 1;
                        });
                    }
                }

                if (params === "ArrowRight") {
                    pieceActive.forEach(cube => {
                        if (cube.x + 1 >= this.nbCubeX) {
                            isLibre = false;
                        }
                        else {
                            for (let index = 0; index < this.listeCubes.length - 4; index++) {
                                if ((cube.x + 1) === this.listeCubes[index].x && cube.y === this.listeCubes[index].y) {
                                    isLibre = false;
                                    break;
                                }

                            }
                        }
                    });

                    if (isLibre) {
                        pieceActive.forEach(cube => {
                            cube.x = cube.x + 1;
                        });
                    }

                }

                if (params === "bas") {

                    pieceActive.forEach(cube => {
                        if (cube.y + 1 >= this.nbCubeY) {
                            isLibre = false;
                        }
                        else {
                            for (let index = 0; index < this.listeCubes.length - 4; index++) {
                                if (cube.x === this.listeCubes[index].x && cube.y + 1 === this.listeCubes[index].y) {
                                    isLibre = false;
                                    break;
                                }

                            }
                        }
                    });

                    if (isLibre) {
                        pieceActive.forEach(cube => {
                            cube.y = cube.y + 1;
                        });



                    }
                    else {
                        var lignesCheck = [];
                        // obtenir les numero y 
                        pieceActive.forEach(cube => {
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

                        //tri du plus petit au plus grand
                        //TODO a un interet ?
                        // lignesCheck.sort(function (a, b) {
                        //     return a - b;
                        // });

                        //enleve les ligne complete
                        for (let index = 0; index < lignesCheck.length; index++) {
                            this.effacerLigne(lignesCheck[index]);
                            this.descendreLigne(lignesCheck[index]);
                        };

                        this.creerPiece();

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
    descendreLignes(params) {


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
        var fin = false;


        var piece = new PieceCarre(Math.floor((this.nbCubeX - 1) / 2), 0, this.largeurCube, this.hauteurCube);

        //test si la place est deja prise
        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].x === piece.cubeA.x && this.listeCubes[index].y === piece.cubeA.y
                || this.listeCubes[index].x === piece.cubeB.x && this.listeCubes[index].y === piece.cubeB.y
                || this.listeCubes[index].x === piece.cubeC.x && this.listeCubes[index].y === piece.cubeC.y
                || this.listeCubes[index].x === piece.cubeD.x && this.listeCubes[index].y === piece.cubeD.y) {
                fin = true;
                break
            }
        }

       
        if (!fin) {
            this.listeCubes.push(piece.cubeA, piece.cubeB, piece.cubeC, piece.cubeD);

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