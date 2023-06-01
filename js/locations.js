var locations;
var template;

var oldClickedButton;

function onCharacterClicked(button) {
    let location = locations[button.id];

    Object.entries(location).forEach(attribrute => {
        let attributeKey = attribrute[0]

        let text = document.getElementById(attributeKey + "-text");

        if (template[attributeKey] != undefined) {
            text.innerHTML = "<b>" + template[attributeKey] + "</b>" + attribrute[1];
        } else {
            text.innerHTML = attribrute[1];
        }

    });

    // check to see if there are any findings and display them if there are
    addFindingsForEntry(button.id)
    
    // select and unselected old button if there is one
    button.classList.add("active");

    if (oldClickedButton != null && oldClickedButton != button) {
        oldClickedButton.classList.remove("active");
    }
    oldClickedButton = button;
}

function onJsonFetched(json) {
    locations = json.locations;
    template = json.template;
    console.log("Initializing locations...");

    let character_list = document.getElementById("character-list");

    character_list.innerHTML = "";

    Object.entries(locations).forEach(character => {
        if (character[1].is_debug == true) {
            return;
        }

        let button = document.createElement("button");
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
        button.id = character[0];
        button.onclick = function () {
            onCharacterClicked(button)
        };

        const title = character[1].poi.substring(0, character[1].poi.indexOf("."));
        
        button.innerHTML = "<div class=\"ms-2 me-auto\"><div class=\"fw-bold\">" + character[1].name + "</div>" + title + "</div>";
        character_list.appendChild(button);
    });

    onCharacterClicked(character_list.children[0]);
}

function onWindowLoaded() {
    requestSessionData();
    requestLocationData().then((json) => {
        onJsonFetched(json);
    });
}

window.addEventListener("load", onWindowLoaded);