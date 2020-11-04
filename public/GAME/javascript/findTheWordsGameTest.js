"use strict";
/**
 * AH yes..The second module of the game which was my first attempt at creating a visual representation of what I did in the 'theBot.js' module. It was just an experiment so I called it 'findTheWordsGameTest' the word 'Test' was still in the title as I continued expanding the game and I still haven't changed it till this day.
 *
 * Its still a module of death tho. :) #nooblife
 */
import { slideMain } from "./scores.js";
import { coinMainDiv } from "./coinsAnim.js";
import { endMain, END_STAT } from "./ending.js";
import { initSound } from "./submit.js";
import { tubeInterval } from "../components/Tube.js";

export const SELECTED = [];
export const CLEAR = document.getElementById("clear");

const tap = initSound(`../music/click.mp3`);
const awesomeSfx = initSound(`../music/awesome.mp3`);

export const wordDispP = document.getElementById("word-disp-para");
CLEAR.addEventListener("click", () => {
  ACT_CLEAR();
});

export const currLevel = Number(localStorage.getItem("CL"));
document.title = `Level ${currLevel + 1}`;
const defaultBackground = `url(Images/bg.png), ${
  JSON.parse(localStorage.getItem("GS")).levels[currLevel].backgroundGradient
}`;

export const CHANGE_BG = (str, duration) => {
  if (str === defaultBackground) {
    document.body.style.backgroundImage = str;
    return;
  }
  document.body.style.backgroundImage = str;
  setTimeout(() => {
    document.body.style.backgroundImage = defaultBackground;
  }, duration);
};

export const ACT_CLEAR = () => {
  const clickStore = JSON.parse(localStorage.getItem("GS"));
  if (clickStore.vibration) navigator.vibrate(80);
  for (let i = 0; i < i + 1; i++) {
    if (!SELECTED.length) return;
    const clearLett = document.getElementById("lett" + SELECTED[0].id);
    wordDispP.removeChild(clearLett);
    SELECTED[0].classList.remove("selected");
    SELECTED[0].classList.toggle("is-clicked");
    SELECTED.splice(0, 1);
  }
  return;
};
export const ACTION = j => {
  const clickStore = JSON.parse(localStorage.getItem("GS"));
  if (!sortedIdNums.length) return;
  const current = document.getElementById(j);
  current.classList.add("shake");
  setTimeout(() => {
    current.classList.remove("shake");
  }, 198);
  clickStore.sfx && tap.play();
  clickStore.vibration && navigator.vibrate(50);
  coinMainDiv.classList.remove("dim");
  if (current.classList.contains("is-clicked")) {
    current.classList.remove("selected");
    current.classList.toggle("is-clicked");
    let removeLett = document.getElementById("lett" + j);
    wordDispP.removeChild(removeLett);
    SELECTED.splice(SELECTED.indexOf(current), 1);
  } else {
    current.classList.remove("shrink", "glow-white");
    current.classList.toggle("is-clicked");
    current.classList.add("selected");
    const letter = document.createElement("p");
    letter.innerHTML = current.innerText;
    letter.classList.add("letters");
    letter.id = "lett" + j;
    wordDispP.append(letter);
    SELECTED.push(current);
  }
};
import { genWords } from "./wordsFilter.js";
export const lettersId = [];
export const wordDivArr = [];
export const powerGrid = document.getElementById("power-grid");
const WORD_GRID = document.createElement('div');
WORD_GRID.id = 'word-grid';
WORD_GRID.classList.add('word-grid');
const SET_STAGE = () => {
  const ACTUAL_LETTERS = [];
  for (let i = 0; i < genWords.length; i++) {
    const pG = document.createElement("p"); //pG means paragraph.
    pG.innerHTML = genWords.charAt(i);
    ACTUAL_LETTERS.push(pG);
  }
  for (let i = 0; i < genWords.length; i++) {
    const ranLett = Math.floor(Math.random() * ACTUAL_LETTERS.length);
    const wordDiv = document.createElement("div");
    const expCont = document.createElement("div");
    expCont.classList.add("exp-cont");
    expCont.id = `powD${i}`;
    const powerDiv = document.createElement("div");
    powerDiv.classList.add("power-square");
    powerDiv.id = `pd${i}`;
    powerDiv.append(expCont);
    powerGrid.append(powerDiv);
    wordDiv.classList.add("square");
    wordDiv.id = `wD${i}`;
    ACTUAL_LETTERS[ranLett].id = `p${wordDiv.id}`;
    lettersId.push(ACTUAL_LETTERS[ranLett]); //moving all the letters(paragraaphs) with their id's to lettersId for use to reference their parent div. timer.js
    wordDiv.append(ACTUAL_LETTERS[ranLett]);
    wordDivArr.push(wordDiv);
    wordDiv.addEventListener("click", () => {
      ACTION(wordDiv.id);
    });
    const wordCont = document.createElement("div");
    wordCont.classList.add("word-cont");
    wordCont.append(wordDiv);
    wordCont.id = `wC${i}`;
    WORD_GRID.append(wordCont);
    ACTUAL_LETTERS.splice(ranLett, 1);
  }
  document.getElementById('word-grid-holder').appendChild(WORD_GRID);
};
SET_STAGE();

