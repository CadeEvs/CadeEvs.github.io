function initialize(json) {
  console.log("Initializing...");

  Object.entries(json.characters).forEach(character => {
    console.log(character[1].name)
  });
}

fetch("https://raw.githubusercontent.com/CadeEvs/CadeEvs.github.io/main/data/characters.json")
  .then((response) => response.json())
  .then((data) => initialize(data));