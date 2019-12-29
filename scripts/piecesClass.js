


class PieceL {
    constructor(posX, posY, couleur = "red") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX, posY + 1, couleur);
        this.cubeC = new Cube(posX, posY + 2, couleur);
        this.cubeD = new Cube(posX + 1, posY + 2, couleur);
    }
}

class PieceInvertL {
    constructor(posX, posY, couleur = "yellow") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX, posY + 1, couleur);
        this.cubeC = new Cube(posX, posY + 2, couleur);
        this.cubeD = new Cube(posX - 1, posY + 2, couleur);
    }
}

class PieceCarre {

    constructor(posX, posY, couleur = "orange") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX + 1, posY, couleur);
        this.cubeC = new Cube(posX, posY + 1, couleur);
        this.cubeD = new Cube(posX + 1, posY + 1, couleur);
    }
}

class PieceI {
    constructor(posX, posY, couleur = "purple") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX, posY + 1, couleur);
        this.cubeC = new Cube(posX, posY + 2, couleur);
        this.cubeD = new Cube(posX, posY + 3, couleur);
    }

}

class PieceS {
    constructor(posX, posY, couleur = "green") {
        this.cubeA = new Cube(posX, posY + 1, couleur);
        this.cubeB = new Cube(posX + 1, posY + 1, couleur);
        this.cubeC = new Cube(posX + 1, posY, couleur);
        this.cubeD = new Cube(posX + 2, posY, couleur);
    }

}

class PieceZ {
    constructor(posX, posY, couleur = "white") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX + 1, posY, couleur);
        this.cubeC = new Cube(posX + 1, posY + 1, couleur);
        this.cubeD = new Cube(posX + 2, posY + 1, couleur);
    }

}
class PiecePyramide {
    constructor(posX, posY, couleur = "blue") {
        this.cubeA = new Cube(posX, posY, couleur);
        this.cubeB = new Cube(posX - 1, posY, couleur);
        this.cubeC = new Cube(posX + 1, posY, couleur);
        this.cubeD = new Cube(posX, posY + 1, couleur);
    }
}

