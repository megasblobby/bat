"use strict";

const DONE = 200;

function onReadyStateChange()
{
  if (this.xhr.readyState === XMLHttpRequest.DONE) {
    if (this.xhr.status === DONE) {
        this.parsed = this.xhr.response;
        this.observable.notify("scene-loaded", this.parsed);
  } else {
      console.log("ERROR: It's not possible to load file: " + this.filePath);
      console.log(this.xhr.statusText);
    }
  }
};

function JSONLoader () {
  this.parsed = null;
  this.filePath = "";
  this.observable = new Observable();
}

JSONLoader.prototype.load = function (filePath) {
  this.xhr = new XMLHttpRequest();
  this.xhr.responseType = "json";
  this.onReadyStateChange = onReadyStateChange.bind(this);
  this.xhr.onreadystatechange = this.onReadyStateChange;

  // Store path to display it in error messages
  this.filePath = filePath;

  this.xhr.open("GET", filePath, true);
  this.xhr.send();

  return this.parsed;
};
