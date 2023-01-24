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
			//console.log(current_player);
			pions[i].className = "pion playing j" + current_player;
			found = true;

			let consec = 0;
			let maxConsec = 0; 

			//line
			let lineStart = i - col;
			for(let j = lineStart;j < lineStart + 7;j++)
			{
				if(pions[j].className == "pion playing j" + current_player)
				{
					consec++;
					if(consec > maxConsec)
					{
						maxConsec = consec;
					}
				}else
				{
					consec = 0;
				}
			}

			//col
			for(let j = col;j <= col + 42;j += 7)
			{
				if(pions[j].className == "pion playing j" + current_player)
				{
					consec++;
					if(consec > maxConsec)
					{
						maxConsec = consec;
					}
				}else
				{
					consec = 0;
				}
			}

			//diag right-left
			let distance = (8 * (i - lineStart));
			if(distance > lineStart)
			{
				distance = lineStart;
				distance += Math.abs((i-lineStart) - i)/7;
			}
			let diagStart = i - distance;
			distance = (42 - lineStart) +((i + (42 - lineStart)) - i)/7;
			let lineEnd = lineStart + 6;
			if(i + distance > 48)
			{
				distance = lineEnd - i + (lineEnd - i) * 7;
			}
			let diagEnd = i + distance;
			for(let j = diagStart;j <= diagEnd;j++)
			{
				if(pions[j].className == "pion playing j" + current_player)
				{
					consec++;
					if(consec > maxConsec)
					{
						maxConsec = consec;
					}
				}else
				{
					consec = 0;
				}
				j += 7;
			}
			
			//diag left-right
			distance = lineEnd - i - (lineEnd - i) * 7;
			if(i + distance < 0)
			{
				distance = -lineStart + lineStart / 7;
			}
			diagStart = i + distance;

			distance = lineStart - i - (lineStart - i) * 7;
			if(i + distance > 48)
			{
				distance = 42 - lineStart - (42 - lineStart)/7;
			}
			diagEnd = i + distance;
			for(let j = diagStart;j <= diagEnd;j--)
			{
				if(pions[j].className == "pion playing j" + current_player)
				{
					consec++;
					if(consec > maxConsec)
					{
						maxConsec = consec;
					}
				}else
				{
					consec = 0;
				}
				j += 7;
			}

			if(maxConsec >= 4)
			{
				console.log("Win");
			}
		}
		i -= 7;
	}

	if(current_player == 1)
	{
		current_player = 2;
		var name = document.getElementById("j2-name").textContent;
		document.getElementById("player-name").textContent = name;
		//j1.logo.classList.toggle("fas");
		//j1.logo.classList.toggle("far");
	}else
	{
		current_player = 1;
		var name = document.getElementById("j1-name").textContent;
		document.getElementById("player-name").textContent = name;
		//j2.logo.classList.toggle("fas");
		//j2.logo.classList.toggle("far");
	}
}