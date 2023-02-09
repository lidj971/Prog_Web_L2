/* 
	Act 3
*/

//Variables globales
var point = new Object();
point.life = 200;
point.etat = "";
point.x = 5;
point.y = 30;
point.obj = document.querySelector(".point");
point.rect = point.obj.getBoundingClientRect();

var ground;
var groundLevel;
var vitesse = 1;
var gravity = 1;

var fire = new Object();
fire.rect;
var water = new Object();
water.obj = document.querySelector("#lake");
water.rect;

var inWater = false;




/* Initialiser la position du point */
checkPosition();

var g=setInterval("gravite()",40);
var j = null;
//Fonctions
function move(evt) {
	switch (evt.keyCode){
		case 113:
			// A compléter..
			/* Déplacer le point */
			if(point.x > 0)
			{
				if(inWater)
				{
					if(point.x > 70)
					{
						point.x -= vitesse;
					}else
					{
						point.x = point.x;
					}
				}else
				{
					point.x -= vitesse;
				}
			}
			/* Mettre à jour la position du point */
			checkPosition();
			break;
		case 100:
			// A compléter..
			/* Déplacer le point */
			if(point.x < 100-vitesse)
			{
				point.x += vitesse;
			}
			/* Mettre à jour la position du point */
			checkPosition();
			break;
		case 32:
			if(j == null && point.y == groundLevel)
			{
				j = setInterval("jump()",5);
			}
			
	}

}

var w = null;
var f = null;
var regen = setInterval(regenLife,500);

function checkPosition() {
	// A compléter..
	/* Verifier la position */
	point.obj.style.left = point.x + "%";
	point.obj.style.bottom = point.y + "%";
	/* Changer d'etat class .fire ou .water */
	//let fire = document.querySelector("#braze").getBoundingClientRect();
	//let water = document.querySelector("#lake").getBoundingClientRect();
	point.rect = point.obj.getBoundingClientRect();
	fire.rect = document.querySelector("#braze").getBoundingClientRect();
	water.rect = document.querySelector("#lake").getBoundingClientRect();
	if(point.rect.right >= fire.rect.left + 110 && point.rect.right <= fire.rect.right - 70 && point.y < 43)
	{
		point.obj.className = "point fire";
		if(f == null)
		{
			f=setInterval(loseLife,500);
		}
		groundLevel = 30;
		inWater = false;
		clearInterval(w);
		w = null;
	}else if(point.rect.left >= water.rect.left)
	{
		groundLevel = 10;
		if(point.y < 30)
		{
			inWater = true;
			point.obj.className = "point water";
			if(w == null)
			{
				w=setInterval(loseLife,1000);
			}
		}else
		{
			inWater = false;
			point.obj.className = "point";
			clearInterval(w);
			w = null;
		}
		clearInterval(f);
		f = null;
	}
	else
	{
		point.obj.className = "point";
		groundLevel = 30;
		inWater = false;
		clearInterval(w);
		clearInterval(f);
		w = null;
		f = null;
	}
	/* Perdre de la vie */
	checkLife();
}

function gravite() {
	// A compléter.. USAGE OBLIGATOIRE DU TRY-CATCH
	/* Garder le point est au sol */
	if(point.y > groundLevel)
	{
		point.y -= gravity;
	}
	
	checkPosition();
}


function loseLife() {
	if(point.life > 0)
	{
		point.life -= 10;
	}
	checkLife();
}

function regenLife() {
	if(point.life < 195 && point.obj.className == "point")
	{
		point.life += 10;
	}
}

function checkLife()
{
	var lifeBar = document.getElementById("life-stat");
	lifeBar.style.width = point.life + "px";

	if(point.life < 170)
	{
		lifeBar.style.backgroundColor = "orange";
	}else
	{
		lifeBar.style.backgroundColor = "green";
	}
}

function printJSON() {
	console.log(point);
}

/* ALLER PLUS LOIN */
function jump() {
	// A compléter..
	/* Faire un saut de 100 px */
	if(point.y < groundLevel + 30)
	{
		point.y += 1;
	}else
	{
		clearInterval(j);
		j = null;
	}
}

window.focus();
