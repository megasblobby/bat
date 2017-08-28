"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

let Engine = {
  time : null,
  oldTime : null,
  deltaTime : null,
  imagesLoader : null,
  jsonLoader : null,
  scenes : null,
  currentScenes : null,

  imagesLoaded : false,
  startGame : false,

  init : function() {
    this.time = new Date().getTime();
  	this.oldTime = this.time;

    this.imagesLoader = new ImagesLoader();
    this.imagesLoader.observable.register("images-loaded", this);

    this.jsonLoader = new JSONLoader();
    this.jsonLoader.observable.register("scene-loaded", this);

    this.scenes = new Array();
    this.currentScenes = new Array();
  },

  loadAssets : function() {
    this.imagesLoader.loadImages();
  },

  loadScenes : function() {
    this.jsonLoader.load("data/testScene.json");
  },

  update : function(deltaTime) {
    console.log("update");
  },
  render : function(deltaTime) {
    console.log("render");
    console.log(currentScenes);
    drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

  	for (var i = 0; i < this.currentScenes.length; i++) {
  		drawImage(this.currentScenes[i].imageElement, 0, 0);
  	}

  	drawEmptyRect(650, 300, 100, 100, "blue");
  },

  computeDeltaTime : function() {
    this.time = new Date().getTime();
  	this.deltaTime = (this.time - this.oldTime) * MILLISECONDS_TO_SECONDS;
  	this.oldTime = this.time;
  },

  loop : function() {
    this.computeDeltaTime();

    this.update(this.deltaTime);
    this.render(this.deltaTime);

    requestAnimationFrame(this.loop.bind(this));
  },

  onNotify : function(subject, object) {
    if (subject === "images-loaded") {
      this.imagesLoaded = true;
      this.loadScenes();
      this.loop();
    }
    if (subject === "scene-loaded") {
      this.scenes.push(new Scene(object));
      this.currentScenes.push(this.scenes[this.scenes.length - 1]);
    }
  }
};
