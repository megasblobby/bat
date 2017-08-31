"use strict";

//const MILLISECONDS_TO_SECONDS = 1/1000;

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let currentScenes = [];

let rectX = 650, rectY = 300;
let rectWidth = 100, rectHeight = 100;

let engine;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	//engine = Object.create(Engine);
	//engine.init();

	setupInput();

	//engine.loadAssets();

	let sceneLoader = new SceneLoader();
	sceneLoader.load(["data/spaceport.json", "data/spaceport-bathroom.json"])
	sceneLoader.observable.register("scenes-all-loaded", this);

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");
}



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

}

function render(deltaTime) {

  drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	for (var i = 0; i < currentScenes.length; i++) {
		drawImage(currentScenes[i].imageElement, 0, 0);
	}

	drawEmptyRect(rectX, rectY, rectWidth, rectHeight, "blue");

}

function onNotify(subject, object){
	console.log("SCENE PRONTE");
}
