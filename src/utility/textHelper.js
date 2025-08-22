function shortenText(statementString, maxCharacters = 18) {

    if (statementString) {

        const splitStatement = statementString.split('');
        
        if (splitStatement.length > maxCharacters) {
            const shortenedSplitStatement = splitStatement.slice(0, maxCharacters);
            const shortenedStatement = shortenedSplitStatement.join('');
            const shortenedStatementAndDots = shortenedStatement + '...';
            
            return shortenedStatementAndDots;
        }
        
        return statementString;
        
    } else return;
}

function shortenArray(statementArray, property = 'name', maxCharacters = 20) {

    if (statementArray) {

        let concattedStatementArray = [];
        
        for (let i = 0; i < statementArray.length; i++) {
                // hvis du skriver statementArray[i].property, så leder den efter en property i den faktiske data, der hedder property og tager den værdi
            // hvis du skriver statementArray[i][property], så bruger den din variabel-værdi, som du her har sat som parameter.
            // brug derfor statementArray[i][property] i dette tilfælde
            concattedStatementArray = concattedStatementArray.concat(statementArray[i][property]);
        }
        
        const statementsAsString = concattedStatementArray.join(', ');
        const shortenedStatementAsString = shortenText(statementsAsString, maxCharacters);
        
        return shortenedStatementAsString;

    } else return;
}

export {
    shortenText,
    shortenArray,
}