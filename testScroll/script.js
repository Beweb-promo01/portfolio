//Objets de la scrollbar
var viewport;
var content;
var scrollbar;
//hauteurs pour les calculs
var hViewPort=0;
var hContent=0;
var hScroll=0;
var coefficient=0;
//positions des objets durant les evenements
var mouseY=0;
var scrollOffsetMin=0;
var scrollOffsetMax=0;
var contentOffset=0;

//initialisation
function initialization(){
	//objets de la scrollbar
	viewport = document.getElementById("viewPort");
	content = document.getElementById("content");
	scrollbar = document.getElementById("scroll");
	//hauteurs des elements
	hViewPort = viewport.offsetHeight;
	hContent = content.offsetHeight;
	//calcul du coefficient (pourcentage de la zone restante a appliquer sur la scrollbar)
	coefficient = hContent/(hContent-hViewPort);
	//la scrollbar a une hauteur inverse de ce qu'il reste a afficher
	scrollbar.style.height = (hViewPort-(hViewPort/coefficient))+"px";
	//hauteur de la scrollbar
	hScroll = scrollbar.offsetHeight; 
/*Listeners pour les declenchements*/
	//listeners pour le drag de la glissière
	scrollbar.addEventListener("mousedown",init,false);
	scrollbar.addEventListener("mouseup",clear,true);	
	//listeners pour le drag sur le content
	
	//listeners pour le wheelscroll
	
}
/*
	On initialise les positions afin de gerer les evenements,
	On place l'ecouteur sur le deplacement de la souris que quand le bouton est enfoncé
	c'est pourquoi cette fonction n'est appelée que sur le mousedown

*/
function init(evt){
	//recuperation de la position de la souris
	mouseY = evt.clientY;
	//limites superieure et inferieure des elements qui bougent
	scrollOffsetMin = scrollbar.offsetTop;
	scrollOffsetMax = viewport.offsetHeight-scrollbar.offsetHeight;
	//content ne se positionne que par rapport au deplacement de la glissière (donc pas de min et max)	
	contentOffset = content.offsetHeight;
	//si on bouge la souris quand le bouton est enfoncé	
	scrollbar.addEventListener('mousemove',mousePos,false);
		
}

/*
	tant que l'on deplace la souris et que le bouton est enfoncé
	on effetcue le déplacement
*/
function mousePos(evt){	
	//le delta permet de connaitre la valeur et la direction du deplacement
	var delta = evt.clientY-mouseY;
	//on calcule la nouvelle position de la glissière
	var newOffset = scrollOffsetMin+delta;
	//on teste si on est en butée
	if(newOffset<0){
		newOffset=0;
	}else if(newOffset>scrollOffsetMax){
		newOffset = scrollOffsetMax;
	}
	//dans tout les cas on applique le decallage :
	//sur la glissière
	scrollbar.style.top = newOffset+"px"; 
	//sur le content
	document.getElementById("content").style.top = -(newOffset*coefficient)+"px";
}
/*
	executée quand on relache le bouton sur la souris :
	on arrete d'executer la fonction qui deplace les elements
*/
function clear(){
	scrollbar.removeEventListener('mousemove',mousePos,false);
}

window.onload = function(){
	initialization();
};