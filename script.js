//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputChar");
const select = document.querySelector(".button-word");
let input = document.querySelector(".user-word");
let input2 = document.querySelector(".user-word-2");
let inputArray = [];

select.addEventListener("click", e => {
    console.log(input.value.length);
    for (let i=0; i<input.value.length; i++){
        let letters = document.createElement("div");
        lettersContainer.appendChild(letters);
        letters.classList.add("invisible");
        letters.classList.add(`${i}`);
        letters.style.flex = 1;
        letters.innerHTML = input.value.charAt(i)
    }
    inputContainer.classList.add("offline")
    charInputContainer.classList.remove("offline")

})
function makeArray(){
    for (let i=0; i<input.value.length; i++){
        inputArray[i] = input.value.charAt(i)
    }
}