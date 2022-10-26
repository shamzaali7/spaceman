//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputLetter");
const selectWord = document.querySelector(".button-word");
const selectLetter = document.querySelector(".button-letter");
const displayUsedLetters = document.querySelector(".display-used-letters")
const reset = document.querySelector(".resetB");
let input = document.querySelector(".user-word");
let inputLetter = document.querySelector(".user-letter");
let inputChecker = "";
let counterCorrect = 0;
let counterIncorrect = 1;
let counterLetter = 0;
let checkerUsed = 0;
let alreadyUsed = [];
let wins = 0;
let losses = 0;
console.log(localStorage)
if(localStorage.wins === undefined){
    document.querySelector(".winsNumber").innerText= 0
}else{
document.querySelector(".winsNumber").innerText = localStorage.wins;
}

selectWord.addEventListener("click", e => {
    e.preventDefault();
    for (let i=0; i<input.value.length; i++){
        let letters = document.createElement("div");
        lettersContainer.appendChild(letters);
        letters.classList.add("div-"+i);
        letters.classList.add("invisible");
        letters.style.flex = 1;
        letters.innerHTML = input.value.charAt(i).toLowerCase()
    }
    inputContainer.classList.add("offline")
    charInputContainer.classList.remove("offline")
})

selectLetter.addEventListener("click", e => {
    e.preventDefault();
    if(alreadyUsed.length){
        for(let i=alreadyUsed.length; i>=0; i--){
            if (alreadyUsed[i] === inputLetter.value.toUpperCase()){ //or == alreadyUsed[alreadyUsed.length-1].value
                checkerUsed++
            }
        }
    }
    alreadyUsed[counterLetter] = inputLetter.value.toUpperCase();
    if(checkerUsed > 0){
        alert("you have already used that character");
        alreadyUsed.splice(counterLetter);
        counterLetter--;
    }else{
        for(let i=0; i<input.value.length; i++){
            if(inputLetter.value.toLowerCase() == input.value.charAt(i).toLowerCase()){
                let letterHolder = document.querySelector(".div-"+i);
                letterHolder.classList.remove("invisible");
                letterHolder.classList.add("clear");
                inputChecker = inputLetter.value;
                counterCorrect++;
                checkWin();
            }
        }
        if(inputChecker == ""){
            alert("Incorrect letter")
            let off = document.querySelector(`.ufo-${counterIncorrect}`);
            off.classList.add("offline");
            let on = document.querySelector(`.ufo-${(counterIncorrect+1)}`);
            on.classList.remove("offline");
            if(counterIncorrect+1 === 8){
                alert(`Sorry, you've made too many incorrect guesses, the word is ${input.value}`);
                charInputContainer.classList.add("offline");
                losses++
                document.querySelector(".lossesNumber").innerText = losses;
                for(let i=0; i<input.value.length; i++){
                    let letterIdentifier = document.querySelector(".div-"+i);
                    letterIdentifier.classList.remove("invisible");
                }
            }
            counterIncorrect++;
        }
        
    }
    displayUsedLetters.innerHTML = alreadyUsed;
    inputLetter.value = "";
    inputChecker = "";
    checkerUsed = 0;
    counterLetter++;
})


function checkWin(){
    if(counterCorrect == input.value.length){
        alert("You Win!");
        charInputContainer.classList.add("offline");
        document.querySelector(`.ufo-${counterIncorrect}`).classList.add("offline");
        document.querySelector(".showWin").classList.remove("offline");
        wins++;
        let totalWins = wins;
        if(localStorage.length){
        totalWins = wins + parseInt(localStorage.wins)
        }
        localStorage.setItem("wins", totalWins);
        document.querySelector(".winsNumber").innerText = totalWins;
        console.log(localStorage.wins)
        console.log(localStorage)
    }
}

reset.addEventListener("click", reload => {
    location.reload();
})

// input.addEventListener("Enter", e => {
//     if(e.key === "Enter"){
//         e.preventDefault();
//         selectWord.click();
//     }
// })
// inputLetter.addEventListener("Enter", e => {
//     if(e.key === "Enter"){
//         e.preventDefault();
//         selectLetter.click();
//     }
// })