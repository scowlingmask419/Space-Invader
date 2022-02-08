"use strict";

////// VARIABLES ////////////////////////
var x = 300; //abscisse vaisseau      //  
var y = 580; // ordonnée vaisseau    //	  
var y_ennemie = 0   				//   
var rectangle = 400;               //   
var projectiles = [];             //   
var ennemies = [];				 //
var cpt = 0   	         		//   
/////////////////////////////////


window.onload = function() {
	window.setInterval(vaguesEnnemies, 300);
	window.setInterval(tireVaisseauEtApparitionEnnemies, 50);
};

function randint() { 
  var min = Math.ceil(0);
  var max = Math.floor(580);
  return Math.floor(Math.random() * (max - min +1)) + min;
};

function tireVaisseauEtApparitionEnnemies () {
	var img = document.getElementById('vaisseau'); 
	var canvas = document.getElementById('game_area');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 600, 600);
	ctx.stroke();
	ctx.drawImage(img, x, y, 30, 20);
	for (var p=0; p < projectiles.length; p++) {
		projectiles[p][1] -= 10// projectiles[p][2];
		ctx.fillStyle = "white";
		ctx.fillRect(projectiles[p][0],projectiles[p][1],4,10);
		ctx.stroke();
		if (projectiles[p][1] == 0) {
			projectiles.splice(p,1)
		}
	}
	vaguesEnnemies();
}
	

function vaguesEnnemies () {
	var img = document.getElementById('enemie');
	var canvas = document.getElementById('game_area');
	var ctx = canvas.getContext('2d');
	var explode = document.getElementById('explosion');
	
	if (cpt == 300) {
		clear(img);
	}
	if (ennemies.length < 100 ) {
		ennemies.push([(randint()), y_ennemie, 30, 20]);
	}
	for (var i=0; i < ennemies.length; i++) {
		ctx.drawImage(img, ennemies[i][0], ennemies[i][1], ennemies[i][2], ennemies[i][3]);
		var deplacement_x = randint();
		if ((ennemies[i][0] == 0) || (deplacement_x % 2 == 0)) {
			ennemies[i][0] += 1
		};
		if ((ennemies[i][0] == 570) || (deplacement_x % 2 != 0)) {
			ennemies[i][0] -= 1
		};
		ennemies[i][1] += 1;
		if (ennemies[i][1] == 580) {
				ennemies.splice(i,1);
		}
		for (var p=0; p < projectiles.length; p++) {
			if ( ( (projectiles[p][0] <= (ennemies[i][0]+20)) && (projectiles[p][0] >=  (ennemies[i][0]-20)) ) && ( (projectiles[p][1] <= (ennemies[i][1]+20) ) && (projectiles[p][1] >= (ennemies[i][1]-20)) ) ) {                                                         //
				ctx.drawImage(explode, ennemies[i][0], ennemies[i][1], 30, 20)
				ennemies.splice(i,1);
				projectiles.splice(p,1);
				cpt += 1;
			}
		}
	}
}		

window.onkeydown = function (evenement) {
	var touche = evenement.keyCode;
	if (touche == 37) { // Flèche gauche
		x -= 4
	}
	if (touche == 39) { // Flèche droite
		x += 4
	}
	if (touche == 40) {
		y += 4
	} 
	if (touche == 38) {
		y -= 4
	}
	// Vérification déplacement latéraux
	if (x < 0) { // Sortie à gauche
		x = 0
	}
	if (x > 570) { // Sortie à droite
		x = 570
	}
	if (y < 0) { // Sortie en haut
		y = 0
	}
	if (y > 580) { // Sortie en bas
		y = 580
	}
	// Action du vaisseau
	if (touche == 32) {
		projectiles.push([x+13,y-10,10])
	}
}
