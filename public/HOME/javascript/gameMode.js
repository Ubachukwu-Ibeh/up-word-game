"use strict";

const soloMode = document.getElementById("solo");
const art = document.getElementById("art");
const homePage = document.getElementById('home-page');
localStorage.removeItem('hasEntered');
let check = sessionStorage.getItem('hasEntered');
check && (homePage.style.display = 'none');
let i = 0;
const loadArr = [art, soloMode];

setTimeout(() => {
  const runLoad = setInterval(() => {
    //play loadscreen animations
    if (i === 1) {
      clearInterval(runLoad);
    }
    loadArr[i].classList.add("pop-home");
    i++;
  }, 100);
}, 200);

soloMode.addEventListener("click", () => {
  sessionStorage.setItem("hasEntered", true);
  soloMode.classList.add("shake");
  homePage.style.display = 'none';
});
export let a;