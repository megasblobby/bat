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
	engine.update = update.bind(engine);
	engine.render = render.bind(engine);

	engine.init();

	let sceneLoader = new SceneLoader();
	sceneLoader.load(["data/spaceport.json", "data/spaceport-bathroom.json", "data/spaceport-bathroom-agent.json"])
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
		if (index === currentScenes.length - 1) {
			drawColoredRect(0, 0,
										WIDTH,	HEIGHT, "#000000B0");
		}
		drawImage(currentScenes[index].imageElement,
							currentScenes[index].spawnPoint);
	}

	for(let link of currentScenes[currentScenes.length - 1].links) {
		drawEmptyRect(link.position.x,link.position.y,
									link.sizes.x,	link.sizes.y, "blue");
	}
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
		let scene = object;
		if (scene === "__pop__") {
			currentScenes.pop();
		}
		else {
			currentScenes.push(scenes.get(object));
		}
	}
}
