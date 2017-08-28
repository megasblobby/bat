"use strict";

function Scene (data) {
  this.name = data.name;
  this.spawnPoint = new Vector2(data.spawnPoint.x, data.spawnPoint.y);

  this.imagePath = data.imagePath;
  this.imageElement = document.createElement("img");
  this.imageElement.src = this.imagePath;
  this.nodes = new Array();
  this.characters = new Array();
  this.interactables = new Array();
};
