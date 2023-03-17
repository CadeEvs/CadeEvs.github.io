let fears;

function createFears() {
    const groupsList = document.getElementById("fear-list");

    const template = document.getElementById("fearTemplate").content;

    Object.entries(fears).forEach(fear => {
        if (fear[1].is_debug == true) {
            return;
        }
        
        const newFear = template.cloneNode(true);

        const title = fear[1].description.substring(0, fear[1].description.indexOf("."));
        const description = fear[1].description.substring(fear[1].description.indexOf(".") + 1);
        
        // Elements
        const fearName = newFear.getElementById("fearName");
        fearName.innerHTML = fear[1].name;

        const fearTitle = newFear.getElementById("fearTitle");
        fearTitle.innerHTML = "<i>" + title + "</i>";
        
        const fearDescription = newFear.getElementById("fearDescription");
        fearDescription.innerHTML = description;
        
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