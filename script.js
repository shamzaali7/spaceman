//Psuedo code: grab 
const lettersContainer = document.querySelector(".containerLetters");
const select = document.querySelector(".button-word");
let input = document.querySelector(".user-word");

select.addEventListener("click", e => {
    console.log(input.value.length);
    for (let i=0; i<input.value.length; i++){
        let letters = document.createElement("div");
        lettersContainer.appendChild(letters);
        letters.classList.add("underLine");
        letters.classList.add("invisible")
    }
})