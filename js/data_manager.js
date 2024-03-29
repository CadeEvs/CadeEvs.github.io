const characterDataUrl = "https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/characters.json";
const fearDataUrl = "https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/fears.json";
const locationDataUrl = "https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/locations.json";
const calendarDataUrl = "https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/calendar.json";
const sessionDataUrl = "https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/sessions.json";

let fearData;
let locationData;
let characterData;

let sessionData;

let calendarData;

async function requestData(dataName, dataUrl) {
    let data;
    
    // Check to see if fear data has been loaded into local storage, if not fetch it
    if (sessionStorage.hasOwnProperty(dataName)) {
        data = JSON.parse(sessionStorage.getItem(dataName));
    } else {
        const ms = Date.now();
        
        await fetch(dataUrl+"?dummy="+ms, { cache: "no-store" })
            .then((response) => response.json())
            .then((fetchedData) => {
                sessionStorage.setItem(dataName, JSON.stringify(fetchedData));
                data = fetchedData;
            });
    }
    
    return data;
}

async function requestFearData() {
    if (fearData === undefined) {
        await requestData("fearData", fearDataUrl)
            .then((response) => {
                fearData = response;
            });
    }
    return fearData;
}
async function requestLocationData() {
    if (locationData === undefined) {
        await requestData("locationData", locationDataUrl)
            .then((response) => {
                locationData = response;
            });
    }
    return locationData;
}
async function requestCharacterData() {
    if (characterData === undefined) {
        await requestData("characterData", characterDataUrl)
            .then((response) => {
                characterData = response;
            });
    }
    return characterData;
}
async function requestCalendarData() {
    if (calendarData === undefined) {
        await requestData("calendarData", calendarDataUrl)
            .then((response) => {
                calendarData = response;
            });
    }
    return calendarData;
}
async function requestSessionData() {
    if (sessionData === undefined) {
        await requestData("sessionData", sessionDataUrl)
            .then((response) => {
                sessionData = response;
            });
    }
    return sessionData;
}

async function requestAllData() {
    await requestCharacterData();
    await requestLocationData();
    await requestFearData();
    await requestSessionData();
}