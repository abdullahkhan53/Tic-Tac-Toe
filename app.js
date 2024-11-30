let boxes = document.querySelectorAll('.box');
let gif = document.querySelector('#gif');
let turnMsg = document.querySelector('.turn')
let afterGameWin = document.querySelector('.afterGameWin')
let reset = document.querySelector('#reset')
let restart = document.querySelector('#restart')
let winnerName = document.querySelector('#winnerName')
let winAudio = new Audio('win.mp3.mp3')
let winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let turnX = true;




boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
        if(turnX){
            box.innerText = 'X'
            box.style.color = 'green'
            turnMsg.innerText = 'Turn for O'
            box.disabled = true;
            turnX = false 

        } else{
            box.innerText = 'O'
            box.style.color = 'red'
            turnMsg.innerText = 'Turn for X'
            box.disabled = true
            turnX = true
        }
        checkWinner()

    })
})

const checkWinner = () => {
    for(let win of winCond){
        let pos1Val = boxes[win[0]].innerText
        let pos2Val = boxes[win[1]].innerText
        let pos3Val = boxes[win[2]].innerText;
        // ----------------------------------
        if(pos1Val != '' && pos2Val != '' && pos3Val != ''){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                gif.style.width = '200px';
                disableBox();
                winAudio.play();
                afterGameWin.style.display = 'block';
                winnerName.innerText = `Winner is ${pos1Val}`;
                return;
            }
        } 
        
    }    
    if([...boxes].every(box => box.innerText !== '')){
        turnMsg.innerText = 'Its Tie'
    }
}

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true
    }
}
//  reset and restart events ////////

const resetBtn = () => {
    turnX = true
    for(let box of boxes){
        box.innerText = '';
        box.disabled = false;
    }
    
}

const restartBtn = () => {
    turnX = true    
    for(let box of boxes){
        box.innerText = '';
        box.disabled = false
    }
    afterGameWin.style.display = 'none';
    gif.style.width = '0px';
    winAudio.pause()
        
}

restart.addEventListener('click', restartBtn)
reset.addEventListener('click', resetBtn)

