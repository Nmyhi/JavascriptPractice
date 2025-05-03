//calculator app
// generate the divs for buttons
document.addEventListener("DOMContentLoaded", (event) => {
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
            console.log("Clicked:", symbol);
        });
    });
};