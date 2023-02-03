/* 
	Act 3
*/

//Variables globales
var point = new Object();
point.life = 100;
point.etat = "";
point.x = 5;
point.y = 30;
point.obj = document.querySelector(".point");
point.pos = point.obj.getBoundingClientRect();


var groundLevel = document.querySelector("#ground").getBoundingClientRect().y;
var vitesse = 1;
var gravity = 1;
// A compléter..
/* Initialiser la position du point */

//Fonctions
function move(evt) {
	console.log(evt.key);
	switch (evt.keyCode){
		case 113:
			console.log('left');
			// A compléter..
			/* Déplacer le point */
			point.x -= vitesse;
			/* Mettre à jour la position du point */
			checkPosition();
			break;
		case 100:
			console.log('right');
			// A compléter..
			/* Déplacer le point */
			point.x += vitesse;
			/* Mettre à jour la position du point */
			checkPosition();
			break;
	}

}

function checkPosition() {
	// A compléter..
	/* Verifier la position */
	point.obj.style.left = point.x + "%";
	point.obj.style.bottom = point.y + "%";
	/* Changer d'etat class .fire ou .water */
	let fire = document.querySelector("#braze").getBoundingClientRect();
	let water = document.querySelector("#lake").getBoundingClientRect();
	if((point.pos.x >= fire.x + 70 && point.pos.x <= fire.x+fire.width-100) && (point.pos.x <= fire.y))
	{
		point.obj.className = "point fire";
	}
	else if(point.pos.x >= water.x && point.pos.x <= water.x+water.width)
	{
		point.obj.className = "point water";
		groundLevel = water.y - water.height;
	}else
	{
		point.obj.className = "point";
	}
	/* Perdre de la vie */
}

function gravite() {
	// A compléter.. USAGE OBLIGATOIRE DU TRY-CATCH
	/* Garder le point est au sol */
	let ground = document.querySelector("#ground").getBoundingClientRect();

	
	try {
		if(point.pos.y > ground.x)
		{
			point.y -= gravity;
		}
	} catch (error) {
		
	}
	checkPosition();
}
//var t=setInterval("gravite()",500);

function loseLife() {
	// A compléter..
	/* Perdre de la vie toute les 0.5s dans le feux */
	/* Perdre de la vie toute les 1s dans l'eau */
}

function printJSON() {
	console.log(point);
}

/* ALLER PLUS LOIN */
function jump(argument) {
	// A compléter..
	/* Faire un saut de 100 px */
}

window.focus();
