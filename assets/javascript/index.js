//calculator app
document.addEventListener("DOMContentLoaded", (event) => {
    for (let i = 0; i < 20; i++) {
        let div = document.createElement("div");
        div.classList.add("button")
        document.getElementById("buttons").appendChild(div);
      };
  });