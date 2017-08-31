"use strict";

function Node (position, sizes, scene) {
  this.position = new Vector2(position.x, position.y);
  this.sizes = new Vector2(sizes.x, sizes.y);
  this.scene = scene;
};
