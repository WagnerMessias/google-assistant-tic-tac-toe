'use strict';

var view = document.getElementById('view');
let context = null; 
let canvasWidth =  view.clientWidth;
let canvasWidthCenter = canvasWidth / 2;
let canvasHeight = view.clientHeight;
let positions = [];

let painelDefinitions = [];

let spaceBetweenLine = 0;

let painelHeight = (25 * canvasHeight)/100;
let painelColor = "#87CEFA";
let lineColor = "#87CEFA";
let markColorDefault = "#4CAF4F";
let markColor = markColorDefault;
let markColorWinner = "red";
let markColorX = "#FFFF00";
let markColorCircle = "#00FF00";



let boardColor = "#1E90FF";
let textPositionBoardcolor = "#ADD8E6";

function startGame() {
  canvasArea.start();
  createPanelDefinitions();
  createBoard();

  addPlayerOn("Wagner");
  addPlayerTwo("Adriana");
  updatScoreboard("01","02");

  showMessage("Vez  do Wagner");


  markBoard(2, "circle");//temp depois colocar em update de state
  markBoard(7, "x");//temp depois colocar em update de state

  let arr = [1,5,9];

  markLineWinner(arr, "x");

}

var canvasArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        context = this.canvas.getContext("2d");
        view.appendChild(this.canvas);
        this.frameNo = 0;
        }
}

function createPanelDefinitions(){
      context.fillStyle = painelColor;
      context.fillRect(0,0,canvasWidth,painelHeight);

      let ScoreboardhHeight = (70 * painelHeight)/100;
      let textPlayerSize = (20 * ScoreboardhHeight)/100;
      let symbolPlayerSize = textPlayerSize * 1.3;

      let mensageVerticalPosition = (85 * painelHeight)/100;

      let centerHorizontalScoreboardhSideLeft = canvasWidthCenter / 2;
      let centerHorizontalScoreboardhSideRight = canvasWidthCenter * 1.5;
      let centerVerticalScoreboardh = ScoreboardhHeight / 2;

      painelDefinitions = [];

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



}

function showMessage(message){
    writeText(message,
              painelDefinitions.message.x,
              painelDefinitions.message.y,
              painelDefinitions.message.size,
              "Comic Sans MS",
              "#000",
              "center");
}

function updatScoreboard(playerOne, playerTwo){
    writeText(`${playerOne} x ${playerTwo}`,
              painelDefinitions.scoreboard.x,
              painelDefinitions.scoreboard.y,
              painelDefinitions.scoreboard.size,
              "Comic Sans MS",
              "#000",
              "center");
}

function addPlayerOn(name){
  writeText(name,
            painelDefinitions.playerOneName.x,
            painelDefinitions.playerOneName.y,
            painelDefinitions.playerOneName.size,
            "Comic Sans MS",
            "#fff",
            "center");

  writeText("X",
            painelDefinitions.playerOneSymbol.x,
            painelDefinitions.playerOneSymbol.y,
            painelDefinitions.playerOneSymbol.size,
            "Comic Sans MS",
            markColorX,
            "center");
}

function addPlayerTwo(name){

        writeText(name,
        painelDefinitions.playerTwoName.x,
        painelDefinitions.playerTwoName.y,
        painelDefinitions.playerTwoName.size,
        "Comic Sans MS",
        "#fff",
        "center");

        writeText("O",
        painelDefinitions.playerTwoSymbol.x,
        painelDefinitions.playerTwoSymbol.y,
        painelDefinitions.playerTwoSymbol.size,
        "Comic Sans MS",
        markColorCircle,
        "center");
}

function createBoard(){
  let boardHeight =  canvasHeight - painelHeight;
  context.beginPath()
  context.fillStyle = boardColor;
  context.fillRect(0,painelHeight,canvasWidth, boardHeight);
  
  let lineSize;

  if(boardHeight > canvasWidth){
    lineSize =  (90 * canvasWidth)/100;
  }else{
    lineSize =  (90 * boardHeight)/100;
  }

  spaceBetweenLine = lineSize / 3;
  // let halfSpaceBetweenLine = spaceBetweenLine / 2;

//points vertical
  let lineVerticalYStart = painelHeight + (5 * boardHeight)/100;
  let lineVerticalYEnd = lineVerticalYStart + lineSize;
  let lineVerticalOneX = ((canvasWidth - lineSize ) / 2) + spaceBetweenLine;
  let lineVerticalTwoX = ((canvasWidth - lineSize ) / 2) + (spaceBetweenLine * 2);

//points horizontal
  let lineHorizontalOneY = lineVerticalYStart + spaceBetweenLine;
  let lineHorizontalTwoY = lineVerticalYStart + (spaceBetweenLine * 2);
  let lineHorizontalXStart = lineVerticalOneX - spaceBetweenLine;
  let lineHorizontalXEnd = lineHorizontalXStart  + lineSize;

  context.lineWidth = 8;
  
  //Positions
  positions = createPositions(lineVerticalYStart,lineHorizontalXStart, spaceBetweenLine) 

  createVerticalLines(lineVerticalOneX, lineVerticalTwoX, lineVerticalYStart, lineVerticalYEnd);

  createHorizontalLines(lineHorizontalOneY,lineHorizontalTwoY,lineHorizontalXStart, lineHorizontalXEnd);

  for(var i = 1; i <= 9; i++){
    writeTextPosition(i);
  }

}

