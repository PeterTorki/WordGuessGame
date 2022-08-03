let first = 0
const start = document.getElementById("startGame");
const newDiv = document.getElementById("Backs");
const showNow = document.getElementById("showNow");
const score = document.getElementById("score");
const scoreSpan = document.getElementById("scoreCnt");

const hintVar = document.getElementById("hint");
const remeVar = document.getElementById("guesses");
const wrongs = document.getElementById("wrongs");

const resetGame = document.getElementById("reset")
const inputTag = document.getElementById("inputs");

const wBoxBody = document.getElementById("popupBox1");
const wOkBtn = document.getElementById("btn1");

const rBoxBody = document.getElementById("popupBox2");
const rOkBtn = document.getElementById("btn2");

let wrongCnt  = 0, trueCnt = 0, totalScore = 0;
let inputs;
let visited = []
let freq = new Map();
// const btnAll = document.getElementsByClassName("start-game-btn")[0];
// const all = document.getElementsByClassName('in1')

console.log(wordList[0].word)
let word;

function BuildInput(chr, word) {
    visited.length = word.length;
    for(let i = 0 ; i < word.length ; i++){
        if(chr == word[i] && !visited[i]){
            inputs[i].value = chr;
            visited[i] = true;
            return;
        }
    }
}

function renderGame() {
    inputTag.innerHTML = ""
    inputs = [];
    visited = []
    freq = new Map();
    //Set all variables to 0
    wrongCnt  = 0, trueCnt = 0;
    wrongs.textContent = ""
    let idx = Math.floor(Math.random() * wordList.length);
    
    for(let i = 0 ; i < (wordList[idx].word).length ; i++)
    inputTag.innerHTML += '<input class = "Seem" type="text" disabled>'
    

    inputs = document.getElementsByClassName('Seem');
    hintVar.textContent = `${wordList[idx].hint}`;
    word =  ((wordList[idx].word).toUpperCase()).split('');
    
    for(let i = 0 ; i < word.length ; i++)
        freq.set(word[i], 0);

    for(let i = 0 ; i < word.length ; i++)
        freq[word[i]] = 0;
        
    for(let i = 0 ; i < word.length ; i++)
        freq[word[i]]++;
    
    console.log(freq)
    
    remeVar.textContent = `${word.length}`;

}

const isAlpha = chr => chr.length == 1 && chr.toLowerCase() !== chr.toUpperCase();
document.addEventListener('keydown', chrInput => {
    let chr = (String(chrInput.key)).toUpperCase();
    console.log(word);
    if(isAlpha(chr) && (!word.includes(chr) || freq[chr] <= 0)){
        ++wrongCnt;
        console.log(wrongCnt);
        remeVar.textContent = `${word.length -  wrongCnt}`;       
        wrongs.textContent +=  (wrongCnt > 1 ? "," : "") + `${chr}` ; 
    }    
    else if((word.includes(chr) && freq[chr] > 0)){
        ++trueCnt;
        --freq[chr];
        wOkBtn.focus()
        console.log(freq)
        BuildInput(chr, word);
    }
    if(wrongCnt == word.length){
        wBoxBody.style.opacity = "1";
        wBoxBody.style.pointerEvents = "auto";
    }
    else if(trueCnt == word.length){
        totalScore += 10;
        rOkBtn.focus()
        scoreSpan.textContent = `${totalScore}`;
        trueCnt = 0, wrongCnt = 0;
        rBoxBody.style.opacity = "1";
        rBoxBody.style.pointerEvents = "auto";
    }
})

wOkBtn.addEventListener("click", () => {
    start.style.display = 'block';
    newDiv.className = "start-back"
    showNow.style.display = 'none';
    wBoxBody.style.opacity = "0";
    wBoxBody.style.pointerEvents = "none";
    score.style.display = 'none';
    renderGame()

})

rOkBtn.addEventListener("click", () => {
    rBoxBody.style.opacity = "0";
    rBoxBody.style.pointerEvents = "none";
    renderGame()
})

resetGame.addEventListener("click", () => renderGame())

start.addEventListener("click", () => {
    if(!first)
        alert('Please make sure that you opens the game from a PC and the keyboard is english.')
    
    first = 1
    totalScore = 0;
    scoreSpan.textContent = `${totalScore}`;
    start.style.display = 'none';
    score.style.display = 'block';
    newDiv.className = "guess-box"
    showNow.style.display = 'block';
    renderGame()
});

