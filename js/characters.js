var characters;

function onCharacterClicked(button) {
  let name_text = document.getElementById("name-text");
  let race_text = document.getElementById("race-text");
  let age_text = document.getElementById("age-text");
  let status_text = document.getElementById("status-text");
  let description_text = document.getElementById("description-text");

  let character = characters[button.id];

  name_text.innerHTML = character.name;
  race_text.innerHTML = "Race: " + character.race;
  age_text.innerHTML = "Age: " + character.age;
  status_text.innerHTML = "Status: " + character.status;
  description_text.innerHTML = character.description;
}

function onJsonFetched(json) {
  characters = json;
  console.log("Initializing...");

  let character_list = document.getElementById("character-list");

  character_list.innerHTML = "";

  Object.entries(json).forEach(character => {
    let button = document.createElement("button");
    button.classList.add("list-group-item");
    button.classList.add("list-group-item-action");
    button.id = character[0];
    button.onclick = function() {onCharacterClicked(button)};

    button.innerHTML = character[1].name;
    character_list.appendChild(button);
  });
  
  onCharacterClicked(character_list.children[0]);
}

function onWindowLoaded() {
  fetch("https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/characters.json")
  .then((response) => response.json())
  .then((data) => onJsonFetched(data.characters));
}

window.onload = onWindowLoaded;