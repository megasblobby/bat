const DONE = 200;

let parsed = null;

function loadJSON(filePath, success, error)
{
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function()
  {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          parsed = success(xhr.responseText);
    } else {
      if (error)
        error(xhr);
      }
    }
  };
  xhr.open("GET", filePath, true);
  xhr.send(null);

  return parsed;
}


 function success(responseText) {
  parsed = JSON.parse(responseText);
  return parsed;
};

function error(responseText) {
  //JSON.parse(xhr.responseText);
  console.log("NON E' POSSIBILE CARICARE IL FILE");
};
