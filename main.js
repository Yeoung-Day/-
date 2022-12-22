const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
const read = document.querySelector(".Te")
const scoreTitle = document.querySelector(".scoreTitle")
const score = document.querySelector(".score")
const box = document.querySelector(".box")


const tileCount = 4;

let tiles = [];
const dragged = {
    el : null,
    class : null,
    index : null,
}

let isPlaying = false;
let timeInterval = null;
let time = 0;

let Pcount = 0;
// function

const ran = Math.floor(Math.random()*7);


function checkStatus(){
    const currentList= [...container.children];
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute("data-index")) !== index)
    if(unMatchedList.length === 0){
        gameText.style.display = "block";
        

        isPlaying = false;
        clearInterval(timeInterval)

       Pcount++;
       console.log(Pcount);

       if(Pcount<3){
        setTimeout(() =>        
        setGame()
               , 2000);
       }else{
        scoreGame();
       }
      

    }
}
function setGame(){
    isPlaying = true;
    container.innerHTML = "";
    gameText.style.display = 'none'
    scoreTitle.style.display = 'none'
    box.style.display = "none"
    read.style.display = "block";

    clearInterval(timeInterval)

    tiles = createImageTiles();
    tiles.forEach(tile =>container.appendChild(tile))
    setTimeout(()=>{
        container.innerHTML = "";
        timeInterval = setInterval(()=>{
            playTime.innerText = time;
            time++;
        },1000)
        shuffle(tiles).forEach(tile =>container.appendChild(tile))
    },10)

   

}

function createImageTiles() {
    const tempArray = [];
    const ran = Math.floor(Math.random()*7);
    console.log(ran);
    if(ran === 0){
    Array(tileCount).fill().forEach((_,i) => {
        const li1 = document.createElement("li1");
        li1.setAttribute('data-index', i)
        li1.setAttribute('draggable', 'true');
        li1.classList.add(`list${i}`);
        tempArray.push(li1)
        read.innerText ="해석 : 사랑은 길을 찾아낸다."; 
    })
}else if(ran === 1){
    Array(tileCount).fill().forEach((_,i) => {
        const li2 = document.createElement("li2");
        li2.setAttribute('data-index', i)
        li2.setAttribute('draggable', 'true');
        li2.classList.add(`list${i}`);
        tempArray.push(li2)
        read.innerText ="해석 : 많이 아는 사람일수록 적게 믿는다."; 
    })
}else if(ran === 2){
    Array(tileCount).fill().forEach((_,i) => {
        const li3 = document.createElement("li3");
        li3.setAttribute('data-index', i)
        li3.setAttribute('draggable', 'true');
        li3.classList.add(`list${i}`);
        tempArray.push(li3)
        read.innerText ="해석 : 지위가 매너를 바꾼다."; 
    })
}else if(ran === 3){
    Array(tileCount).fill().forEach((_,i) => {
        const li4 = document.createElement("li4");
        li4.setAttribute('data-index', i)
        li4.setAttribute('draggable', 'true');
        li4.classList.add(`list${i}`);
        tempArray.push(li4)
        read.innerText ="해석 : 어려울 때 친구가 진정한 친구다."; 
    })
}else if(ran === 4){
    Array(tileCount).fill().forEach((_,i) => {
        const li5 = document.createElement("li5");
        li5.setAttribute('data-index', i)
        sli5.setAttribute('draggable', 'true');
        li5.classList.add(`list${i}`);
        tempArray.push(li5)
        read.innerText ="해석 : 인내는 희망의 기술이다."; 
    })
}else if(ran === 5){
    Array(tileCount).fill().forEach((_,i) => {
        const li6 = document.createElement("li6");
        li6.setAttribute('data-index', i)
        li6.setAttribute('draggable', 'true');
        li6.classList.add(`list${i}`);
        tempArray.push(li6)
        read.innerText ="해석 : 빈 수레가 요란하다."; 
    })
}else if(ran === 6){
    Array(tileCount).fill().forEach((_,i) => {
        const li7 = document.createElement("li7");
        li7.setAttribute('data-index', i)
        li7.setAttribute('draggable', 'true');
        li7.classList.add(`list${i}`);
        tempArray.push(li7)
        read.innerText ="해석 : 쥐 없는 집은 없다."; 
    })
}
    return tempArray;
}

function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex],array[index]]
        index--;
    }
    return array;
}

function scoreGame() {
    playTime.style.display = "none"
    scoreTitle.style.display = "block"
    score.style.display = "block"
    box.style.display = "block"

    score.innerText = time;
}


// Events
container.addEventListener('dragstart', e => {
    if(!isPlaying) return;
    const obj = e.target
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
})

container.addEventListener('dragover', e => {
    e.preventDefault()
})

container.addEventListener('drop', e => {
    if(!isPlaying) return;
    const obj = e.target

    if(obj.className !== dragged.class){
    let orginPlace;
    let isLast = false;
    
    if(dragged.el.nextSibling){
        orginPlace = dragged.el.nextSibling
    }else {
        orginPlace = dragged.el.previousSibling
        isLast = true;
    }
        const droppendIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppendIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? orginPlace.after(obj) : orginPlace.before(obj)
    }
    checkStatus();
})

startButton.addEventListener('click', () => {
    setGame();
})