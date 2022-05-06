const getRandomColors = function(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}

function ColorSpotter(el,rows,cols){

    let score=0;

    let board=document.querySelector(el);
    let board_width=board.clientWidth;
    let board_height=board.clientHeight;

    

    let scoreElem=document.getElementById('score');
    scoreElem.textContent=score;
    

    let trows=rows,tcols=cols;

    function generateBoard(r,c){
        let pixelDeduction=((r-2)*2+2)/r;
        let box_width=board_width/c;
        let box_height=board_height/r-pixelDeduction;

        let {color,oddColor}=getRandomColors();
        let randomNoRow=Math.floor(Math.random()*r);
        let randomNoCol=Math.floor(Math.random()*c);

       
        let fragment=new DocumentFragment();
        for(let i=0;i<r;i++){
            let row=document.createElement('div');
            row.className='row';
            for(let j=0;j<c;j++){
                let box=document.createElement('div');
                box.className='box'
                box.style.width=box_width+'px';
                box.style.height=box_height+"px";
                if(randomNoRow==i && randomNoCol==j){
                    box.style.backgroundColor=oddColor;
                    box.dataset.different=true;
                }else{
                    box.style.backgroundColor=color;
                }
                row.append(box);
            }
            fragment.append(row);
        }

        board.innerHTML='';
        board.append(fragment);
    }

    generateBoard(trows,tcols);


    board.addEventListener("click",(e)=>{
        let clickedBox=e.target;
        let different=clickedBox.dataset.different;

        console.log({different,clickedBox})

        if(different){
            score++;
            scoreElem.textContent=score;
            trows++;
            tcols++;
            generateBoard(trows,tcols);
        }else{
            board.classList.add("shake");
            setTimeout(()=>{
                board.classList.remove('shake');
            },800)
            score=0;
            scoreElem.textContent=score;
            trows=rows;
            tcols=cols;
            generateBoard(rows,cols);
        }

    })

}

new ColorSpotter("#board",4,4);

