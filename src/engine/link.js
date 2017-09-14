"use strict";

function Link (position, sizes, scene) {
  this.position = new Vector2(position.x, position.y);
  this.sizes = new Vector2(sizes.x, sizes.y);
  this.scene = scene;
  this.observable = new Observable();
  //this.onNotify = onNotify.bind(this);
};

Link.prototype.isInside = function (position) {
  if (position.x >=  this.position.x &&
      position.x <= this.position.x + this.sizes.x &&
      position.y >=  this.position.y &&
      position.y <= this.position.y + this.sizes.y) {
        return true;
    }
    return false;
};

Link.prototype.onNotify = function(subject, object) {
  if (subject === "mouse-left-down") {
    let cursorPosition = object.position;
    if (this.isInside(cursorPosition)) {
      console.log("change scene to: " + this.scene);
      this.observable.notify("change-scene", this.scene);
    }
  }
};
