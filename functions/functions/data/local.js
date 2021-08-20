
    exports.getValueStorage = (conv,key) => {
    let value = "";
    let isVerified = (conv.user.verification === 'VERIFIED');
        switch(key){
            case 'difficulty':
                    value = (isVerified)? conv.user.storage.difficulty : conv.data.difficulty;
                break
            case 'marker':
                    value = (isVerified)? conv.user.storage.marker : conv.data.symbol;
                break
            case 'who_starts':
                    value = (isVerified)? conv.user.storage.whoStarts : conv.data.whoStarts;
                break
            case 'match':
                    value = (isVerified)? conv.user.storage.match : conv.data.match;
            break
            case 'players':
                    value = (isVerified)? conv.user.storage.players : conv.data.players;
            break
            default:
            console.log('Erro, we are out of ' + key + '.');   
        }
        return value;
}

exports.setValueStorage = (conv,key,value) => {
    let isVerified = (conv.user.verification === 'VERIFIED');
        switch(key){
            case 'difficulty':
                    value = (isVerified)? conv.user.storage.difficulty = value : conv.data.difficulty = value;
                break
            case 'marker':
                    value = (isVerified)? conv.user.storage.marker = value : conv.data.marker = value;
                break
            case 'who_starts':
                    value = (isVerified)? conv.user.storage.whoStarts = value : conv.data.whoStarts = value;
                break
            case 'match':
                value = (isVerified)? conv.user.storage.match = value : conv.data.match = value;
            break
            case 'players':
                    value = (isVerified)? conv.user.storage.players = value : conv.data.players = value;
                break 
            case 'progress':
                        value = (isVerified)? conv.user.storage.match.progress = value : conv.data.match.progress = value;
            break              
            default:
            console.log('Erro, we are out of ' + key + '.');   
        }
}