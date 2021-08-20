'use strict';

class Menu {
    constructor(){
    this.menuXStart = 0;
    this.menuXStart = 0;
    }

    createMenuButtons(newButtons){
        clickableElements = []

        let colorText = "#979797"
        let width = 0
        if(canvasWidth > canvasHeight){
            width = (15 * canvasWidth) / 100;
        }else{
            width = (50 * canvasWidth) / 100;
        }
        let height = (30 * width) / 100;
        let centerW = width/2;
        let centerH = height/2;

        let x = canvasWidthCenter - centerW;
        let y = (canvasHeightCenter / 2) * 1.4;
        context.fillStyle = "red";
        //Clean buttons area
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        newButtons.forEach(function(btn,index) {
            let startYButtonSpace = 1.4
            let newY = 0
            if(index == 0){
                newY = y
            }else{
                newY = y + ( height * (startYButtonSpace * index));
            }

            let query = ( "query" in btn) ? btn.query : false;
            let subtitle = ( "subtitle" in btn) ? btn.subtitle : false;
            
            new Button(x, newY, width, height,btn.id, btn.text, colorText,subtitle, query).roundedRect(20);
        });
    }


    showMenu(speech,buttons){
        this.createMenuButtons(buttons)
        this.showLogo();

        console.log(speech);
        console.log("esse é speech");

        if("line1" in speech){
            this.writeMessageLineOne(speech.line1);
        }

        if("line2" in speech){
            this.writeMessageLineTwo(speech.line2);
        }
        
    }

    showStartGame(speech, buttons){
        this.createMenuButtons(buttons)
        this.showLogo();
        this.writeMessageLineOne(speech.line1);
    }

    showLogo(){
        let size = (60 * (canvasHeightCenter/2)) / 100;
        let centerImage = size/2;
        let x = canvasWidthCenter - centerImage;
        let y = (canvasHeightCenter / 4) - centerImage;

        let gammer = new Image();
        gammer.onload = function(){
            context.drawImage(gammer,x,y,size,size)
        }
        gammer.src = "img/logo.png";
    }

    writeMessageLineOne(menssage){
        let fontSize = (6 * (canvasHeightCenter/2))/100;
        let x = canvasWidthCenter;
        let y = canvasHeightCenter / 2;
        new Text(x,y,fontSize,menssage).write()
    }

    writeMessageLineTwo(menssage){
        let fontSize = (6 * (canvasHeightCenter/2))/100;
        let x = canvasWidthCenter;
        let y = (canvasHeightCenter / 2) +  (fontSize * 3);
        new Text(x,y,fontSize,menssage).write()
    }

}