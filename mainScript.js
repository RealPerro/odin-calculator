//assign main components to constants
const myDisplay = document.querySelector("#display");
const numberButtons = document.querySelector(".numbers");
const operatorButtons = document.querySelector(".operators");
const myBody = document.querySelector("body");

//create building arrays
const numbersArray = ["0",".", "<","1","2","3","4","5","6","7","8","9"];
const operatorsArray = ["=", "+", "-", "**", "*", "/", "C"];
const functionLink = {"=":operate, "+":suma, "-":resta, "**":eleva, 
                        "*":multiplica, "/":divide, "c":clearMemory}

//initialize calculator
let currentNumber = "";
let nextNumber = "";
let currentOperator = "";
let currentState = "a";
let valueToDisplay = "0";

//build calculator
buildCalculator()
myDisplay.textContent = `${valueToDisplay}`

//assign all buttons
const allButtons = document.querySelectorAll("button");

//add event listener for clicks
allButtons.forEach(function(i) {
    i.addEventListener('click', clickParser);
})

myBody.addEventListener("click", () => {updateDisplay()})


//functions
function formatNumber(n) {
    let result = (n == '') ? '' : parseFloat(n).toLocaleString('en-US');
    return result;
}

//update display
function updateDisplay() {
    valueToDisplay = currentState == "a" ? `${formatNumber(currentNumber)} ${currentOperator}`: `${formatNumber(currentNumber)} ${currentOperator} ${formatNumber(nextNumber)}`;
    myDisplay.textContent = `${valueToDisplay}`};

//build calculator
function buildCalculator() {
    for (i in numbersArray) {
        b = numbersArray[i];
        console.log(b)
        let newButton = document.createElement("button");
        newButton.id = `button_${b}`;
        newButton.classList.add("numberButton");
        newButton.value = b;
        newButton.textContent = b;
        numberButtons.appendChild(newButton);
    }

    for (i in operatorsArray) {
        b = operatorsArray[i];
        console.log(b)
        let newButton = document.createElement("button");
        newButton.id = `button_${b}`;
        newButton.classList.add("operatorButton");
        newButton.value = b;
        newButton.textContent = b;
        operatorButtons.appendChild(newButton);
    }
}

//math functions
function suma(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a+b;
}

function resta(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a-b;
}

function multiplica(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a*b;
}

function eleva(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a**b;
}

function divide(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a/b;
}

//additional calculator functions
function clearMemory() {
    currentNumber = "";
    nextNumber = "";
    currentOperator = "";
    currentState = "a";   
}

function operate (a = currentNumber, c = currentOperator, b = nextNumber) {
    console.log(`initial input: a = ${a}, operator = ${c}, b = ${b}, state = ${currentState}`);
    currentNumber = (currentNumber != "") ? currentNumber : 0;
    nextNumber = (nextNumber != "") ? nextNumber : 0;
    currentOperator = (currentOperator != "") ? currentOperator : "+";
    myFunction = functionLink[c];
    let result = myFunction(a, b);
    console.log(`final a = ${currentNumber}, operator = ${currentOperator}, b = ${nextNumber}, state = ${currentState}`);
    return result.toString();
}

//input parser
function clickParser(e) {
    let currentElement = this;
    let currentInput = this.value
    console.log(`initial input= ${currentInput}, currentNumber = ${currentNumber}, operator = ${currentOperator}, b = ${nextNumber}, state = ${currentState}`);
    currentElement.classList.add("clicked");
    setTimeout(function() {currentElement.classList.remove("clicked");}, 300);

    if (currentInput == '.') {
        if (currentState == "a" && currentNumber.includes(".")) {return null;}
        if (currentState == "b" && nextNumber.includes(".")) {return null;}
    }
    
    if (currentInput == 'C') {
        clearMemory();
        return;
    }

    if (currentInput == "=") {
        if (currentState == "b"){
            currentNumber = operate();
            nextNumber = "";
            currentOperator = "";
            currentState = "a";
            return;
        }
        else {null}
    }

    if (currentInput == "<") {
        if (currentState == "a") {
            currentNumber = currentNumber.slice(0,-1);}
        else if  (state == "b") {
            nextNumber = currentNumber.slice(0,-1);}
        return;
    }

    if (operatorsArray.includes(this.value) && this.value != "="){
        if (currentState == "a") {
            currentOperator = this.value;
            currentState = "b";}
        else {
            currentNumber = operate();
            nextNumber = "";
            currentOperator = this.value;
            currentState = "b";
        }
    }

    if (numbersArray.includes(this.value)) {
        if (currentState =="a") {
            currentNumber = currentNumber + currentInput
        } else if (currentState =="b") {
            nextNumber = nextNumber + currentInput
        }
    }
    console.log(`input= ${currentInput}, a = ${currentNumber}, operator = ${currentOperator}, b = ${nextNumber}, state = ${currentState}`);
    updateDisplay()
    
}