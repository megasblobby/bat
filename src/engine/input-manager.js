"use strict";

const LEFT = 65, RIGHT = 68;
const JUMP = 32;
const MOUSE_LEFT_BUTTON = 0;

function getMousePosition (evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	let x = evt.clientX - rect.left - root.scrollLeft;
	let y = evt.clientY - rect.top - root.scrollTop;
	this.mouse.position = new Vector2(x, y);
}

function onMouseDown (evt) {
	if(evt.button == MOUSE_LEFT_BUTTON) {
		console.log("mouse down");
		this.mouse.leftButton = true;
		this.observable.notify("mouse-left-down", this.mouse)
	}
}

function onMouseUp (evt) {
	if(evt.button == MOUSE_LEFT_BUTTON) {
		console.log("mouse up");
		this.mouse.leftButton = false;
	}
}

function keyPressed (evt) {
	//keySet(evt.keyCode, warrior, true);
}

function keyReleased (evt) {
	//keySet(evt.keyCode, warrior, false);
}

function InputManager() {
	this.mouse = new Mouse();
	this.observable = new Observable();

	this.getMousePosition = getMousePosition.bind(this);
	this.onMouseDown = onMouseDown.bind(this);
	this.onMouseUp = onMouseUp.bind(this);
	this.keyPressed = keyPressed.bind(this);
	this.keyReleased = keyReleased.bind(this);

	this.setupCallbacks();
}

InputManager.prototype.setupCallbacks = function () {
	canvas.addEventListener("mousemove", this.getMousePosition);
	canvas.addEventListener("mousedown", this.onMouseDown);
	canvas.addEventListener("mouseup", this.onMouseUp);

	document.addEventListener("keydown", this.keyPressed);
	document.addEventListener("keyup", this.keyReleased);
}

InputManager.prototype.keySet = function (keyCode, value) {
	/*if (keyCode == warrior.leftKey) {
		warrior.isMovingLeft = value;
	}
	else if (keyCode == warrior.rightKey) {
		warrior.isMovingRight = value;
	}
	if (keyCode == warrior.jumpKey) {
		warrior.isJumping = value;
	}*/
}
