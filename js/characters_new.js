var characters;
var groups;
var template;

var selectedCharacterButton;
var selectedGroupButton;

function onCharacterClicked(button) {
  if (button == undefined) {
    return;
  }

  let character = characters[button.id];

  // update attribute texts
  Object.entries(character).forEach(attribrute => {
    let attributeKey = attribrute[0]

    let text = document.getElementById(attributeKey + "-text");
    if (text == undefined) {
      return;
    }

    if (template[attributeKey] != undefined) {
      text.innerHTML = "<b>" + template[attributeKey] + "</b>" + attribrute[1];
    }
    else {
      text.innerHTML = attribrute[1];
    }
  });

  // select and unselected old button if there is one
  button.classList.add("active");

  if (selectedCharacterButton != null && selectedCharacterButton != button) {
    selectedCharacterButton.classList.remove("active");
  }
  selectedCharacterButton = button;
}

function createCharacterButtons(selectedGroup, shouldForceClear) {
  let character_list = document.getElementById("character-list");

  if (shouldForceClear) {
    character_list.innerHTML = "";
  }

  Object.entries(characters).forEach(character => {
    if (character[1].is_debug == true) {
      return;
    }
    if (selectedGroup != "All" && character[1].group != selectedGroup) {
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

  // auto select first entry
  onCharacterClicked(character_list.children[0]);
}

function onGroupClicked(group) {
  createCharacterButtons(group.id, true);

  // select and unselected old button if there is one
  group.classList.add("active");

  if (selectedGroupButton != null && selectedGroupButton != group) {
    selectedGroupButton.classList.remove("active");
  }
  selectedGroupButton = group;
}

function onJsonFetched(json) {
  groups = json.groups
  characters = json.characters;
  template = json.template;

  let group_list = document.getElementById("group-list");

  // Create "All" group button
  {
    let button = document.createElement("button");
    button.classList.add("list-group-item");
    button.classList.add("list-group-item-action");
    button.id = "All";
    button.onclick = function () { onGroupClicked(button, false) };

    button.innerHTML = "All";
    group_list.appendChild(button);
  }

  // Create dynamic group buttons
  groups.forEach(group => {
    let button = document.createElement("button");
    button.classList.add("list-group-item");
    button.classList.add("list-group-item-action");
    button.id = group;
    button.onclick = function () { onGroupClicked(button, false) };

    button.innerHTML = group;
    group_list.appendChild(button);
  });

  // auto select first entry
  onGroupClicked(group_list.children[0]);
}

function onWindowLoaded() {
  fetch("https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/characters.json")
    .then((response) => response.json())
    .then((data) => onJsonFetched(data));
}

window.onload = onWindowLoaded;