class Board {
    constructor(panelHeight){
    this.panelHeight =  panelHeight; 
    this.boardColor = "#fff";
    this.lineColor = "#979797";
    this.spaceBetweenLine = 0;
    // this.createBoard();
    // this.markBoard(8, "x");
    // // this.markBoard(9, "circle");
    // this.markLineWinner([1,5,9],"X")
    }

    createBoard(){
        let boardHeight =  canvasHeight - this.panelHeight;

        context.fillStyle = this.boardColor;
        context.beginPath();
        context.fillRect(0,this.panelHeight,canvasWidth, boardHeight);
        
        let lineSize;
      
        if(boardHeight > canvasWidth){
          lineSize =  (90 * canvasWidth)/100;
        }else{
          lineSize =  (90 * boardHeight)/100;
        }
      
        this.spaceBetweenLine = lineSize / 3;
      
      //points vertical
        let lineVerticalYStart = this.panelHeight + (5 * boardHeight)/100;
        let lineVerticalYEnd = lineVerticalYStart + lineSize;
        let lineVerticalOneX = ((canvasWidth - lineSize ) / 2) + this.spaceBetweenLine;
        let lineVerticalTwoX = ((canvasWidth - lineSize ) / 2) + (this.spaceBetweenLine * 2);
      
      //points horizontal
        let lineHorizontalOneY = lineVerticalYStart + this.spaceBetweenLine;
        let lineHorizontalTwoY = lineVerticalYStart + (this.spaceBetweenLine * 2);
        let lineHorizontalXStart = lineVerticalOneX - this.spaceBetweenLine;
        let lineHorizontalXEnd = lineHorizontalXStart  + lineSize;
      
        context.lineWidth = 8;
        
        //Positions
        this.positions = this.createPositions(lineVerticalYStart,lineHorizontalXStart) 
        this.createVerticalLines(lineVerticalOneX, lineVerticalTwoX, lineVerticalYStart, lineVerticalYEnd);
        this.createHorizontalLines(lineHorizontalOneY,lineHorizontalTwoY,lineHorizontalXStart, lineHorizontalXEnd);
      }

    createVerticalLines(lineOneX, lineTwoX, lineVerticalYStart, lineVerticalYEnd){
  
        context.beginPath()
        context.strokeStyle = this.lineColor;
        context.moveTo(lineOneX, lineVerticalYStart);
        context.lineTo(lineOneX, lineVerticalYEnd);
        context.stroke();
      
        context.beginPath()
        context.moveTo(lineTwoX, lineVerticalYStart);
        context.lineTo(lineTwoX, lineVerticalYEnd );
        
        context.stroke();
    }
      
    createHorizontalLines(lineHorizontalOneY, lineHorizontalTwoY, lineHorizontalXStart, lineHorizontalXEnd){
        context.beginPath()
        context.strokeStyle = this.lineColor;
        context.moveTo(lineHorizontalXStart, lineHorizontalOneY);
        context.lineTo(lineHorizontalXEnd, lineHorizontalOneY);
        context.stroke();
      
        context.beginPath()
        context.moveTo(lineHorizontalXStart, lineHorizontalTwoY);
        context.lineTo(lineHorizontalXEnd, lineHorizontalTwoY );
        context.stroke();
    }
      
    createPositions(lineVerticalYStart,lineHorizontalXStart){
        let points = [];
        for(var i = 0; i < 3; i++){
          points['centerYLine'+(i+1)] = lineVerticalYStart + this.spaceBetweenLine * (i + 0.5);
          points['centerXColumn'+(i+1)] = lineHorizontalXStart + this.spaceBetweenLine * (i + 0.5);
        }
      
        let positions = [];
        let p = 0;
        for(var i = 1; i <= 3; i++){
          for(var j = 1; j <= 3; j++){
            let numberP = p+1;
            let cX = points['centerXColumn'+j];
            let cY = points['centerYLine'+i];
            let sizeArea =  (90 * this.spaceBetweenLine)/100;
            let id = 'p'+numberP;
            let text = numberP.toString();
            let space = this.spaceBetweenLine;

            let x = points['centerXColumn'+j] - (space/2);
            let y = points['centerYLine'+i] - (space/2);

            // context.strokeStyle='#14ffa7';
            // context.strokeRect(x, y, space, space);

            let position = new Position(space,x,y,cX,cY,sizeArea, sizeArea, id,text);
            positions[p] = position;
            position.render();
            
            p++;
          }         
        }
        return positions;
    }

    markBoard(position, type){ 
        this.positions[position].mark(type);
    }

    markLineWinner(positionsWinner, type){
        const that = this;
        positionsWinner.forEach(function(value){
        that.positions[value].mark(type,true);
       }); 
    }

    markCurrentBoard(currentBoard){
      const that = this;
      currentBoard.forEach(function(value,index){
      if(value === "O" || value === "X" ){
        that.positions[index].mark(value);
      }
     }); 
    }
}