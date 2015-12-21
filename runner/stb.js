// Manage the result filtering
var filter = function (type) {
  var inputs = document.getElementsByClassName('result-display-filter');
  // Ignore if no results yet:
  if (!inputs) return;

  for (i in inputs) {
    if (inputs[i].value === type) {
      inputs[i].click();
    }
  }
};

var selected = 0;

var nav = function (action) {
  console.log(action);

  var results = document.querySelector("div.results table tbody").children;

  if (action === "OK") {
    var testUrl = results[selected].querySelector("td a").href;
    runner.test_window.location.href = testUrl;
  } else if (action === "PLAY") {
    var testUrl = results[selected].querySelector("td a").href;
    location.href = testUrl;
  } else if (action === "UP" || action === "DOWN") {
    results[selected].style.backgroundColor = "";
    if (action === "UP") {
      selected = (selected <= 0) ? 0 : selected - 1;
    } else if (action === "DOWN") {
      selected = (selected >= results.length - 1) ? results.length - 1 : selected + 1;
    }
    results[selected].style.backgroundColor = '#ddd';
    window.scrollTo(0, window.pageYOffset + results[selected].getBoundingClientRect().top - 400);

  } else {
    if (action === "P+") window.scrollTo(0, window.pageYOffset - 200);
    if (action === "P-") window.scrollTo(0, window.pageYOffset + 200);
  }

}

var select = function (x) {

}

//Add button handling
document.addEventListener("keyup", function (e) {
  //console.log("up: " + e.keyCode)
  switch (e.keyCode) {

  case 403:
    filter("FAIL");
    break; //Red
  case 404:
    filter("PASS");
    break; //Green
  case 405:
    filter("TIMEOUT");
    break; //Yellow
  case 406:
    filter("ERROR");
    break; //Blue

  case 32: //Space
  case 19:
    test_control.start_button.click();
    break; //Pause

  case 13:
    nav("OK");
    break; //Down
  case 38:
    nav("UP");
    break; //Up
  case 40:
    nav("DOWN");
    break; //Down
  case 427:
    nav("P+");
    break; //P up
  case 428:
    nav("P-");
    break; //P Down
  case 415:
    nav("PLAY");
    break; //PLAY


  }
}, false);

//Autostart tests
setTimeout(function () {
  //Deep link into test set
  var pathEl = document.getElementById('path');
  var hash = location.hash.substr(1);
  console.log(pathEl.value + " " + hash);
  if (hash)
    pathEl.value = hash;

  test_control.start_button.click();
}, 1000);
