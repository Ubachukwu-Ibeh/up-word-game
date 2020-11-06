"use strict";
const soloMode = document.getElementById("solo");
const art = document.getElementById("art");
let i = 0;
const loadArr = [art, soloMode];

setTimeout(() => {
  const runLoad = setInterval(() => {
    //play loadscreen animations
    if (i === 1) {
      clearInterval(runLoad);
    }
    loadArr[i].classList.add("pop");
    i++;
  }, 100);
}, 200);

soloMode.addEventListener("click", () => {
  localStorage.setItem("bot", 1);
  soloMode.classList.add("shake");
});
export let a;