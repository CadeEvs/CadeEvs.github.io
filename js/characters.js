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
        // find element from character key value
        const attributeKey = attribrute[0]
        const text = document.getElementById(attributeKey + "-text");
        if (text == undefined) {
            return;
        }

        // if the value of the character key is a string, grab the value as a text
        let attributeText = attribrute[1];
        if (typeof attributeText === "string") {
            attributeText = getContent(attributeText);
        }
        
        // if the value text is empty, hide the element
        if (attributeText === "") {
            text.style.display = "none";
        }
        else {
            text.style.display = "block";
        }
        
        // if the character key matches a template, prefix the text with the template text, if not just display the text
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
    
    const findingsListElement = document.getElementById("findingsList");

    // check to see if there are any findings and display them if there are
    if (findingsListElement !== undefined) {
        // make sure to clear children first
        findingsListElement.replaceChildren();
        
        sessionData.sessions.forEach(session => {
            session.findings.forEach(finding => {
                // if the finding id matches the character id, add it
                if (finding.id === button.id)
                {
                    const p2 = document.createElement('p');
                    p2.innerHTML = "<b>" + session.date + "</b> - " + finding.description;

                    findingsListElement.appendChild(p2);
                }
            });
        });
    }
    
    // select and unselected old button if there is one
    button.classList.add("active");

    if (selectedCharacterButton != null && selectedCharacterButton !== button) {
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