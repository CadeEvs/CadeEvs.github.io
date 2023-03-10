var fears;
var template;

var oldClickedButton;

function onCharacterClicked(button) {
  let fear = fears[button.id];

  Object.entries(fear).forEach(attribrute => {
    let attributeKey = attribrute[0]

    let text = document.getElementById(attributeKey + "-text");
    
    if (template[attributeKey] != undefined) {
      text.innerHTML = "<b>" + template[attributeKey] + "</b>" + attribrute[1];
    }
    else {
      text.innerHTML = attribrute[1];
    }
    
  });

  // select and unselected old button if there is one
  button.classList.add("active");

  if (oldClickedButton != null && oldClickedButton != button) {
    oldClickedButton.classList.remove("active");
  }
  oldClickedButton = button;
}

function onJsonFetched(json) {
  fears = json.characters;
  template = json.template;
  console.log("Initializing...");

  let character_list = document.getElementById("character-list");

  character_list.innerHTML = "";

  Object.entries(fears).forEach(character => {
    if (character[1].is_debug == true) {
      return;
    }

    let button = document.createElement("button");
    button.classList.add("list-group-item");
    button.classList.add("list-group-item-action");
    button.id = character[0];
    button.onclick = function () { onCharacterClicked(button) };

    button.innerHTML = character[1].name;
    character_list.appendChild(button);
  });

  onCharacterClicked(character_list.children[0]);
}

function onWindowLoaded() {
  fetch("https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/fears.json")
    .then((response) => response.json())
    .then((data) => onJsonFetched(data));
}

window.onload = onWindowLoaded;