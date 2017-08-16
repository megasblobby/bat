"use strict";

//let sceneSprite = document.createElement("img");

let images = [];
let imagesToLoad;

function countLoadedImagesAndLaunchIfReady() {
	imagesToLoad--;

	if (imagesToLoad == 0) {
		startGame();
	}
}

function setOnLoadEvent(element, path) {
	element.onload = countLoadedImagesAndLaunchIfReady;
	element.src = path;
}

function loadImages() {
	images = [{name : "scene1", path : "media/images/placeholder-spaceport.png", imageElement: document.createElement("img")}, {name : "scene2", path : "media/images/placeholder-spaceport-bathroom.png", imageElement: document.createElement("img")}/*,
			{tileType : FLOOR, path : "media/floor.png", hasTransparency : false},
		 	{tileType : WALL, path : "media/wall.png", hasTransparency : false},
			{tileType : TREASURE, path : "media/treasure.png", hasTransparency : true},
			{tileType : KEYS, path : "media/key.png", hasTransparency : true},
			{tileType : DOOR, path : "media/door.png", hasTransparency : true}*/];

	imagesToLoad = images.length;

	for (let i = 0; i < images.length; i++) {
			setOnLoadEvent(images[i].imageElement, images[i].path);
	}
}

function setCallBacks(tileType, path, hasTransparency) {
	tileSprites[tileType] = document.createElement("img");
	tileSprites[tileType].hasTransparency = hasTransparency;
	setOnLoadEvent(tileSprites[tileType], path);
}
