// Json Data
let characterData;
let groupData;
let templateData;

let selectedCharacterButton;

function onCharacterClicked(button) {
    if (button == undefined) {
        return;
    }

    const character = characterData[button.id];

    // update attribute texts
    Object.entries(character).forEach(attribrute => {
        const attributeKey = attribrute[0]

        const text = document.getElementById(attributeKey + "-text");
        if (text == undefined) {
            return;
        }

        if (templateData[attributeKey] !== undefined) {
            text.innerHTML = "<b>" + templateData[attributeKey] + "</b>" + attribrute[1];
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

function selectFirstGroup(groupsList) {
    const firstGroup = groupsList.children[0];
    const characterList = firstGroup.getRootNode().getElementById("characterList");
    
    onCharacterClicked(characterList.children[0]);
}

function createCharacterButtons(group) {
    let characterList = group.getElementById("characterList");
    
    Object.entries(characterData).forEach(character => {
        if (character[1].is_debug == true) {
            return;
        }
        if (group.id !== character[1].group) {
            return;
        }
        
        let button = document.createElement("button");
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
        button.id = character[0];
        button.onclick = function () { onCharacterClicked(button) };

        button.innerHTML = character[1].name;
        characterList.appendChild(button);
    });
}

function createGroups() {
    const groupsList = document.getElementById("groupsList");
    
    const template = document.getElementById("groupTemplate").content;
    
    groupData.forEach(group => {
        const newGroup = template.cloneNode(true);
        newGroup.id = group;
        
        const groupNameTag = newGroup.getElementById("groupName");
        groupNameTag.textContent = group;
        
        createCharacterButtons(newGroup);
        
        groupsList.appendChild(newGroup);
    });
    
    selectFirstGroup(groupsList);
}

function onJsonFetched(json) {
    groupData = json.groups;
    characterData = json.characters;
    templateData = json.template;

    createGroups();
}

function onWindowLoaded() {
    fetch("https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/characters.json")
        .then((response) => response.json())
        .then((data) => onJsonFetched(data));
}

window.onload = onWindowLoaded;