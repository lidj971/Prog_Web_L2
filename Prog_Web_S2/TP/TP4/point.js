/* 
	Act 3
*/

//Variables globales
var point = new Object();
point.life = 100;
point.etat = "";
point.x = 5;
point.y = 30;

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
	document.getElementsByClassName("point")[0].style.left = point.x + "%";
	document.getElementsByClassName("point")[0].style.bottom = point.y + "%";
	/* Changer d'etat class .fire ou .water */
	let fire = document.querySelector("#braze").getBoundingClientRect();
	let pos = document.querySelector(".point").getBoundingClientRect();
	if(pos.x >= fire.x + 70 && pos.x <= fire.x+fire.width-100)
	{
		console.log("fire");
	}
	/* Perdre de la vie */
}

function gravite() {
	// A compléter.. USAGE OBLIGATOIRE DU TRY-CATCH
	/* Garder le point est au sol */
	point.y -= gravity;
	try
	{
		
	}
	catch(err)
	{

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
