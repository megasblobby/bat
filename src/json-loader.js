"use strict";

const DONE = 200;

function onReadyStateChange()
{
  if (this.xhr.readyState === XMLHttpRequest.DONE) {
    if (this.xhr.status === DONE) {
        //this.success();
        this.parsed = this.xhr.response;
  } else {
      this.error(this.xhr);
    }
  }
};

function JSONLoader () {
  this.parsed = null;
}

JSONLoader.prototype.load = function (filePath) {
  this.xhr = new XMLHttpRequest();
  this.xhr.responseType = "json";
  this.onReadyStateChange = onReadyStateChange.bind(this);
  this.xhr.onreadystatechange = this.onReadyStateChange;

  this.xhr.open("GET", filePath, true);
  this.xhr.send();

  return this.parsed;
};

JSONLoader.prototype.success = function () {
  console.log(this.xhr.response);
  this.parsed = this.xhr.response;
};

JSONLoader.prototype.success.error = function () {
  console.log("NON E' POSSIBILE CARICARE IL FILE");
};
