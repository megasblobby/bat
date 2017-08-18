"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

let Engine = {
  time : null,
  oldTime : null,
  deltaTime : null,

  init : function() {
    this.time = new Date().getTime();
  	this.oldTime = this.time;
  },

  update : function(deltaTime) {
    console.log("update");
  },
  render : function(deltaTime) {
    console.log("render");
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
  }
};
