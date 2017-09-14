"use strict";

function Scene (data) {
  this.name = "";
  this.name = data.name;
  this.spawnPoint = new Vector2(data.spawnPoint.x, data.spawnPoint.y);

  this.imagePath = data.imagePath;
  this.imageElement = document.createElement("img");
  this.imageElement.src = this.imagePath;
  this.links = new Array();
  for (var index = 0; index < data.links.length; index++) {
    let link = data.links[index];
    this.links.push(new Link(link.position, link.sizes, link.scene));
  }
  this.characters = data.characters;
  this.interactables = data.interactables;
};
