var second = 0;

setInterval(function () {
  second++;
  document.getElementById("timer").innerHTML = second;
  if (second == 60) {
    second = 0;
  }
}, 1000);
const toggleInput = document.getElementById("background");
toggleInput.addEventListener("change", function () {
  document.body.classList.toggle("body");
  document.querySelector("#c1").classList.toggle("llarge");
  var dropdownElements = document.getElementsByClassName("dropdown");
  for (var i = 0; i < dropdownElements.length; i++) {
    dropdownElements[i].classList.toggle("dropdown-change");
  }
  var tableRowElements = document.getElementsByClassName("table-row");
  for (var j = 0; j < tableRowElements.length; j++) {
    tableRowElements[j].classList.toggle("table-row-change");
  }
});
