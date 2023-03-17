// Json Data
let characters;
let groups;
let templates;

let selectedCharacterButton;

function onCharacterClicked(button) {
    if (button == undefined) {
        return;
    }

    const character = characters[button.id];

    // update attribute texts
    Object.entries(character).forEach(attribrute => {
        const attributeKey = attribrute[0]

        const text = document.getElementById(attributeKey + "-text");
        if (text == undefined) {
            return;
        }

        let attributeText = attribrute[1];

        if (typeof attributeText === "string") {
            attributeText = getContent(attributeText);
        }
        
        if (templates[attributeKey] !== undefined) {
            text.innerHTML = "<b>" + templates[attributeKey] + "</b>" + attributeText;
        }
        else {
            text.innerHTML = attributeText;
        }

        // @TODO: This is needed to initialize the tooltips, find a better way to do this maybe?
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
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
    
    Object.entries(characters).forEach(character => {
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
    
    groups.forEach(group => {
        const newGroup = template.cloneNode(true);
        newGroup.id = group;
        
        const groupNameTag = newGroup.getElementById("groupName");
        groupNameTag.textContent = group;
        
        createCharacterButtons(newGroup);
        
        groupsList.appendChild(newGroup);
    });
    
    selectFirstGroup(groupsList);
}
function onWindowLoaded() {
    requestAllData().then(() => {
        groups = characterData.groups;
        characters = characterData.characters;
        templates = characterData.template;

        createGroups(); 
    });
}

window.addEventListener("load", onWindowLoaded);