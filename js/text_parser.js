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
            } else if (locationData.characters.hasOwnProperty(word)) {
                const character = locationData.characters[word];

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