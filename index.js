let board = document.getElementById("Board");
let context = board.getContext("2d");

board.width = 1000;
board.height = 600;

// Clicker
clickerImg = document.getElementById("apple");

// shop items
items = [
{
	item: 1,
	img: document.getElementById("item1"),
	x: 10,
	y: 10,
	price: 10,
	give: 1
},
{
	item: 2,
	img: document.getElementById("item2"),
	x: 10,
	y: 70,
	price: 100,
	give: 10
},
{
	item: 3,
	img: document.getElementById("item3"),
	x: 10,
	y: 130,
	price: 1000,
	give: 100
}]

// sounds
chomp = document.getElementById("chomp");
buy = document.getElementById("collect");


score = {
	value: 0,
	x: 500,
	y: 100,
	cpc: 1
}

function createText(font,color,value,x,y,cpc){
	context.fillStyle = color;
	context.font = font;
	context.fillText(value,x,y);
	context.fillText("Cpc: "+cpc,x-100,y+80)
}

function clear(){
	context.clearRect(0,0,board.width,board.height);
}

function resetScreen(){
	clear()
	// main
	createText("80px Arial","black",score.value,score.x,score.y,score.cpc);
	context.drawImage(clickerImg,500,300,100,100);
	
	// shop
	items.forEach(drawItem);
}

function drawItem(item, i, array) {
	context.drawImage(item.img, item.x, item.y, 100, 50);
}



board.addEventListener('click', function(event){
	mouse = {
		x: event.offsetX,
		y: event.offsetY
	}
	clicker = {
	x: 500,
	y: 300,
	width: 100,
	height: 100
	}
	
	if(mouse.x > clicker.x && mouse.x < clicker.x + clicker.width){
		if(mouse.y > clicker.y && mouse.y < clicker.y + clicker.height){
			score.value+=score.cpc;
			chomp.play();
			resetScreen();
		}
	}
	
	items.forEach(buyShopItem);
	

})

function buyShopItem(item, i, items){
	if(mouse.x > item.x && mouse.x < item.x + 100){
		if(mouse.y > item.y && mouse.y < item.y + 50){
			
			if (score.value >= item.price) {
				score.cpc+=item.give;
				score.value-=item.price;
				buy.play();
				resetScreen();
			}
			
		}
	}
}

window.onload = function() {
	clear();
	resetScreen();
}