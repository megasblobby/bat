"use strict";

const DONE = 200;

function onReadyStateChange()
{
  if (this.xhr.readyState === XMLHttpRequest.DONE) {
    if (this.xhr.status === DONE) {
        this.success();
  } else {
      this.error(this.xhr);
    }
  }
};

function JSONLoader () {
  this.xhr = new XMLHttpRequest();
  this.xhr.responseType = "json";
  this.onReadyStateChange = onReadyStateChange.bind(this);
  this.xhr.onreadystatechange = this.onReadyStateChange;

  this.parsed = null;
}

JSONLoader.prototype.load = function (filePath) {
  this.xhr.open("GET", filePath, true);
  this.xhr.send(null);

  return this.parsed;
};

JSONLoader.prototype.success = function () {
  console.log(this.xhr.response);
  this.parsed = this.xhr.response;
};

JSONLoader.prototype.success.error = function () {
  console.log("NON E' POSSIBILE CARICARE IL FILE");
};
