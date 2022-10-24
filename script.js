//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputLetter");
const select = document.querySelector(".button-word");
const selectLetter = document.querySelector(".button-letter");
let input = document.querySelector(".user-word");
let inputLetter = document.querySelector(".user-letter");
let inputChecker = "";
let counterCorrect = 0;
let counterIncorrect = 1;

input.addEventListener("Enter", e => {
    if(e.key === "Enter"){
        e.preventDefault();
        select.click();
    }
})
inputLetter.addEventListener("Enter", e => {
    if(e.key === "Enter"){
        e.preventDefault();
        selectLetter.click();
    }
})

select.addEventListener("click", e => {
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
    inputLetter.value = "";
    inputChecker = "";
})


function checkWin(){
    if(counterCorrect == input.value.length){
        alert("You Win!");
        charInputContainer.classList.add("offline");
        document.querySelector(`.ufo-${counterIncorrect}`).classList.add("offline");
        document.querySelector(".showWin").classList.remove("offline");
    }
}