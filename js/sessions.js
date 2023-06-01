

function addFindingsForEntry(contentId) {
    const findingsListElement = document.getElementById("findingsList");

    // check to see if there are any findings and display them if there are
    if (findingsListElement !== undefined) {
        // make sure to clear children first
        findingsListElement.replaceChildren();

        sessionData.sessions.forEach(session => {
            session.findings.forEach(finding => {
                // if the finding id matches the character id, add it
                if (finding.id === contentId)
                {
                    const p2 = document.createElement('p');
                    p2.innerHTML = "<b>" + session.date + "</b> - " + finding.description;

                    findingsListElement.appendChild(p2);
                }
            });
        });
    }
}