const storage = require('../data/local');
const utils = require('../helpers/utils');
const matchHelper = require('../helpers/match.helper');
const {context} = require('../helpers/contexts');


const {HtmlResponse} = require('actions-on-google');


function startMatch(conv){
    let announce = speech.get('NEW_MATCH');
    conv.ask(announce);
    let prompt = speech.get('PROMPT_YOUR_TURN');
    conv.ask(prompt);
    //utils.setPlayer(conv);
    let panel = matchHelper.getPanelInformations(conv);

    matchHelper.resetBoard(conv);

    if(storage.getValueStorage(conv,'who_starts') === 'you'){
        conv.contexts.delete(context.MATCH_PROGRESS);
        storage.setValueStorage(conv,'progress',false);
        utils.runCommandPanel(conv,"start",prompt,panel);
    }else{
        storage.setValueStorage(conv,'progress',true);
        conv.contexts.set(context.MATCH_PROGRESS, 20);
        let play = matchHelper.runPlay(conv,0,true)
        utils.runCommandPanel(conv,"mark_position_ia",prompt,panel,play);
    }   
}

function continuetMatch(conv){
    // storage.setValueStorage(conv,'progress',true);
    // conv.contexts.set(context.MATCH_PROGRESS, 20);
    let prompt = speech.get('PROMPT_YOUR_TURN');
    conv.ask(prompt);

    let panel = matchHelper.getPanelInformations(conv);

    utils.runCommandPanel(conv,"continue",prompt,panel);
}

function markPosition(conv, {position}){
    let indexPosition = position - 1;
    let prompt = 'OK';//TODO: colocar txt locales
    conv.ask(prompt);
    
    let play = matchHelper.runPlay(conv,indexPosition,false);
      
    if(play.isValid){
        storage.setValueStorage(conv,'progress',true);
        conv.contexts.set(context.MATCH_PROGRESS, 20);

        if(play.matchType === "single"){
            utils.runCommandBoard(conv,"mark_double_position",prompt,play);
        }else{
            utils.runCommandBoard(conv,"mark_position",prompt,play);
        }
    }else{
        console.log("jogada invalida");        
        //TODO: tratar play não valid
    } 
}


function announce(conv, {announced}){
    let lastPlay = storage.getValueStorage(conv,'match').lastPlay;
    let prompt = "";
    let promptTTS =""; 
    
    switch(announced){
        case 'your_turn':
            prompt = speech.get('PROMPT_YOUR_TURN');
            promptTTS = prompt;
            conv.ask(promptTTS);
            utils.runCommandPanel(conv,"SHOW_MESSAGE",prompt);
            break;
        case 'others_turn':
            prompt = speech.get('PROMPT_OTHERS_TURN_IA');
            promptTTS =`<speak>${prompt}<mark name="OPPONENTS_TURN"/></speak>`;
            conv.ask(promptTTS);
            utils.runCommandPanel(conv,"SHOW_MESSAGE",prompt);     
            break;
        case 'end_match':
            storage.setValueStorage(conv,'progress',false);
            conv.contexts.delete(context.MATCH_PROGRESS);

            conv.contexts.delete

            if(lastPlay.isWinner){
                if(lastPlay.hMarker.toUpperCase() === lastPlay.lastToPlay){
                    promptTTS = speech.get('ANNOUNCE_CHAMPION_YOU');
                }else{
                    promptTTS = speech.get('ANNOUNCE_CHAMPION_OTHERS');
                }
                prompt = speech.get('ANNOUNCE_MATCH_WINNER');
            }else{
                prompt = speech.get('ANNOUNCE_MATCH_TIED');
                promptTTS = prompt;
            }

            conv.ask(promptTTS);
            utils.runCommandPanel(conv,"end_match",prompt);
            break;
        default:
            console.log('default announce')
            // TODO: falback default              
    }
}

const intents = {'start-match': startMatch,
                 'continue-match': continuetMatch,
                'mark-position': markPosition,
                'announce': announce,};

exports.matchHandleIntent = (conv, ...args) => {
    conv.contexts.delete(context.MENU);
    return intents[conv.intent](conv, ...args);
};