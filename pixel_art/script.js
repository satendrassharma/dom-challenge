/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
    // write logic to create pixel art grid.
    let pickedColor=null;
    let prevPickedColorBox=null;
    let grid=document.querySelector(el);

    for(let i=0;i<rows;i++){
        let row=document.createElement('div');
        row.className='row';

        for(let i=0;i<cols;i++){
            let box=document.createElement('div');
            box.className='box'
            row.append(box);
        }
        grid.append(row);
    }

    // color pallete 
    let colorPallete=document.createElement('div');
    colorPallete.id="pallete";
    for(let i=0;i<10;i++){
        let box=document.createElement('div');
        box.className='box';
        box.style.backgroundColor=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
        colorPallete.append(box);
    }

    grid.append(colorPallete)

    function checkAndFillBox(e){
        let parent=e.target.parentElement;
        let elem=e.target;
        if(parent.className=='row'){
            elem.style.backgroundColor=pickedColor;
        }else if(parent.id=='pallete'){
            elem.textContent='🔵';
            pickedColor=elem.style.backgroundColor;

            if(prevPickedColorBox && prevPickedColorBox!=elem){
                prevPickedColorBox.textContent='';
            }
            prevPickedColorBox=elem;
        }
    }


    grid.addEventListener('mousedown',(e)=>{
        checkAndFillBox(e);
        grid.addEventListener('mousemove',checkAndFillBox) 
    })

    grid.addEventListener('mouseup',(e)=>{
        grid.removeEventListener('mousemove',checkAndFillBox)
    })

    let clearButton=document.createElement('button');
    clearButton.id="clear"
    clearButton.textContent="Clear Board"
    grid.after(clearButton);

    clearButton.addEventListener('click',(e)=>{
        let boxes=document.querySelectorAll('.row .box');
        console.log(boxes);
        Array.from(boxes).forEach(box=>{
            box.style.backgroundColor='white';
        })
    })

}
