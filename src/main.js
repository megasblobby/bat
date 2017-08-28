"use strict";

//const MILLISECONDS_TO_SECONDS = 1/1000;

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let currentScenes = [];

let rectX = 650, rectY = 300;
let rectWidth = 100, rectHeight = 100;

/* It must be in global space otherwise after a function call the object cease
   to exist so the async call is not executed when is ready */
let jsonLoader;

let engine;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	/*time = new Date().getTime();
	oldTime = time;*/

	jsonLoader = new JSONLoader();

	engine = Object.create(Engine);
	engine.init();

	setupInput();

	engine.loadAssets();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	//engine.loop();
	/*loadImages();

	startGame();

	gameLoop();*/

}

/*function loadAssets() {
	loadImages();

}*/

/*function startGame() {
	let scene = jsonLoader.load("data/testScene.json");
	console.log(scene);
	currentScenes.push(images[0]);
}*/

function gameLoop() {
	let deltaTime = getDeltaTime();

	update(deltaTime);
	render(deltaTime);

	requestAnimationFrame(gameLoop);
}

function getDeltaTime() {
	time = new Date().getTime();
	let deltaTime = (time - oldTime) * MILLISECONDS_TO_SECONDS;
	oldTime = time;

	return deltaTime;
}

function update(deltaTime) {
	if (mouseLeftButton) {
		if(mouse.x >= rectX && mouse.x <= rectX + rectWidth && mouse.y >= rectY && mouse.y <= rectY + rectHeight) {
			console.log("CHANGE ROOM");
			currentScenes.push(images[1]);
		}
	}
}

function render(deltaTime) {

  drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	for (var i = 0; i < currentScenes.length; i++) {
		drawImage(currentScenes[i].imageElement, 0, 0);
	}

	drawEmptyRect(rectX, rectY, rectWidth, rectHeight, "blue");

}
