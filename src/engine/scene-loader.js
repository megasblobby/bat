"use strict";

function SceneLoader()
{
  this.jsonLoader = new JSONLoader();
  this.jsonLoader.observable.register("scene-loaded", this);
  this.scenesToLoad = 0;
  this.scenes = new Array();
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
    this.scenes.push(this.loadScenes.next());
    this.scenesToLoad--;

    if (this.scenesToLoad == 0) {
      this.observable.notify("scenes-all-loaded", this.scenes);
    }
  }
};
