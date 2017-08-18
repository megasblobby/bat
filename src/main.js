"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let currentScenes = [];

let rectX = 650, rectY = 300;
let rectWidth = 100, rectHeight = 100;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	time = new Date().getTime();
	oldTime = time;

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	setupInput();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	loadImages();

	startGame();

	gameLoop();
}

function startGame() {
	let scene = loadJSON("data/testScene.json", success, error);
	console.log(scene);
	/*let scene = new Scene();
	scene.name = "testScene";
	scene.spawnPoint = new Vector2(0, 0);
	scene.imagePath = images[0].path;
	scene.nodes.push("otherScene");
	scene.interactables.push("Computer");
	scene.characters.push("Sblobby");

	let jsonScene =  JSON.stringify(scene);
	console.log(jsonScene);*/

	currentScenes.push(images[0]);
}

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
