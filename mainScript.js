//assign main components to constants
const myDisplay = document.querySelector("#display");
const numberButtons = document.querySelector(".numbers");
const operatorButtons = document.querySelector(".operators");

const numbersArray = [0,".", "<",1,2,3,4,5,6,7,8,9];
const operatorsArray = ["=", "+", "-", "**", "*", "/", "C"];

//test
myDisplay.textContent=123456789;
//build calculator
buildCalculator()

//functions
function buildCalculator() {
    for (i in numbersArray) {
        b = numbersArray[i];
        console.log(b)
        let newButton = document.createElement("button");
        newButton.id = `button_${i}`;
        newButton.classList.add("numberButton");
        newButton.value = b;
        newButton.textContent = b;
        numberButtons.appendChild(newButton);
    }

    for (i in operatorsArray) {
        b = operatorsArray[i];
        console.log(b)
        let newButton = document.createElement("button");
        newButton.id = `button_${i}`;
        newButton.classList.add("operatorButton");
        newButton.value = b;
        newButton.textContent = b;
        operatorButtons.appendChild(newButton);
    }
}

