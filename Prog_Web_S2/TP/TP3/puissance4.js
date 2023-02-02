/*
JS | Activité 2
*/

document.querySelector('#jeu').style.visibility='hidden';

var j1 = new Object();
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


//Fontion d'inscription
function ins(player) {

	// Completer pour vérifier l'inscription
	if (player==1) {
		j1.ins = true;
		var x = document.getElementsByName('j1');
		x = x[0];
		/* Mettre le nom du joueur dans la balise #j1-name */
		document.getElementById("j1-name").textContent = x.value;
		x.disabled = true;
	}
	else{
		j2.ins = true;
		var x = document.getElementsByName('j2');
		x = x[0];
		/* Mettre le nom du joueur dans la balise #j2-name */
		document.getElementById("j2-name").textContent = x.value;
	}

	if (j1.ins && j2.ins) {

		// Retirer le panneau d'inscription
		var ins = document.getElementById('ins');
		/* retirer la balise div #ins du html */
		document.body.removeChild(ins);
		//Initialise le plateau
		init_plateau();

		//lien avec les logo
		j1.logo = document.querySelector('.fas.fa-user.j1');
		j2.logo = document.querySelector('.fas.fa-user.j2');

		//Instruction de jeu
		/* Mettre le nom du joueur dans la balise player-name */
		var name = document.getElementById("j1-name").textContent;
		document.getElementById("player-name").textContent = name;
		//ne joue pas pour le moment
		j2.logo.classList.toggle("fas");
		j2.logo.classList.toggle("far");
	}
}



function checkLine(i,col,pions)
{
	let maxConsec = [];
	let consec = [];
	let start = i - col;
	for(let j = start;j < start + 7;j++)
	{
		if(pions[j].className == "pion playing j" + current_player)
		{
			consec.push(j);
			if(consec.length > maxConsec.length)
			{
				maxConsec = consec;
			}
		}else
		{
			consec = [];
		}
	}

	return maxConsec;
}

function checkCol(i,col,pions)
{
	let maxConsec = [];
	let consec = [];
	for(let j = col;j <= col + 42;j+=7)
	{
		if(pions[j].className == "pion playing j" + current_player)
		{
			consec.push(j);
			if(consec.length > maxConsec.length)
			{
				maxConsec = consec;
			}
		}else
		{
			consec = [];
		}
	}

	return maxConsec;
}

function checkRightLeftDiag(i,col,pions)
{
	let maxConsec = [];
	let consec = [];
	let lineStart = i - col
	let lineEnd = lineStart + 6;
	let distance = -6 * lineEnd + 6 * i;
	if(i + distance < 0)
	{
		distance = -6 * lineStart/ 7;
	}
	start = i + distance;

	distance = -6 * lineStart + 6 * i;
	if(i + distance > 48)
	{
		distance = 42 + (-6*lineStart - 42) /7;
	}
	end = i + distance;
	for(let j = start;j <= end;j+=6)
	{
		if(pions[j].className == "pion playing j" + current_player)
		{
			consec.push(j);
			if(consec.length > maxConsec.length)
			{
				maxConsec = consec;
			}
		}else
		{
			consec = [];
		}
	}
	return maxConsec;
}

function checkLeftRightDiag(i,col,pions)
{
	let maxConsec = [];
	let consec = [];
	let lineStart = i - col
	let lineEnd = lineStart + 6;
	let distance = (8 * (i - lineStart));
	if(distance > lineStart)
	{
		distance = lineStart;
		distance += Math.abs((i-lineStart) - i)/7;
	}
	start = i - distance;

	distance = 42 + (-6 * lineEnd + 42)/7;
	if(i + distance > 48)
	{
		distance = (8*lineEnd)/7 - (8 / 7)*i;
	}
	end = i + distance;
	for(let j = start;j <= end;j+=8)
	{
		if(pions[j].className == "pion playing j" + current_player)
		{
			consec.push(j);
			if(consec.length > maxConsec.length)
			{
				maxConsec = consec;
			}
		}else
		{
			consec = [];
		}
	}
	return maxConsec;
}

function touch(id){
	var pions = document.querySelectorAll('.pion');
	var col = id % 7;
	console.log(id);
	/* Completer... */
	if(pions[col].className != "pion")
	{
		return;
	}
	let i = 42 + col;
	let found = false;
	while(!found)
	{
		if(pions[i].className == "pion")
		{
			pions[i].className = "pion playing j" + current_player;
			found = true;
			let pionsGagnants = [];

			if(checkCol(i,col,pions).length >= 4)
			{
				pionsGagnants = pionsGagnants.concat(checkCol(i,col,pions));
			}

			if(checkLine(i,col,pions).length >= 4)
			{
				pionsGagnants = pionsGagnants.concat(checkLine(i,col,pions));
			}

			if(checkLeftRightDiag(i,col,pions).length >= 4)
			{
				pionsGagnants = pionsGagnants.concat(checkLeftRightDiag(i,col,pions));
			}

			if(checkRightLeftDiag(i,col,pions).length >= 4)
			{
				pionsGagnants = pionsGagnants.concat(checkRightLeftDiag(i,col,pions));
			}

			if(pionsGagnants.length > 0)
			{
				win(pions,pionsGagnants);
				return;
			}
		}
		i -= 7;
	}

	if(current_player == 1)
	{
		current_player = 2;
		var name = document.getElementById("j2-name").textContent;
		document.getElementById("player-name").textContent = name;
	}else
	{
		current_player = 1;
		var name = document.getElementById("j1-name").textContent;
		document.getElementById("player-name").textContent = name;
	}

	j1.logo.classList.toggle("fas");
	j1.logo.classList.toggle("far");
	j2.logo.classList.toggle("fas");
	j2.logo.classList.toggle("far");
}

function win(pions,pionsGagnants)
{
	pions.forEach(pion => {pion.setAttribute("onclick","");
	});
	let nameId = "j" + current_player + "-name";
	let name = document.getElementById(nameId).textContent;
	document.getElementById("info").innerHTML = name + " wins the game <br> Reload to restart";
	document.getElementById("plateau").style.width = "400px";
	document.getElementById("plateau").style.height = "420px";
	for(let i of pionsGagnants)
	{
		document.getElementById(i).classList.add("win");
	}
}