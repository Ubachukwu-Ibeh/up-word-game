"use strict";
//SOLO
const soloMode = document.getElementById("solo");
const botMode = document.getElementById("bot");
const art = document.getElementById("art");
let i = 0;
const loadArr = [art, soloMode, botMode];
setTimeout(() => {
  const runLoad = setInterval(() => {
    //play loadscreen animations
    if (i === 2) {
      clearInterval(runLoad);
    }
    loadArr[i].classList.add("pop");
    i++;
  }, 100);
}, 200);

const PICK_SOLO = () => {
  localStorage.setItem("bot", 1);
  soloMode.classList.add("shake");
};
soloMode.addEventListener("click", () => {
  PICK_SOLO();
});
//BOT
const PICK_BOT = () => {
  localStorage.setItem("bot", 0);
  botMode.classList.add("shake");
};
botMode.addEventListener("click", () => {
  PICK_BOT();
});
export let a;