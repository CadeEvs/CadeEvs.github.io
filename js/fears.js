let fears;

function createFears() {
    const groupsList = document.getElementById("fear-list");

    const template = document.getElementById("fearTemplate").content;

    Object.entries(fears).forEach(fear => {
        if (fear[1].is_debug == true) {
            return;
        }
        
        const newFear = template.cloneNode(true);

        const fearName = newFear.getElementById("fearName");
        fearName.innerHTML = fear[1].name;

        const fearDescription = newFear.getElementById("fearDescription");
        fearDescription.innerHTML = fear[1].description;
        
        groupsList.appendChild(newFear);
    });
}

function onWindowLoaded() {
    requestFearData().then((json) => {
        fears = json.fears;
        
        createFears()
    });
}

window.addEventListener("load", onWindowLoaded);