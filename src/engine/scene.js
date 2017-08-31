"use strict";

function Scene (data) {
  this.name = "";
  this.name = data.name;
  this.spawnPoint = new Vector2(data.spawnPoint.x, data.spawnPoint.y);

  this.imagePath = data.imagePath;
  this.imageElement = document.createElement("img");
  this.imageElement.src = this.imagePath;
  this.nodes = data.nodes;
  this.characters = data.characters;
  this.interactables = data.interactables;
};
