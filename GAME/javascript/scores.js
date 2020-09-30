"use strict";
import { settingsDiv } from "./settings.js";
const formedDiv = document.getElementById("formed-div");
export const score = document.getElementById("my-score");
score.innerHTML = "0";
export const slideMain = document.getElementById("slide-main");
const x1 = document.getElementById("x1");
const myWords = document.getElementById("my-words");
const F_LIST = (item) => {
  if (
    document.getElementById(item).classList.contains("is-open") ||
    settingsDiv.classList.contains("is-open") ||
    slideMain.classList.contains("is-open")
  )
    return;
  const currItem = document.getElementById(item);
  const currFormed = document.getElementById("wf1");
  slideMain.style.display = "flex";
  slideMain.classList.toggle("is-open");
  formedDiv.style.display = "flex";
  currItem.classList.add("fdiv-show");
  currItem.classList.toggle("is-open");
  setTimeout(() => {
    currFormed.style.display = "flex";
  }, 201);
};
myWords.addEventListener("click", () => {
  F_LIST("fd1");
});
export const F_LIST_HIDE = (item) => {
  if (document.getElementById(item).classList.contains("is-open")) {
    const currItem = document.getElementById(item);
    const currFormed = document.getElementById("wf1");
    currFormed.style.display = "none";
    slideMain.style.display = "none";
    slideMain.classList.toggle("is-open");
    formedDiv.style.display = "none";
    currItem.classList.remove("fdiv-show");
    currItem.classList.toggle("is-open");
  }
  return;
};
x1.addEventListener("click", () => {
  F_LIST_HIDE("fd1");
});
slideMain.addEventListener("click", () => {
  if (settingsDiv.classList.contains("is-open")) {
    settingsDiv.style.display = "none";
    settingsDiv.classList.toggle("is-open");
    slideMain.style.display = "none";
    slideMain.classList.remove("is-open");
  }
});
