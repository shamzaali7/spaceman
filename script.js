const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputLetter");
const selectWord = document.querySelector(".button-word");
const selectLetter = document.querySelector(".button-letter");
const displayUsedLetters = document.querySelector(".display-used-letters");
const reset = document.querySelector(".resetB");
const localWins = document.querySelector(".winsNumber");
const localLosses = document.querySelector(".lossesNumber");
const containerPopup = document.querySelector(".containerPopup");
const openB = document.querySelector(".openB");
const closeB = document.querySelector(".closeB");
let input = document.querySelector(".user-word");
let inputLetter = document.querySelector(".user-letter");
let counterCorrect = 0;
let counterIncorrect = 1;
let counterLetter = 0;
let alreadyUsed = [];
let wins = 0;
let losses = 0;

const correctAudio = new Audio("Correct.mp3");
const wrongAudio = new Audio("Wrong.mp3");
const winAudio = new Audio("Win.mp3");
const loseAudio = new Audio("Lose.mp3");

// Initialize wins and losses from local storage
if (localStorage.wins === undefined) {
    localWins.innerText = 0;
} else {
    localWins.innerText = localStorage.wins;
}
if (localStorage.losses === undefined) {
    localLosses.innerText = 0;
} else {
    localLosses.innerText = localStorage.losses;
}

// Event listener for selecting the word to guess
selectWord.addEventListener("click", e => {
    e.preventDefault();
    inputContainer.classList.add("offline");
    charInputContainer.classList.remove("offline");
    for (let i = 0; i < input.value.length; i++) {
        let letter = document.createElement("div");
        letter.classList.add("div-" + i, "invisible");
        letter.style.flex = 1;
        letter.innerText = input.value.charAt(i).toLowerCase();
        lettersContainer.appendChild(letter);
    }
});

// Event listener for selecting a letter
selectLetter.addEventListener("click", e => {
    e.preventDefault();
    let letter = inputLetter.value.toUpperCase();
    if (letter.length !== 1) {
        alert("Please enter a single letter");
        return;
    }
    if (alreadyUsed.includes(letter)) {
        alert("You have already used that character");
        return;
    }
    alreadyUsed.push(letter);
    displayUsedLetters.innerText = alreadyUsed.join(", ");
    inputLetter.value = "";
    counterLetter++;
    checkLetter(letter);
});

// Function to check if the letter is correct
function checkLetter(letter) {
    let correct = false;
    for (let i = 0; i < input.value.length; i++) {
        if (letter === input.value.charAt(i).toUpperCase()) {
            correct = true;
            correctAudio.play();
            let letterHolder = document.querySelector(".div-" + i);
            letterHolder.classList.remove("invisible");
            letterHolder.classList.add("clear");
            counterCorrect++;
        }
    }
    if (!correct) {
        wrongAudio.play();
        alert("Incorrect letter");
        let off = document.querySelector(`.ufo-${counterIncorrect}`);
        off.classList.add("offline");
        let on = document.querySelector(`.ufo-${(counterIncorrect + 1)}`);
        on.classList.remove("offline");
        counterIncorrect++;
        if (counterIncorrect === 8) {
            loseAudio.play();
            alert(`Sorry, you've made too many incorrect guesses, the word is ${input.value}`);
            charInputContainer.classList.add("offline");
            losses++;
            let totalLosses = losses + (localStorage.losses ? parseInt(localStorage.losses) : 0);
            localStorage.setItem("losses", totalLosses);
            document.querySelector(".lossesNumber").innerText = totalLosses;
            for (let i = 0; i < input.value.length; i++) {
                let letterIdentifier = document.querySelector(".div-" + i);
                letterIdentifier.classList.remove("invisible");
                letterIdentifier.classList.add("clear");
            }
        }
    }
    checkWin();
}

// Function to check if the player has won
function checkWin() {
    if (counterCorrect === input.value.length) {
        winAudio.play();
        alert("You Win!");
        charInputContainer.classList.add("offline");
        document.querySelector(`.ufo-${counterIncorrect}`).classList.add("offline");
        document.querySelector(".showWin").classList.remove("offline");
        wins++;
        let totalWins = wins + (localStorage.wins ? parseInt(localStorage.wins) : 0);
        localStorage.setItem("wins", totalWins);
        document.querySelector(".winsNumber").innerText = totalWins;
    }
}

// Event listener for resetting the game
reset.addEventListener("click", () => {
    location.reload();
});

// Event listener for submitting word via Enter key
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        selectWord.click();
    }
});

// Event listener for submitting letter via Enter key
inputLetter.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        selectLetter.click();
    }
});

// Event listener for opening the instructions popup
openB.addEventListener("click", () => {
    containerPopup.classList.add("visib");
});

// Event listener for closing the instructions popup
closeB.addEventListener("click", () => {
    containerPopup.classList.remove("visib");
});




// const lettersContainer = document.querySelector(".containerLetters");
// const inputContainer = document.querySelector(".containerInput");
// const charInputContainer = document.querySelector(".containerInputLetter");
// const selectWord = document.querySelector(".button-word");
// const selectLetter = document.querySelector(".button-letter");
// const displayUsedLetters = document.querySelector(".display-used-letters");
// const reset = document.querySelector(".resetB");
// const localWins = document.querySelector(".winsNumber");
// const localLosses = document.querySelector(".lossesNumber");
// const containerPopup = document.querySelector(".containerPopup");
// const openB = document.querySelector(".openB");
// const closeB = document.querySelector(".closeB");
// let input = document.querySelector(".user-word");
// let inputLetter = document.querySelector(".user-letter");
// let inputChecker = "";
// let counterCorrect = 0;
// let counterIncorrect = 1;
// let counterLetter = 0;
// let checkerUsed = 0;
// let alreadyUsed = [];
// let wins = 0;
// let losses = 0;