const lv = document.getElementById("level-num");
lv.innerHTML = currLevel + 1;
CHANGE_BG(defaultBackground, 0);

const slots = JSON.parse(localStorage.getItem("GS")).levels[currLevel].layout;

///////////////////ending////////////////////////////////

const awesome = document.getElementById("awesome");
const oops = document.getElementById("oops");
export const oopsDiv = document.getElementById("oops-div");
export let hasEnded = false;

export const END = () => {
  const endLoad = JSON.parse(localStorage.getItem("GS"));
  hasEnded = true;
  clearInterval(tubeInterval.tubeInterval);
  let e;
  slideMain.style.display = "flex";
  !slideMain.classList.contains("is-open") &&
    slideMain.classList.toggle("is-open");

  if (!sortedIdNums.length) {
    endLoad.sfx && awesomeSfx.play();
    e = awesome;
    slideMain.style.backgroundColor = "rgba(128, 0, 128, 0.8)";
    e.style.display = "flex";
    e.classList.add("win");

    setTimeout(() => {
      slideMain.style.display = "none";
      slideMain.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      slideMain.classList.toggle("is-open");
      e.style.display = "none";

      END_STAT(endMain);
    }, 2997);
  } else {
    e = oops;
    slideMain.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    oopsDiv.style.display = "flex";
    e.classList.add("lose");
    const retry = document.getElementById("retry");
    retry.addEventListener("click", () => {
      history.back(1);
    });
    setTimeout(() => {
      retry.classList.add("retry-anim");
    }, 2000);
  }

  if (!endLoad.levels[currLevel].passed && !sortedIdNums.length) {
    endLoad.levels[currLevel].passed = true;
    endLoad.levelsPassed++;
  }
  localStorage.setItem("GS", JSON.stringify(endLoad));
};
///////////////////ending ended////////////////////////////////

/////////////////TEXTURES AREA///////////////////////////
export const idNumbers = [];
export const sortedIdNums = [];
for (let i = 0; i < slots.length; i++) {
  const num = Number(slots[i][0].slice(2));
  idNumbers.push(num);
}
for (let i = 0; i < i + 1; i++) {
  if (!idNumbers.length) break;
  const lowest = Math.min.apply(null, idNumbers);
  sortedIdNums.push(lowest);
  idNumbers.splice(idNumbers.indexOf(lowest), 1);
}
for (let i = 0; i < slots.length; i++) {
  const elem = document.getElementById(slots[i][0]);
  const breakDiv = document.createElement("div");
  breakDiv.classList.add("breakDiv", `${slots[i][1]}-break`);
  breakDiv.id = `breakDiv${slots[i][0].slice(2)}`;
  elem.parentNode.appendChild(breakDiv);
  elem.classList.add("unique", `${slots[i][1]}0`);
}
/////////////////POWER-UP AREA///////////////////////////
export const finalBreak = ["ice1", "wood2", "stone3", "amethyst4", "metal5"];
