function onThemeSwitchClicked() {
    const themeSwitch = document.getElementById("themeSwitch");
    
    if (themeSwitch.checked === false) {
        document.documentElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem('isDarkTheme', "false");
    }
    else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem('isDarkTheme', "true");
    }
}

function onWindowLoaded() {
    if (localStorage && localStorage.getItem("isDarkTheme")) {
        var isDarkTheme = (localStorage.getItem('isDarkTheme'));

        if (isDarkTheme === "false") {
            document.documentElement.setAttribute("data-bs-theme", "light");
        }
        else {
            document.documentElement.setAttribute("data-bs-theme", "dark");

            const themeSwitch = document.getElementById("themeSwitch");
            themeSwitch.checked = true;
        }

    }
}

window.addEventListener("load", onWindowLoaded);