//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputLetter");
const selectWord = document.querySelector(".button-word");
const selectLetter = document.querySelector(".button-letter");
const usedLetters = document.querySelector(".box-1")
let input = document.querySelector(".user-word");
let inputLetter = document.querySelector(".user-letter");
let inputChecker = "";
let counterCorrect = 0;
let counterIncorrect = 1;
let counterLetter = 0;
let checkerUsed = 0;
let alreadyUsed = [];


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
    console.log(checkerUsed, "checkerUsed")
    console.log(alreadyUsed)
    if(alreadyUsed.length){
        for(let i=alreadyUsed.length; i>=0; i--){
            console.log(alreadyUsed[i], "alreadyUsed")
            console.log(inputLetter.value, "inputLetter")
            if (alreadyUsed[i] === inputLetter.value.toUpperCase()){ //or == alreadyUsed[alreadyUsed.length-1].value
                console.log(alreadyUsed[i], "alreadyUsed41")
                console.log(inputLetter.value, "inputLetter42")
                checkerUsed++
            }
        }
    }
    alreadyUsed[counterLetter] = inputLetter.value.toUpperCase();
    console.log(checkerUsed, "checkerUsed")
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
                    for(let i=0; i<input.value.length; i++){
                        let letterIdentifier = document.querySelector(".div-"+i);
                        letterIdentifier.classList.remove("invisible");
                    }
                }
                counterIncorrect++;
            }
        
    }
    usedLetters.innerHTML = alreadyUsed;
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
    }
}

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