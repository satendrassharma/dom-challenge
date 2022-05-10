const progress = document.querySelector('.progress__bar')
const run = document.querySelector('#run')
const runCount = document.querySelector('.queue-value')
const animationDurationText=document.getElementById("animation_duration_text");

let queueCount = 0
let isAnimationOver = true
let animateTime = 0;
let isAnimationPaused = false;

let form = document.forms[0];
let input = document.getElementById("seconds");

input.addEventListener("input", (e) => {
  animateTime = `${e.target.value}s`
})


form.addEventListener('submit', (e) => {
  e.preventDefault();

  document.documentElement.style
    .setProperty('--ad', `${animateTime || '4s'}`);

  animationDurationText.textContent=`${animateTime || '4s'}`
})


let pause = document.getElementById("pause");
pause.addEventListener("click", (e) => {
  if(queueCount!=0){
    progress.style.webkitAnimationPlayState = 'paused';
  isAnimationPaused = true;
  }
})

const animate = () => {
  isAnimationOver = false
  if (queueCount == 0) {
    isAnimationOver = true
    return
  }
  progress.classList.add('animate')
}
const handleClick = () => {
  if (isAnimationPaused) {
    progress.style.webkitAnimationPlayState = 'running';
    isAnimationPaused=false;
    return;
  }
  queueCount++
  runCount.textContent = queueCount
  isAnimationOver && animate()
}
run.addEventListener('click', handleClick)

progress.addEventListener("animationend", (e) => {
  queueCount--;
  progress.classList.remove("animate");
  runCount.textContent = queueCount;
  setTimeout(() => { animate() }, 0)
})