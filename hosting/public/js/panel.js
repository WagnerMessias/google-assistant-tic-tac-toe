'use strict';

class Panel {
    constructor(){
        this.panelHeight = (25 * canvasHeight)/100;
        this.panelColor = "#FFF";
        this.def = this.panelDefinitions();
        // this.wonMatch();
    }

    panelDefinitions(){
        let ScoreboardhHeight = (70 * this.panelHeight)/100;
        let textPlayerSize = (15 * ScoreboardhHeight)/100;
        let symbolPlayerSize = textPlayerSize * 1.2;
  
        let mensageVerticalPosition = (85 * this.panelHeight)/100;
  
        let centerHorizontalScoreboardhSideLeft = canvasWidthCenter / 2;
        let centerHorizontalScoreboardhSideRight = canvasWidthCenter * 1.5;
        let centerVerticalScoreboardh = ScoreboardhHeight / 2;
  
        let painelDefinitions = [];
  
        painelDefinitions['playerOneName'] = {x: centerHorizontalScoreboardhSideLeft,
                                            y: (centerVerticalScoreboardh - textPlayerSize),
                                            size: textPlayerSize};
  
        painelDefinitions['playerTwoName'] = {x: centerHorizontalScoreboardhSideRight,
                                            y: (centerVerticalScoreboardh - textPlayerSize),
                                            size: textPlayerSize};
        
        painelDefinitions['playerOneSymbol'] = {x: centerHorizontalScoreboardhSideLeft,
                                              y: (centerVerticalScoreboardh + symbolPlayerSize),
                                              size: symbolPlayerSize};  
                                              
        painelDefinitions['playerTwoSymbol'] = {x: centerHorizontalScoreboardhSideRight,
                                              y: (centerVerticalScoreboardh + symbolPlayerSize),
                                              size: textPlayerSize * 1.3};
                                              
        painelDefinitions['scoreboard'] = {x: canvasWidthCenter,
                                          y: (centerVerticalScoreboardh + textPlayerSize),
                                          size: textPlayerSize * 1.1};   
        
        painelDefinitions['message'] = {x: canvasWidthCenter,
                                        y: mensageVerticalPosition,
                                        size: textPlayerSize * 0.7};
        return painelDefinitions;
  }
  updatePanel(panel,prompt){
    context.fillStyle = this.panelColor;
    context.fillRect(0,0,canvasWidth,this.panelHeight);
    this.addPlayerOn(panel.p1.name,panel.p1.marker);
    this.addPlayerTwo(panel.p2.name,panel.p2.marker);
    this.updateScoreboard(panel.p1.score,panel.p2.score);
    this.showMessage(prompt);
  }

  addPlayerOn(name,marker){
    this.writeText(name,
                this.def.playerOneName.x,
                this.def.playerOneName.y,
                this.def.playerOneName.size,
              "Comic Sans MS",
              "#9B9B9B",
              "center");
  
    this.writeText(marker,
                this.def.playerOneSymbol.x,
                this.def.playerOneSymbol.y,
                this.def.playerOneSymbol.size,
              "Comic Sans MS",
              markColorX,
              "center");
  }
  
  addPlayerTwo(name,marker){
  
    this.writeText(name,
            this.def.playerTwoName.x,
            this.def.playerTwoName.y,
            this.def.playerTwoName.size,
          "Comic Sans MS",
          "#9B9B9B",
          "center");
  
          this.writeText(marker,
          this.def.playerTwoSymbol.x,
          this.def.playerTwoSymbol.y,
          this.def.playerTwoSymbol.size,
          "Comic Sans MS",
          markColorCircle,
          "center");
  }

  writeText(text,x,y,size,font,color, align){  
    context.font = size+"px "+font;
    context.fillStyle = color;
    context.textAlign = align;
    context.fillText(text, x, y);
  }

  showMessage(message){
      context.clearRect(0, this.def.message.y - this.def.message.size, canvasWidth, this.def.message.size * 2);

              this.writeText(message,
              this.def.message.x,
              this.def.message.y,
              this.def.message.size,
              "Comic Sans MS",
              "#9B9B9B",
              "center");
  }

  tieMatch(message){
   let x = canvasWidthCenter;
   let y = canvasHeightCenter;
   let size = (10 * canvasHeight)/100;

            this.writeText(message,
            x,
            y,
            size,
            "Comic Sans MS",
            "#9B9B9B",
            "center");
            this.showImage(x, y);
}

showImage(x, y){
  let size = (10 * canvasWidth)/100;
  let centerImage = size/2;

  let yNew = y - size * 1.8;
  let xNew = x - centerImage
  let gammer = new Image();
  gammer.onload = function(){
      context.drawImage(gammer,xNew,yNew,size,size)
  }
  gammer.src = "img/velha.png";
}

wonMatch(message,marker){
  let x = canvasWidthCenter;
  let y = canvasHeightCenter;
  let size = (5 * canvasHeight)/100;
  let sizeMarker = (20 * canvasHeight)/100;
  let yMarker = y - (size * 1.8) ;


           this.writeText(message,
           x,
           y,
           size,
           "Comic Sans MS",
           "#9B9B9B",
           "center");

           this.writeText(marker,
           x,
           yMarker,
           sizeMarker,
           "Comic Sans MS",
           "#48D1CC",
           "center");
}

  updateScoreboard(playerOne, playerTwo){
      this.writeText(`${playerOne} x ${playerTwo}`,
                this.def.scoreboard.x,
                this.def.scoreboard.y,
                this.def.scoreboard.size,
                "Comic Sans MS",
                "#9B9B9B",
                "center");
  }
}