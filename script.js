//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const inputContainer = document.querySelector(".containerInput");
const charInputContainer = document.querySelector(".containerInputLetter");
const select = document.querySelector(".button-word");
const selectLetter = document.querySelector(".button-letter");
let input = document.querySelector(".user-word");
let inputLetter = document.querySelector(".user-letter");
let inputArray = [];

select.addEventListener("click", e => {
    e.preventDefault();
    console.log(input.value.length);
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
    console.log(inputLetter.value)
    for(let i=0; i<input.value.length; i++){
        if(inputLetter.value == input.value.charAt(i).toLowerCase()){
            let letterHolder = document.querySelector(".div-"+i);
            letterHolder.classList.remove("invisible");
            
        }
    }
    inputLetter.value = "";
})


// function makeArray(){
//     for (let i=0; i<input.value.length; i++){
//         inputArray[i] = input.value.charAt(i)
//     }
// }