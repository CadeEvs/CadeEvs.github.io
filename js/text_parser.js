function getContent(bodyText) {
    let sentences = bodyText.split(/(\s+)/);
    
    const newContent = [];
    sentences.forEach(sentence => {
        const words = sentence.split(/([^,.]+)/g);
        words.forEach(word => {
            if (characterData.characters.hasOwnProperty(word)) {
                const character = characterData.characters[word];
                
                const shortDescription = character.description.substring(0, character.description.indexOf("."));
                
                newContent.push("<a data-toggle=\"tooltip\" title=\"" + shortDescription + "\"><u>" + character.name + "</u></a>");
            } else if (locationData.locations.hasOwnProperty(word)) {
                const character = locationData.locations[word];

                const shortDescription = character.description.substring(0, character.description.indexOf("."));

                newContent.push("<a data-toggle=\"tooltip\" title=\"" + shortDescription + "\"><u>" + character.name + "</u></a>");
            } else if (fearData.fears.hasOwnProperty(word)) {
                const character = fearData.fears[word];

                const shortDescription = character.description.substring(0, character.description.indexOf("."));

                newContent.push("<a data-toggle=\"tooltip\" title=\"" + shortDescription + "\"><u>" + character.name + "</u></a>");
            }
            else {
                newContent.push(word);
            }
        });
    })
    
    return newContent.join("");
}