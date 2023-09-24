const playbtn = document.querySelector(".button");
const play = document.querySelector(".play");
const panel = document.querySelector(".panel");
const main = document.querySelector(".circles");
playbtn.addEventListener("click", () => {
  play.style.display = "none";
  panel.style.display = "flex";
  main.style.display = "flex";
  start();
})
function start() {
  let timeLeft = 60;
  let bubbleint;
  let hittext = 0;
  let scoreint = 0;
  let bubble = "";
  let target = targetf();
  function targetf(){
    let targetsint = [
  100, 110, 120, 130, 140, 150, 160, 170, 180, 190,
  200, 210, 220, 230, 240, 250, 260, 270, 280, 290,
  300, 310, 320, 330, 340, 350, 360, 370, 380, 390,
  400
];
   return targetsint[Math.floor(Math.random() * 31)];
  }
 console.log(target)
 
  function hit() {
    const hitdiv = document.getElementById("hit");
    hittext = Math.floor(Math.random() * 20);
    hitdiv.textContent = Math.floor(hittext);
  }

  function score(int) {
    let scorediv = document.getElementById("score");
    scoreint += int;
    scorediv.textContent = scoreint;
  }

  let int = numbers();
  let bubbulediv = document.querySelector(".circles");

  function createbubbule() {
    for (var i = 0; i < int.length; i++) {
      if(int.length > 20){
        int.shift()
      }
      bubbleint = int[i];
      bubble += `<div class="circle">${bubbleint}</div>`
      bubbulediv.innerHTML = bubble;
      document.querySelector("#target").textContent = target;
      /*let circle = document.createElement("div");
      circle.textContent = bubbleint;
      circle.classList.add("circle");
      bubbulediv.appendChild(circle);
      */
    }
  };

  createbubbule();
  let interval = setInterval(() => {
    int = numbers();
    let changeint = document.querySelectorAll(".circle");
    if (timeLeft > 0) {
      if(int.length > 20){
        int.shift();
        console.log(int);
      }
      for (var i = 0; i < int.length; i++) {
       changeint[i].textContent = int[i];
       }
    }
   console.log(int);
  }, 3000);

  function numbers() {
    let intarray = [];
    for (var i = 0; i < 20; i++) {
      intarray.push(Math.floor(Math.random() * 20));
    }
    if (intarray.includes(hittext)) {
      return intarray;
    } else {
      intarray.push(hittext);
      return intarray;
    }
  }

  let buttons = document.querySelectorAll(".circle");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent == hittext) {
        button.style.backgroundColor = "green";
        function rightbtn() {
          button.style.backgroundColor = "white"
        }
        setTimeout(rightbtn, 1000)
        score(10);
        hit();
      } else {
        button.style.backgroundColor = "red";

        function wrongbtn() {
          button.style.backgroundColor = "white"
        }
        setTimeout(wrongbtn, 1000)
      }
    })
  })

  function updateTimer() {
    if (timeLeft > 0) {
      document.getElementById('time').textContent = `${timeLeft}`;
      timeLeft--;
      setTimeout(updateTimer, 1000);
    } else {
      bubbleint = '';
      hittext = 0;
      bubble = "";
      int = [];
      let bubbulediv = document.querySelector(".circles");
      document.getElementById('time').textContent = "0";
      document.getElementById("hit").textContent = "0";
      document.getElementById("score").textContent = "0";
      document.getElementById("target").textContent = "0";
      while (bubbulediv.firstChild) {
        bubbulediv.removeChild(bubbulediv.firstChild);
      }
        let end = document.querySelector(".gameend")
        let para = document.querySelector(".gameover p");
        if(scoreint => target){
        para.textContent = `Your score is ${scoreint}, And you are won the game!!`
        };
        if(scoreint < target){
para.textContent = `Your score is ${scoreint}, unfortunately you lost the game, Better next time.`
        }
        
        end.style.display = "block";
   
    };
  }

  updateTimer();
}
start();

let playagain = document.querySelector(".restart");

playagain.addEventListener("click", () => {
  let end = document.querySelector(".gameend");
  end.style.display = "none";
  scoreint = 0;
  start()
});
