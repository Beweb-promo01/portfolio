/*VARIABLES GLOBALES*/
var sections = [];
var container;
var sectionNum = 0;
/*FONCTIONS APPELEES*/


function getSections(){
	sections = container.getElementsByTagName("section");
	
}
function hideAll(){
	for(var i=0;i<sections.length;i++){
		sections[i].setAttribute("class","hide");
	}
}
function show(num){
	hideAll();
	sections[num].setAttribute("class","visible");
	sectionNum = num;
	selectSection();
}

function selectSection(){
	section = document.getElementById("container").getElementsByTagName("section")[sectionNum];
	initScroll();
}

/*CHARGEMENT DE LA PAGE*/
window.onload = function(){	
	container = document.getElementById("container");
	getSections();
	
	show(sectionNum);	
	
	
};
//window.addEventListener("resize",initialization,true);

