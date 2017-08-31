"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

let Engine = {
  time : null,
  oldTime : null,
  deltaTime : null,
  inputManager : null,

  startGame : false,

  init : function() {
    this.time = new Date().getTime();
  	this.oldTime = this.time;
    this.inputManager = new InputManager();
  },

  update : function(deltaTime) {},

  render : function(deltaTime) {},

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

  onNotify : function(subject, object) {}
};
