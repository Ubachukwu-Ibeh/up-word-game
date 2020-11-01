"use strict";
import { SELECTED } from "./findTheWordsGameTest.js";
const coinDest = document.getElementById("coin-div").getBoundingClientRect();
export const coinMainDiv = document.getElementById("coin-div");
let t;
if (window.innerWidth <= 320) {
  t = 60;
} else if (window.innerWidth >= 1440) {
  t = 100;
} else if (window.innerWidth >= 1280) {
  t = 90;
} else if (window.innerWidth >= 1024) {
  t = 140;
} else if (window.innerWidth >= 600) {
  t = 105;
} else {
  t = 80;
}
export const FLY = () => {
  const FLY_SELECT = [];
  SELECTED.forEach((e) => {
    FLY_SELECT.push(e);
  });
  setTimeout(() => {
    FLY_SELECT.forEach((e) => {
      let c = 0;
      const coinsDiv = document.createElement("div");
      coinsDiv.classList.add("coins-div");
      document.getElementById(`wC${e.id.slice(2)}`).append(coinsDiv);
      const currCoinPos = coinsDiv.getBoundingClientRect();
      const diffX = coinDest.x - currCoinPos.x;
      const diffY = currCoinPos.y - coinDest.y;
      let xDir = 0;
      let yDir = 0;
      const travel = setInterval(() => {
        if (c > 10000) {
          document.getElementById(`wC${e.id.slice(2)}`).removeChild(coinsDiv);
          clearInterval(travel);
        }
        coinsDiv.style.transform = `translate(${xDir}px, ${-yDir}px)`;
        xDir += diffX / 150;
        yDir += diffY / 150;
        c += t;
      }, 1);
    });
  }, 200);
  setTimeout(() => {
    coinMainDiv.classList.add("dim");
  }, 750);
};