// const correctAudio = new Audio();
// correctAudio.src = "Correct.mp3"
// const wrongAudio = new Audio();
// wrongAudio.src = "Wrong.mp3";
// const winAudio = new Audio();
// winAudio.src = "Win.mp3";
// const loseAudio = new Audio();
// loseAudio.src = "Lose.mp3";

// if(localStorage.wins === undefined){
//     localWins.innerText= 0;
// }else{
//     localWins.innerText = localStorage.wins;
// }
// if(localStorage.losses === undefined){
//     localLosses.innerText= 0;
// }else{
//     localLosses.innerText = localStorage.losses;
// }

// selectWord.addEventListener("click", e => {
//     e.preventDefault();
//     for (let i=0; i<input.value.length; i++){
//         let letters = document.createElement("div");
//         lettersContainer.appendChild(letters);
//         letters.classList.add("div-"+i);
//         letters.classList.add("invisible");
//         letters.style.flex = 1;
//         letters.innerHTML = input.value.charAt(i).toLowerCase()
//     }
//     inputContainer.classList.add("offline")
//     charInputContainer.classList.remove("offline")
// })

// selectLetter.addEventListener("click", e => {
//     e.preventDefault();
//     if(alreadyUsed.length){
//         for(let i=alreadyUsed.length; i>=0; i--){
//             if (alreadyUsed[i] === inputLetter.value.toUpperCase()){ //or == alreadyUsed[alreadyUsed.length-1].value
//                 checkerUsed++
//             }
//         }
//     }
//     alreadyUsed[counterLetter] = inputLetter.value.toUpperCase();
//     if(checkerUsed > 0){
//         alert("you have already used that character");
//         alreadyUsed.splice(counterLetter);
//         counterLetter--;
//     }else if(inputLetter.value.length != 1){
//         alert("Please enter a single letter");
//         alreadyUsed.splice(counterLetter);
//         counterLetter--;
//     }else{
//         for(let i=0; i<input.value.length; i++){
//             if(inputLetter.value.toLowerCase() == input.value.charAt(i).toLowerCase()){
//                 correctAudio.play();
//                 let letterHolder = document.querySelector(".div-"+i);
//                 letterHolder.classList.remove("invisible");
//                 letterHolder.classList.add("clear");
//                 inputChecker = inputLetter.value;
//                 counterCorrect++;
//                 checkWin();
//             }
//         }
//         if(inputChecker == ""){
//             wrongAudio.play();
//             alert("Incorrect letter")
//             let off = document.querySelector(`.ufo-${counterIncorrect}`);
//             off.classList.add("offline");
//             let on = document.querySelector(`.ufo-${(counterIncorrect+1)}`);
//             on.classList.remove("offline");
//             if(counterIncorrect+1 === 8){
//                 loseAudio.play();
//                 alert(`Sorry, you've made too many incorrect guesses, the word is ${input.value}`);
//                 charInputContainer.classList.add("offline");
//                 losses++
//                 let totalLosses = losses;
//                 if(localStorage.losses != null){
//                     totalLosses = losses + parseInt(localStorage.losses);
//                 }
//                 localStorage.setItem("losses", totalLosses)
//                 document.querySelector(".lossesNumber").innerText = totalLosses;
//                 for(let i=0; i<input.value.length; i++){
//                     let letterIdentifier = document.querySelector(".div-"+i);
//                     letterIdentifier.classList.remove("invisible");
//                     letterIdentifier.classList.add("clear")
//                 }
//             }
//             counterIncorrect++;
//         }
        
//     }
//     displayUsedLetters.innerHTML = alreadyUsed;
//     inputLetter.value = "";
//     inputChecker = "";
//     checkerUsed = 0;
//     counterLetter++;
// })

// function checkWin(){
//     if(counterCorrect == input.value.length){
//         winAudio.play();
//         alert("You Win!");
//         charInputContainer.classList.add("offline");
//         document.querySelector(`.ufo-${counterIncorrect}`).classList.add("offline");
//         document.querySelector(".showWin").classList.remove("offline");
//         wins++;
//         let totalWins = wins;
//         if(localStorage.wins != null){
//         totalWins = wins + parseInt(localStorage.wins)
//         }
//         localStorage.setItem("wins", totalWins);
//         document.querySelector(".winsNumber").innerText = totalWins;
//     }
// }

// reset.addEventListener("click", reload => {
//     location.reload();
// })

// input.addEventListener("keyup", e => {
//     if(e.keyCode == 13){
//         e.preventDefault();
//         selectWord.click();
//     }
// })
// inputLetter.addEventListener("keyup", e => {
//     if(e.keyCode === 13){
//         e.preventDefault();
//         selectLetter.click();
//     }
// })

// openB.addEventListener("click", () => {
//     containerPopup.classList.add("visib");
// })
// closeB.addEventListener("click",() => {
//     containerPopup.classList.remove("visib");
// })