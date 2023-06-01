let months;
let events;

function onWindowLoaded() {
    requestCalendarData().then((json) => {
        months = json.months;
        events = json.events;
    });
}

window.addEventListener("load", onWindowLoaded);