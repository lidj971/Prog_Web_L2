/*
JS | Activité 2
*/

class Piece
{
    row;
    col;
    constructor(row,col)
    {
        this.row = row;
        this.col = col;
    }
    
    /**
     * @param {string} position
     */
    constructor(position)
    {
        row = position.charAt(0);
        col = position.charAt(1);
    }

    get row()
    {
        return this.row;
    }

    set row(row)
    {
        this.row = row;
    }

    get line()
    {
        return this.col;
    }

    set line(col)
    {
        this.col = line;
    }
}

class Pawn extends Piece()
{
    constructor(row,col)
    {
        super(row,col);
    }
    
    /**
     * @param {string} position
     */
    constructor(position)
    {
        super(position);
    }

    validMoves()
    {
        moves = [];
    }
}

document.querySelector('#jeu').style.visibility='hidden';

var Roi = new Object();
var j2 = new Object();

var current_player = 1;

j1.ins = false;
j2.ins = false;

var cases = [];
//Rempli le plateau de pions
function init_plateau() {
	var plateau = document.querySelector('#plateau');
	/* Remplir le plateau */
	for (var i = 0; i < 49; i++) {
		/* Remplir le plateau des balises div ayant la class pion -> <div class="pion"></div> */
		let pion = document.createElement("div");
		pion.setAttribute("class","pion");
		pion.setAttribute("id",i);
		pion.setAttribute("onclick","touch(id)");
		plateau.appendChild(pion);
		cases.push(i);
	}
	document.querySelector('#jeu').style.visibility = 'visible';
}
