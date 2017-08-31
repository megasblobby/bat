"use strict";

function countLoadedImages() {
	this.imagesToLoad--;

	if (this.imagesToLoad == 0) {
		this.observable.notify("images-all-loaded");
	}
};

function ImageLoader()
{
	this.images = new Array();
  this.imagesToLoad = 0;
  this.loadImages = null;
  this.observable = new Observable();
	this.countLoadedImages = countLoadedImages.bind(this);
};


ImageLoader.prototype.load = function (filePaths) {
	this.imagesToLoad = filePaths.length;

	for (var index = 0; index < filePaths.length; index++) {
		let image = document.createElement("img");
		image.src = filePaths[index];
		image.onload = this.countLoadedImages;

		this.images.push(image);
	}
};

function setOnLoadEvent (element, path) {
	element.onload = this.countLoadedImages;
	element.src = path;
};


function ImagesLoader() {
	this.images = new Array();
	this.imagesToLoad = 0;
	this.observable = new Observable();
	this.loadImages = loadImages.bind(this);
	this.setOnLoadEvent = setOnLoadEvent.bind(this);
	this.countLoadedImages = countLoadedImages.bind(this);
};
