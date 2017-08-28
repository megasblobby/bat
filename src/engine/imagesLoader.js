"use strict";

function loadImages () {
	this.images = [
								 {name : "scene1",
								 path : "media/images/placeholder-spaceport.png",
								 imageElement: document.createElement("img")},
								 {name : "scene2",
								 path : "media/images/placeholder-spaceport-bathroom.png",
								 imageElement: document.createElement("img")}
							  ];

	this.imagesToLoad = this.images.length;

	for (let i = 0; i < this.images.length; i++) {
			this.setOnLoadEvent(this.images[i].imageElement, this.images[i].path);
	}
};

function setOnLoadEvent (element, path) {
	element.onload = this.countLoadedImages;
	element.src = path;
};

function countLoadedImages () {
	this.imagesToLoad--;

	if (this.imagesToLoad == 0) {
		this.observable.notify("images-loaded");
	}
};

function ImagesLoader() {
	this.images = new Array();
	this.imagesToLoad = 0;
	this.observable = new Observable();
	this.loadImages = loadImages.bind(this);
	this.setOnLoadEvent = setOnLoadEvent.bind(this);
	this.countLoadedImages = countLoadedImages.bind(this);
};
