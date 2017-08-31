"use strict";

function SceneLoader()
{
  this.jsonLoader = new JSONLoader();
  this.jsonLoader.observable.register("scene-loaded", this);
  this.imageLoader = new ImageLoader();
  this.imageLoader.observable.register("images-all-loaded", this);
  this.scenes = new Array();
  this.imagesPaths = new Array();
  this.images = new Array();
  this.scenesToLoad = 0;
  this.loadScenes = null;
  this.observable = new Observable();
};


SceneLoader.prototype.load = function (filePaths) {
  this.scenesToLoad = filePaths.length;
  this.loadScenes = loadScenes(filePaths, this.jsonLoader);
  this.loadScenes.next();
};

function *loadScenes(filePaths, jsonLoader) {
  for (let index = 0; index < filePaths.length; index++) {
    yield jsonLoader.load(filePaths[index]);
  }
};

SceneLoader.prototype.onNotify = function (subject, object) {
  if (subject == "scene-loaded") {
    this.scenes.push(new Scene(object));
    this.loadScenes.next();
    this.scenesToLoad--;

    this.imagesPaths.push(object.imagePath);

    if (this.scenesToLoad == 0) {
      this.loadImages(this.imagesPaths);
    }
  }
  if (subject == "images-all-loaded") {
    this.images = object;
    this.observable.notify("scenes-all-loaded", this.scenes);
  }
};

SceneLoader.prototype.loadImages = function (imagesPaths) {
    this.imageLoader.load(imagesPaths);
};
