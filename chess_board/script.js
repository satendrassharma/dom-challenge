

function BuildChessBoard(el,rows,cols){

    let board=document.querySelector(el);

    let hashBoxes={}
    let prevBoxFilled=null;

    function buildBoard(r,c,b){
        for(let i=0;i<r;i++){
            let row=document.createElement('div');
            row.className='row';
            for(let j=0;j<c;j++){
                let cell=document.createElement('div');
                cell.className='box';
                cell.dataset.id=`${i},${j}`
                // cell.textContent=`(${i},${j})`
        
                hashBoxes[cell.dataset.id]=cell;
                if((i%2==0 && j%2==0) || (i%2!=0 && j%2!=0)){
                    cell.classList.add('white')
                }else{
                    cell.classList.add('black')
                }
        
                row.append(cell);
            }
        
            b.append(row);
        }
    }

    buildBoard(rows,cols,board);

    function removePreviousFill(xc,yc){

        removeColor(xc,yc);
     
         let x=xc,y=yc;
         function removeColor(xcoord,ycoord){
             const box_id=`${xcoord},${ycoord}`;
             const tbox=hashBoxes[box_id];
             tbox.classList.remove('red');
         }
     
     
         //top left color
     
         while(x>=0 && y>=0){
             removeColor(x,y);
             x--;
             y--;
         }
     
     
         x=xc;
         y=yc;
         //bottom right color
         while(x<rows && y<cols){
             removeColor(x,y)
             x++;
             y++;
         }
     
     
         x=xc;
         y=yc;
         //top right color
         while(x>=0 && y<cols){
             removeColor(x,y);
             x--;
             y++;
         }
     
     
         x=xc;
         y=yc;
         //bottom left color
         while(x<rows && y>=0){
             removeColor(x,y);
             x++;
             y--;
         }
     
     
    }

    function fillBox(xcoord,ycoord){
        const box_id=`${xcoord},${ycoord}`;
        const tbox=hashBoxes[box_id];
        tbox.classList.add('red');
    }
    
    function fillBoxes(tx,ty){
        let x=tx,y=ty;
    
        //top left color
    
        while(x>=0 && y>=0){
            fillBox(x,y);
            x--;
            y--;
        }
    
    
        x=tx;
        y=ty;
        //bottom right color
        while(x<rows && y<cols){
           fillBox(x,y)
            x++;
            y++;
        }
    
    
        x=tx;
        y=ty;
        //top right color
        
        while(x>=0 && y<cols){
           fillBox(x,y);
            x--;
            y++;
        }
    
    
        x=tx;
        y=ty;
        //bottom left color
        while(x<rows && y>=0){
           fillBox(x,y);
            x++;
            y--;
        }
    }
    
    
    board.addEventListener("click",(e)=>{
        let box=e.target;
        let id=box.dataset.id;
        let coords=id.split(',');
        let x=coords[0],y=coords[1];
    
        if(prevBoxFilled) {
            let rcoords=prevBoxFilled.dataset.id.split(',')
            removePreviousFill(rcoords[0],rcoords[1]);
        }
    
    
        box.classList.add('red');
    
        fillBoxes(x,y);
        
        prevBoxFilled=box;
    
    })

}



new BuildChessBoard("#board",8,8);













