class Tetris extends Subject {

    /**
     * 
     * @param {number} nbCubeX le nombre de cube sur une ligne
     * @param {number} nbCubeY nombre de cube sur une colonne

     */
    constructor(nbCubeX, nbCubeY) {
        super();
        this.nbCubeX = nbCubeX;
        this.nbCubeY = nbCubeY;

        this.listeCubes = [];//tableau qui contient tout les cube de la zone de jeu

        this.isPlay = false;
        this.compteurLignesSuppr = 0;
        this.pieceSuivante = null;

    }

    // get pieceSuivante() {
    //     return this._pieceSuivante;
    // }

    // set pieceSuivante(value) {
    //     this._pieceSuivante = value;
    //     this.notifyAllObservers("nvlPiece");
    // }


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
                let pieceActive = new PieceBase(this.listeCubes.slice(-4));


                //1 piece temp pour faire le deplacement fantome parce que a cause de slice je peux pas faire avec ce que je recup
                //2 deplacer temp
                //3 test deplacement possible dans listecube -4
                //4 deplacer ou pas
                let pieceFantome = new PieceBase(
                    [
                        new Cube(pieceActive.cubes[0].x, pieceActive.cubes[0].y, pieceActive.cubes[0].couleur, pieceActive.cubes[0].isCentre),
                        new Cube(pieceActive.cubes[1].x, pieceActive.cubes[1].y, pieceActive.cubes[1].couleur, pieceActive.cubes[1].isCentre),
                        new Cube(pieceActive.cubes[2].x, pieceActive.cubes[2].y, pieceActive.cubes[2].couleur, pieceActive.cubes[2].isCentre),
                        new Cube(pieceActive.cubes[3].x, pieceActive.cubes[3].y, pieceActive.cubes[3].couleur, pieceActive.cubes[3].isCentre)
                    ]
                );

                if (params === "ArrowLeft") {

                    pieceFantome.deplacer(-1);
                    if (this.testerDeplacement(pieceFantome)) {
                        pieceActive.deplacer(-1);
                    }

                }

                else if (params === "ArrowRight") {

                    pieceFantome.deplacer(1);
                    if (this.testerDeplacement(pieceFantome)) {
                        pieceActive.deplacer(1);
                    }


                }

                else if (params === "ArrowUp") {
                    pieceFantome.tourner();
                    if (this.testerDeplacement(pieceFantome)) {
                        pieceActive.tourner();
                    }

                }

                else if (params === "ArrowDown") {
                    pieceFantome.deplacer(0, 1);
                    if (this.testerDeplacement(pieceFantome)) {
                        pieceActive.deplacer(0, 1);
                    }

                    //si on peut pas descendre la piece faut verifier :
                    // la ligne de chaque cube est complete ? 
                    //oui ? supprimer la ligne puis descendre les cubes qui sont au dessus

                    //creer une nouvelle piece                   
                    else {
                        //1 recup les numero Y



                        //TODO y'a mieux a faire FILTER ?

                        let lignesCheck = [];
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



                        for (let index = 0; index < lignesCheck.length; index++) {
                            //enleve les ligne complete
                            this.effacerLigne(lignesCheck[index]);
                            //descend les ligne au dessus des ligne supprimé
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


        this.notifyAllObservers("modif", this.listeCubes);

    }



    /**
     * test si on peut mettre une piece a cet emplacement
     * @param {PieceBase} piece 
     */
    testerDeplacement(piece) {

        for (let i = 0; i < piece.cubes.length; i++) {
            //1 verifie que la piece sorte pas du jeux
            if (piece.cubes[i].x < 0
                || piece.cubes[i].x >= this.nbCubeX
                || piece.cubes[i].y >= this.nbCubeY) {
                return false;
            }


            for (let j = 0; j < this.listeCubes.length - 4; j++) {
                if (this.listeCubes[j].x === piece.cubes[i].x && this.listeCubes[j].y === piece.cubes[i].y) {
                    return false
                }

            }

        }
        return true;
    }

    /**
     * verifie si une ligne est complete
     * @param {number} params le numero de la ligne a verifier
     *
     */
    testerLigneComplete(params) {

        let tLigne = this.listeCubes.filter(cube => cube.y === params);
        if (tLigne.length === this.nbCubeX)
            //ligne complete
            return true;

        else
            //ligne incomplete
            return false

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
        this.compteurLignesSuppr++;
        this.notifyAllObservers("ligne");
    }

    /**
     * descend tout les cube au dessus de la ligne supprimé
     * @param {number} params le numero de la ligne supprimé
     */
    descendreLigne(params) {


        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].y < params) {

                this.listeCubes[index].deplacer(0, 1);
            }

        }
    }

    /**
     * creer une nouvelle piece dans la zone de depart
     * si place deja prise fini la partie
     * @param {*} params 
     */
    creerPiece(params) {

        if (this.pieceSuivante == null) {
            var piece = pieceFactory(Math.floor((this.nbCubeX - 1) / 2), 0);
        }
        else {
            var piece = this.pieceSuivante;
            piece.deplacer(Math.floor((this.nbCubeX - 1) / 2));
        }
        // test si on la place de la nouvelle piece est occupé
        if (this.testerDeplacement(piece)) {

            this.listeCubes.push(piece.cubes[0], piece.cubes[1], piece.cubes[2], piece.cubes[3]);

            this.pieceSuivante = pieceFactory(0, 0);
            this.notifyAllObservers("modif", this.listeCubes);
            this.notifyAllObservers("nvlPiece", this.pieceSuivante.cubes);


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
        this.isPlay = true;

    }
    finirPartie() {

        this.isPlay = false;
        this.notifyAllObservers("fin");

    }
    notifyObserver(observer, param, tableau) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers[index].notify(param, tableau);
        }
    }
    notifyAllObservers(param, tableau) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(param, tableau);
        }

    }

}