
//calculator app
let display;
let currentNum = "";
let prevNum = "";
let operation = null;
let resetDisplay = false;
// generate the divs for buttons
document.addEventListener("DOMContentLoaded", (event) => {
    display = document.getElementById("display-text");

    for (let i = 0; i < 20; i++) {
        let div = document.createElement("div");
        div.classList.add("button");
        document.getElementById("buttons").appendChild(div);
    };
    appendSymbols();
    appendEventlisteners();
});


//Function for appending the symbols to the buttons
function appendSymbols() {
    let buttons = document.getElementsByClassName("button");
    let calcSymbols = ["n/a","CE","C","<=","7","8","9","/","4","5","6","X","1","2","3","-","+/-","0",".","+"];
    //Adding data attributes
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("data-symbol", `${calcSymbols[i]}`);
    };
    // Adding a <P> symbol shild to each div corresponding with the indexes to "Draw" the layout
    for (let i = 0; i < buttons.length; i++) {
        let p = document.createElement("p");
        p.innerText = calcSymbols[i];
        buttons[i].appendChild(p);
    }
};

function appendEventlisteners() {
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let symbol = button.getAttribute("data-symbol");
            handleClick(symbol);
        });
    });
    document.getElementById("equals").addEventListener("click", calculateResult);
};

//



function handleClick(symbol) {
    if (!isNaN(symbol) || symbol === '.') {
        appendNumber(symbol);
    } else if (['+', '-', 'X', '/'].includes(symbol)) {
        chooseOperation(symbol);
    } else if (symbol === 'C') {
        clearAll();
    } else if (symbol === 'CE') {
        clearEntry();
    } else if (symbol === '<=') {
        deleteDigit();
    } else if (symbol === '+/-') {
        toggleSign();
    }
}

function appendNumber(number) {
    if (resetDisplay) {
        currentNum = "";
        resetDisplay = false;
    }
    if (number === '.' && currentNum.includes('.')) return;
    currentNum += number;
    updateDisplay(currentNum);
}

function updateDisplay(value) {
    display.innerText = value || '0';
}

function chooseOperation(op) {
    if (currentNum === "") return;
    if (prevNum !== "") calculateResult();
    operation = op;
    prevNum = currentNum;
    currentNum = "";
    resetDisplay = false;
}

function calculateResult() {
    let computation;
    const prev = parseFloat(prevNum);
    const current = parseFloat(currentNum);
    if (isNaN(prev) || isNaN(current)) return;

    switch(operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'X':
            computation = prev * current;
            break;
        case '/':
            computation = current !== 0 ? prev / current : 'Cannot divide by 0';
            break;
        default:
            return;
    }

    currentNum = computation.toString();
    operation = undefined;
    prevNum = "";
    updateDisplay(currentNum);
    resetDisplay = true;
}

function clearAll() {
    currentNum = "";
    prevNum = "";
    operation = null;
    updateDisplay('0');
}

function clearEntry() {
    currentNum = "";
    updateDisplay('0');
}

function deleteDigit() {
    currentNum = currentNum.slice(0, -1);
    updateDisplay(currentNum || '0');
}

function toggleSign() {
    currentNum = currentNum.startsWith('-') 
        ? currentNum.slice(1) 
        : '-' + currentNum;
    updateDisplay(currentNum);
}