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
var oldDelta = 0;

/*
	recupere le viewport de la section et place l'ecouteur dessus afin de declencher le scroll
*/
function initScroll(){
	initObjects();
	initValues();
	
	viewport.addEventListener("mousemove",initialization,false);
}
/*
	prepare et verifie si le scroll est ok
*/
function initialization(){
	//initValues();
	setHeights();
	if(isScrollable()){
		scrollOffsetMax = hContent-hViewPort; // 
		content.style.cursor = "-webkit-grab";
		viewport.removeEventListener("mousemove",initialization,false);
		content.addEventListener("mousedown",scrolling,false);
		content.addEventListener("mouseup",clear,false);
	}else{
		viewport.removeEventListener("mousemove",initialization,false);
		initScroll();
		
	}
}
/*
	mise a zero des valeurs
*/
function initValues(){
	hViewPort=0;
	hContent=0;
	hScroll=0;
	coefficient=0;
	content.style.top = 0;
}
/*
	affecte les hauteurs 
*/
function setHeights(){
	hViewPort = viewport.offsetHeight;
	hContent = content.offsetHeight;
	
}
/*
	verification de la scrollabilité
*/
function isScrollable(){
	var flag = false;
	if(hViewPort<hContent){
		flag = true
	}
	return flag;
}
/*
	initialisation des objets pour le scroll
*/
function initObjects(){
	viewport = section.getElementsByClassName("viewport")[0];
	content = viewport.getElementsByClassName("content")[0];
	scrollbar = viewport.getElementsByClassName("scroll")[0];	
}
/*
	fonction du scroll
*/
function scrolling(evt){
	content.style.cursor = "-webkit-grabbing";
	//recuperation de la position de la souris
	mouseY = evt.clientY;
	content.addEventListener('mousemove',mousePos,false);
	
}
/*
	tant que l'on deplace la souris et que le bouton est enfoncé
	on effetcue le déplacement
*/

function mousePos(evt){	
	content.style.cursor = "-webkit-grabbing";
	//le delta permet de connaitre la valeur et la direction du deplacement
	var delta = evt.clientY-mouseY;
	//on calcule la nouvelle position de la glissière
	var newOffset = scrollOffsetMin+delta;
	//on teste si on est en butée
	if(content.offsetTop>0){
		content.style.top=0;
		clear();
	}else if(content.offsetTop<-scrollOffsetMax){
		content.style.top = -scrollOffsetMax+"px";
		clear();
		
	}else{
		content.style.top = (oldDelta+delta)+"px";		
	}
	
}
/*
	executée quand on relache le bouton sur la souris :
	on arrete d'executer la fonction qui deplace les elements
*/
function clear(){
	oldDelta = content.offsetTop;
	content.removeEventListener('mousemove',mousePos,false);
	viewport.addEventListener("mousemove",initialization,false);
}