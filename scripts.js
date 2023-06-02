// --------------------- //
// ---- MEMORY GAME ---- //
// - DATE : 05/01/2021 - //
// ----- Antoine OHACO ---- //
// - IUT MMI 2020/2021 - //
// ---- Version N°1 ---- //
// --------------------- //

// 1- Créez les premières variables du jeu

var cardTemp = {};
var score = 0;
var clics = 0;
var time = 0;
var cards = ["tarte","quiche","flan"];
var maxScore = cards.length;

// 2 - Créez la première fonction du jeu "makeCards"

function makeCards(cards) {
	var doubleCard = cards;
	cards.forEach(function(card, i){
		doubleCard.push(card);
	});
	var newArray = shuffle(cards);
	var html = "";
	newArray.forEach((card, i)=>{
		html = html + `<li class='card col-sm-3'>
					<div class='content'>
					<h2 id='${i}'>${card}</h2>
					</div>
				</li>`;
	})
	$("#cards").html(html);
}

// 3 - On appelle la fonction qui génère la création des cartes dans la page HTML

$(function(){

    makeCards(cards);
	var result = "";

// 4 - Création du timer du jeu

var timer = setInterval(function(){
	time+=1;
	$("#time").text(time);
	if(score >= maxScore){
		clearInterval(timer);
		$("#score").text("Vous avez gagné en "+time+" secondes en "+clics+" clics");
	} 
},1000);

// 5 - Créer un écouteur d'événement + 6 - Créer les structures conditionnelles

	$(".card").click(function(){
		var card = $(this);
		var h2 = card.find("h2");
		h2.fadeIn();
		// Second turn
		if(!isEmpty(cardTemp)){
			if(h2.text() === cardTemp.name){
				goodGuess(card, h2);
			} else{
				wrongGuess(card, h2);
			}
		} else{
			// First turn
			cardTemp.id = h2.attr("id");
			cardTemp.name = h2.text();
		}	
		clics= clics+1;
		$("#clics").text(clics);
	});
})

function goodGuess(card, h2){
	$(`#${h2.attr("id")}`).unbind("click");
	$(`#${cardTemp.id}`).unbind("click");
	cardTemp = {};
	score = score+1;
}
function wrongGuess(card, h2){
	$(`#${h2.attr("id")}`).fadeOut();
	$(`#${cardTemp.id}`).fadeOut();
	cardTemp = {};
}
function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

// 7 - Fonction shuffle() qui prend en paramètre un tableau, le mélange puis le retourne

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}