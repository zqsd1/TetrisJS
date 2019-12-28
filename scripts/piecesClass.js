

class PieceL {
    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "red") {
        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX, posY + 1, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX, posY + 2, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX + 1, posY + 2, couleur);
    }
}

class PieceInvertL  {
    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "yellow") {
        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX, posY + 1, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX, posY + 2, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX - 1, posY + 2, couleur);
    }
}

class PieceCarre  {

    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "orange") {

        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX + 1, posY, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX, posY + 1, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX + 1, posY + 1, couleur);
    }
}

class PieceI  {
    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "purple") {
        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX, posY + 1, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX, posY + 2, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX, posY + 3, couleur);
    }

}

class PieceS {
    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "green") {
        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY + 1, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX + 1, posY + 1, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX + 1, posY, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX + 2, posY, couleur);
    }

}

class PieceZ  {
    constructor(posX, posY, largeurCubes, hauteurCubes, couleur = "white") {
        this.cubeA = new Cube(largeurCubes, hauteurCubes, posX, posY, couleur);
        this.cubeB = new Cube(largeurCubes, hauteurCubes, posX + 1, posY, couleur);
        this.cubeC = new Cube(largeurCubes, hauteurCubes, posX + 1, posY + 1, couleur);
        this.cubeD = new Cube(largeurCubes, hauteurCubes, posX + 2, posY + 1, couleur);
    }

}


