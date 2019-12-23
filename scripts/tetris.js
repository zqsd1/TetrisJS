
// /**
//  * descendre toute les ligne du haut    appres suppression
//  * @param {number} params 
//  */
// function replacerCubes(params) {

//     for (let index = 0; index < tableauCubes.length; index++) {
//         if (tableauCubes[index].y < params) {
//             tableauCubes[index].y = tableauCubes[index].y + 1;
//         }

//     }
// }

// /**
//  * fin de partie
//  * pour quand on ne peut pas rajouter la nouvelle piece
//  * @param {*} params 
//  */
// function gameOver(params) {
//     isPlay = false;
//     clearInterval(inter);
//     alert("game over");

// }


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
        this.onModif = new Event("modif")
    }


    /**
     * 
     * @param {string} params 
     */
    deplacerPiece(params) {
       

        var isFree = true;

        //recup la piece active vu que c'est toujours la derniere du tableau
        var pieceActive = this.listeCubes.slice(this.listeCubes.length - 1);
        /*
          if (params === "ArrowLeft") {
              var compare ="x>0";
              var calcul = "x-1";
  
          }
          if (params === "ArrowRight") {
              var compare ="x<nbcubeX-1";
              var calcul = "x+1";
          }
          if (params === "bas") {
              var compare ="y<nbcubeY";
              var calcul = "y+1";
          }
  /*if (pieceActive  compare) {
       for (let j = 0; j < this.listeCubes.length; j++) {
                    
                              if (this.listeCubes[j].x === this.listeCubes[index]calcul
                                  && this.listeCubes[j].y === this.listeCubes[index].calcul) {
                                  isFree = false;
                                  break;
                              }
  
                          }
  
                                  }
                      else
                          isFree = false;
                      if (isFree) {
                         
                          this.listeCubes[index] = this.listeCubes[index]calcul;
                      }
                      break;
  
                  }
  
  }*/

var cubeactiv = false;

        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].isActive) {
                cubeactiv = true;

                var isFree = true;
                if (params === "ArrowLeft") {
                    //pas sur une bord
                    //x>0
                    if (this.listeCubes[index].x > 0) {
                        //pas de piece a coté
                        for (let j = 0; j < this.listeCubes.length; j++) {
                            //x-1
                            if (this.listeCubes[j].x === this.listeCubes[index].x - 1
                                && this.listeCubes[j].y === this.listeCubes[index].y) {
                                isFree = false;
                                break;
                            }

                        }

                    }
                    else
                        isFree = false;
                    if (isFree) {
                        //x-1
                        this.listeCubes[index].x = this.listeCubes[index].x - 1;
                    }
                    break;

                }
                if (params === "ArrowRight") {
                    //x< nbcubeX-1
                    if (this.listeCubes[index].x < this.nbCubeX - 1) {
                        for (let j = 0; j < this.listeCubes.length; j++) {
                            //x+1
                            if (this.listeCubes[j].x === this.listeCubes[index].x + 1
                                && this.listeCubes[j].y === this.listeCubes[index].y) {
                                isFree = false;
                                break;
                            }
                        }
                    }
                    else
                        isFree = false;
                    if (isFree) {
                        //x+1
                        this.listeCubes[index].x = this.listeCubes[index].x + 1;
                    }

                    break;

                }
                if (params === "bas") {
                    //y<nbcubeY-1
                    //peut descendre ?
                    if (this.listeCubes[index].y < this.nbCubeY - 1) {
                        for (let j = 0; j < this.listeCubes.length; j++) {
                            //y+1
                            if (this.listeCubes[j].y === this.listeCubes[index].y + 1
                                && this.listeCubes[j].x === this.listeCubes[index].x) {
                                isFree = false;
                                break;
                            }
                        }
                    }

                    else {
                        isFree = false;
                    }

                    if (isFree) {
                        //y+1
                        this.listeCubes[index].y = this.listeCubes[index].y + 1;
                    }
                    else {
                        this.listeCubes[index].isActive = false;

                        this.verifierLigne(this.listeCubes[index].y);
                        this.creerPiece();
                    }
                    break;

                }
            }

        }
        if (!cubeactiv) {
            this.creerPiece();
        }




        //FIXME  add event POur redessin        pas sur pour le fait que sa soit sur le document
        document.dispatchEvent(this.onModif);




    }

    /**
     * verifie une ligne pour voir si elle est complete
     * @param {number} params le numero de la ligne a verifier
     */
    verifierLigne(params) {

        //lister tout les cube de la ligne 
        var tmp = [];
        this.listeCubes.forEach(cube => {
            if (cube.y === params) {
                tmp.push(cube);
            }
        });

        if (tmp.length === this.nbCubeX) {
            //ligne complete 
            // supprimer ligne
            this.effacerLignes(tmp);
        }
        else {
            //ligne imcomplete rien a faire
        }

    }


    /**
     * effacer les cube de l'array
     * @param {Array} params 
     */
    effacerLignes(params) {

        params.forEach(element => {
            for (let index = 0; index < this.listeCubes.length; index++) {
                if (this.listeCubes[index] === element) {
                    this.listeCubes.splice(index, 1);
                }
            }
        });
        //TODO descendre piece
    }

    creerPiece(params) {
        var fin = false;
        var cube = new Cube(this.largeurCube, this.hauteurCube,/*Math.floor( this.nbCubeX/2)*/4, 0, "red", true);
        // verifier si la place est libre =>non =>fin partie
        for (let index = 0; index < this.listeCubes.length; index++) {
            if (this.listeCubes[index].x === cube.x && this.listeCubes[index].y === cube.y) {
                fin = true;
                break
            }

        }
        if (!fin)
            this.listeCubes.push(cube);

        else
            this.finirPartie();

    }

    /**
     * 
     * @param {*} params 
     */
    debuterPartie(params) {
        //FIXME

        //var tempo = window.setInterval(deplacerPiece, params, "bas");

        this.isPlay = true;

    }
    finirPartie() {

        this.isPlay = false;

    }




}