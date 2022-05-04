function Star(el, count, callback) {
    // Write a logic to create star rating problem
    
    let displayStar=document.getElementById('display-star');
    displayStar.style.fontSize='32px';
    
    document.body.style.cssText=`
            display:flex;
        flex-direction:column;
        align-items:center
    `;
    
    
    let starContainer=document.getElementById(el.replace("#",''));
    let clickCount=0;
    
    for(let i=0;i<count;i++){
      let starIcon=document.createElement('i');
      starIcon.style.fontSize='48px';
      starIcon.classList.add("fa");
      starIcon.classList.add("fa-star-o");
      starIcon.dataset.count=i;
       starContainer.append(starIcon);
    }
    
    function changeStateStars(targetCount){
         let childIcons=starContainer.children;
      Array.from(childIcons).forEach(child=>{
        let count=child.dataset.count;
        if(count<=targetCount){
          child.classList.remove('fa-star-o');
          child.classList.add('fa-star')
        }else{
          child.classList.remove('fa-star');
          child.classList.add('fa-star-o')
        }
      })
    }
    
    
    starContainer.addEventListener('click',(e)=>{
     
      let targetCount=e.target.dataset.count;
      this.clickCount=targetCount;
         changeStateStars(targetCount);
      
      getStar(+targetCount+1);
        
    })
    
    starContainer.addEventListener('mouseover',(e)=>{
      let targetCount=e.target.dataset.count;
      changeStateStars(targetCount);
    })
    
    starContainer.addEventListener("mouseout",(e)=>{
      changeStateStars(this.clickCount);
    })
    
  }
  
  
  
  function getStar(value){
    document.getElementById("display-star").innerHTML = value;
  }
  new Star("#star", 5, getStar);