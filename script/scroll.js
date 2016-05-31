/*
barre de scroll 

recuperer la hauteur de la section

hauteur du contenu : hauteur de tous les articles + les margin top

pourcentage = hauteur section /(hauteur du contenu - hauteur de la section)

hauteur de la barre de scroll = hauteur section - pourcentage
20px pour les margesbottoms
*/



//Objets de la scrollbar
var section;
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

function initScroll(){
	//section = document.getElementById("container").getElementsByTagName("section")[0];
	viewport = section.getElementsByClassName("viewport")[0];
	//viewport.addEventListener("mousemove",initialization,false);
}

//initialisation
function initialization(){
	
	hViewPort=0;
	hContent=0;
	hScroll=0;
	coefficient=0;	
	//objets de la scrollbar
	
	content = viewport.getElementsByClassName("content")[0];
	scrollbar = viewport.getElementsByClassName("scroll")[0];
	//hauteurs des elements
	hViewPort = viewport.offsetHeight;
	hContent = content.offsetHeight;
	if(hViewPort<hContent){
		//calcul du coefficient (pourcentage de la zone restante a appliquer sur la scrollbar)
		coefficient = hContent/(hContent-hViewPort);
		
		//la scrollbar a une hauteur inverse de ce qu'il reste a afficher
		scrollbar.style.height = parseInt(hViewPort-(hViewPort/coefficient))+"px";
		//hauteur de la scrollbar
		hScroll = scrollbar.offsetHeight; 
/*Listeners pour les declenchements*/
		//listeners pour le drag de la glissière
		scrollbar.addEventListener("mousedown",init,false);
		scrollbar.addEventListener("mouseup",clear,false);	
		//listeners pour le drag sur le content
		
		//listeners pour le wheelscroll
/*listeners pour l'activation d scroll*/	
		viewport.addEventListener("mousemove",function(){scrollbar.style.borderColor = "rgba(128,128,128,1)";},false);	
		viewport.addEventListener("mouseout",function(){scrollbar.style.borderColor = "rgba(128,128,128,0)";},false);

	}else{
		scrollbar.style.borderColor = "rgba(128,128,128,0)";
	}

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
	content.style.top = -(newOffset*coefficient)+"px";
}
/*
	executée quand on relache le bouton sur la souris :
	on arrete d'executer la fonction qui deplace les elements
*/
function clear(){
	scrollbar.removeEventListener('mousemove',mousePos,false);
}


function init2(){
	initValues();
	initObjects();
	setValues();
	if(isScrollable()){
		
	}
}

function initValues(){
	hViewPort=0;
	hContent=0;
	hScroll=0;
	coefficient=0;
}
function setValues(){
	hViewPort = viewport.offsetHeight;
	hContent = content.offsetHeight;
	
}
function initObjects(){
	viewport = section.getElementsByClassName("viewport")[0];
	content = viewport.getElementsByClassName("content")[0];
	scrollbar = viewport.getElementsByClassName("scroll")[0];	
}

function isScrollable(){
	var flag = false;
	if(hViewPort<hContent){
		flag = true
	}
	return flag;
}
function scrollShow(){
	//affichage de la scroll
	scrollbar.style.borderColor = "rgba(128,128,128,1)";
	//declenchement de l'evenement
}
function scrollHide(){
	//cache la scroll
	scrollbar.style.borderColor = "rgba(128,128,128,0)";
	//clear les evenements
}