function createVerticalLines(lineOneX, lineTwoX, lineVerticalYStart, lineVerticalYEnd){
  
  context.beginPath()
  context.strokeStyle = lineColor;
  context.moveTo(lineOneX, lineVerticalYStart);
  context.lineTo(lineOneX, lineVerticalYEnd);
  context.stroke();

  context.beginPath()
  context.moveTo(lineTwoX, lineVerticalYStart);
  context.lineTo(lineTwoX, lineVerticalYEnd );
  
  context.stroke();
}

function createHorizontalLines(lineHorizontalOneY, lineHorizontalTwoY, lineHorizontalXStart, lineHorizontalXEnd){
  context.beginPath()
  context.strokeStyle = lineColor;
  context.moveTo(lineHorizontalXStart, lineHorizontalOneY);
  context.lineTo(lineHorizontalXEnd, lineHorizontalOneY);
  context.stroke();

  context.beginPath()
  context.moveTo(lineHorizontalXStart, lineHorizontalTwoY);
  context.lineTo(lineHorizontalXEnd, lineHorizontalTwoY );
  context.stroke();
}

function createPositions(lineVerticalYStart,lineHorizontalXStart, spaceBetweenLine){
  let points = [];
  for(var i = 0; i < 3; i++){
    points['centerYLine'+(i+1)] = lineVerticalYStart + spaceBetweenLine * (i + 0.5);
    points['ccenterXColumn'+(i+1)] = lineHorizontalXStart + spaceBetweenLine * (i + 0.5);
  }

  let positions = [];
  let position = 1;
  for(var i = 1; i <= 3; i++){
    for(var j = 1; j <= 3; j++){
      positions[position] = {x: points['ccenterXColumn'+j],y: points['centerYLine'+i]};
      position++;
    }
  }
  return positions;
}

function markBoard(positionNumber, type){ 
    clearPosition(positionNumber);
    let position = positions[positionNumber];
    if(type === "circle"){
      let sizeMark =  (30 * spaceBetweenLine)/100;
      toDrawCircle(position, sizeMark, );
    }else{
      let sizeMark =  (50 * spaceBetweenLine)/100;
      toDrawX(position, (sizeMark / 2));
    };
  }

  function toDrawCircle(position, sizeMark,isWiner){
    let colorStyle = markColorCircle;
    
    if(isWiner){
      colorStyle = markColorWinner
    }

    context.beginPath();
    context.strokeStyle = colorStyle;
    context.arc(position.x,position.y, sizeMark,0,Math.PI*2);
    context.stroke(); 
  }
  
  function toDrawX(axis, halfSizeMark, isWiner){
    let colorStyle = markColorX;
    
    if(isWiner){
      colorStyle = markColorWinner
    }
    let xStart = axis.x - halfSizeMark;
    let xEnd = axis.x + halfSizeMark;
    let yTop = axis.y - halfSizeMark;
    let yDown = axis.y + halfSizeMark;

    context.strokeStyle = colorStyle;
    context.beginPath()
    context.moveTo(xStart, yDown);
    context.lineTo(xEnd, yTop );
    context.moveTo(xStart, yTop);
    context.lineTo(xEnd, yDown );
    context.stroke();
  }

  function writeTextPosition(positionNumber){
    let sizeText =  (30 * spaceBetweenLine)/100;
    let y = (positions[positionNumber].y + (sizeText / 2));
    context.font = sizeText+"px Comic Sans MS";
    context.fillStyle = textPositionBoardcolor;
    context.textAlign = "center";
    context.fillText(positionNumber, positions[positionNumber].x, y);
  }

  function clearPosition(positionNumber) {
    let spaceClear =  (85 * spaceBetweenLine)/100;
    let x = positions[positionNumber].x - (spaceClear / 2);
    let y = positions[positionNumber].y - (spaceClear / 2);

    context.fillStyle = boardColor;
    context.fillRect(x, y, spaceClear, spaceClear);
  }

  function markLineWinner(markings,type){
   
    //markColor = markColorWinner;

    markings.forEach(function(value, index){
      clearPosition(value);
    let position = positions[value];
    if(type === "circle"){
      let sizeMark =  (30 * spaceBetweenLine)/100;
      toDrawCircle(position, sizeMark, true);
    }else{
      let sizeMark =  (50 * spaceBetweenLine)/100;
      toDrawX(position, (sizeMark / 2),true);
    }
   });

   //markColor = markColorDefault;

  }

  function writeText(text,x,y,size,font,color, align){  
    context.font = size+"px "+font;
    //context.font = size+"px Comic Sans MS";
    context.fillStyle = color;
    context.textAlign = align;
    context.fillText(text, x, y);
  }

// register assistant canvas callbacks
const callbacks = {
    onUpdate(state) {
      console.log('onUpdate', JSON.stringify(state));
    //   if ('tint' in state) {
    //     sprite.tint = state.tint;
    //   }
    //   if ('spin' in state) {
    //     spin = state.spin;
    //   }
    },
  };

  interactiveCanvas.ready(callbacks);