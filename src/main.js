"use strict";

//const MILLISECONDS_TO_SECONDS = 1/1000;

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let rectX = 650, rectY = 300;
let rectWidth = 100, rectHeight = 100;

let engine;
let scenes = new Array();
let currentScenes = new Array();

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	engine = Object.create(Engine);
	engine.update = update.bind(this);
	engine.render = render.bind(this);

	engine.init();

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

	for (var index = 0; index < currentScenes.length; index++) {
		drawImage(currentScenes[index].imageElement, 0, 0);
	}

	drawEmptyRect(currentScenes[0].nodes[0].position.x,
								currentScenes[0].nodes[0].position.y,
								currentScenes[0].nodes[0].sizes.x,
								currentScenes[0].nodes[0].sizes.y, "blue");
}

function onNotify(subject, object){
	if (subject === "scenes-all-loaded") {
		scenes = object;
		currentScenes.push(scenes[0]);
		console.log("SCENE PRONTE");
		engine.loop();
	}
}
