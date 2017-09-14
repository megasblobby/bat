"use strict";

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let engine;
let scenes = new Map();
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

	let sceneLoader = new SceneLoader();
	sceneLoader.load(["data/spaceport.json", "data/spaceport-bathroom.json"])
	sceneLoader.observable.register("scenes-all-loaded", this);

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");
}

function update(deltaTime) {
	if (engine.inputManager.mouseLeftButton) {
		console.log("sblobby");
	}
}

function render(deltaTime) {

  drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	for (var index = 0; index < currentScenes.length; index++) {
		drawImage(currentScenes[index].imageElement, 0, 0);
	}

	drawEmptyRect(currentScenes[0].links[0].position.x,
								currentScenes[0].links[0].position.y,
								currentScenes[0].links[0].sizes.x,
								currentScenes[0].links[0].sizes.y, "blue");
}

function onNotify(subject, object){
	if (subject === "scenes-all-loaded") {
		for (let scene of object) {
			scenes.set(scene.name, scene);
			for (let link of scene.links) {
				engine.inputManager.observable.register("mouse-left-down", link);
				link.observable.register("change-scene", this);
				}
		}
		currentScenes.push(scenes.values().next().value);
		engine.loop();
	}

	if (subject === "change-scene") {
		currentScenes.push(scenes.get(object));
	}
}
