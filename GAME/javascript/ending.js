"use strict";
import { createClone, _components } from "../../clone.js";
import { slideMain } from "./scores.js";
import {
  modifyMoves,
  currScore,
  hasSpelledWrongWord,
  hasSpelledWord
} from "./submit.js";
import { currLevel } from "./findTheWordsGameTest.js";

export const endMain = document.getElementById("end-main");
const vicMain = document.getElementById("vic-main");
const wordCount = document.getElementById("word-count");
const lnd = document.getElementById("level-num-div");
const cde = document.getElementById("coin-div-end");
const okMain = document.getElementById("ok-main");
const line = document.getElementById("line");
const wcn = document.getElementById("w-c-n");
const lndt = document.getElementById("level-num-div-txt");
const cdet = document.getElementById("coin-amt-end");
const n = document.getElementById("points");
const doubleCoins = document.getElementById("double-coins");

const starArr = [
  document.getElementById("star1"),
  document.getElementById("star3"),
  document.getElementById("star2")
];

let v = modifyMoves(0);
export const modifyV = val => (v += val);

const endClick = e => {
  e.style.animation = "shake 0.2s ease";
  e.style.pointerEvents = "none";
  setTimeout(() => {
    history.back(1);
  }, 250);
};

okMain.addEventListener("click", () => {
  endClick(okMain);
});
doubleCoins.addEventListener("click", () => {
  endClick(doubleCoins);
});

let hasUsedPowerUp = false;
export const modifyHasUsedowerUp = val => (hasUsedPowerUp = val);
console.log(_components);
export const END_STAT = e => {
  const endStars = JSON.parse(localStorage.getItem("GS"));
  endStars.numberOfStagesPlayed += 1;

  const POP_UP = (description, key, num) => {
    endStars.achievements[key][0] = true;
    endStars.achievements[key][num] = true;
    setTimeout(() => {
      createClone(
        "Pop-up",
        document.getElementById("pop-up-cont-end")
      ).description = description;
    }, 1000);
  };

  wcn.innerHTML = currScore;
  lndt.innerHTML = currLevel + 1;
  cdet.innerHTML = `+${currScore}`;

  const finRes = modifyMoves(0);
  localStorage.setItem("$movesLeft", finRes);

  let starCalc;
  switch (finRes) {
    case 0:
      starCalc = 1;
      break;
    case 1:
      starCalc = 2;
      break;
    default:
      starCalc = 3;
      break;
  }
  if (endStars.levels[currLevel].stars < starCalc) {
    endStars.levels[currLevel].stars = starCalc;
    for (let i = 0; i < starCalc; i++) {
      if (endStars.numberOfStars < 100) endStars.numberOfStars += 1;
      starArr[i].style.opacity = "1";
      if (i === starCalc - 1 && starCalc < 3) {
        for (let j = i + 1; j < 3; j++) {
          starArr[j].style.opacity = "0.3";
        }
      }
    }
  } else {
    for (let i = 0; i < endStars.levels[currLevel].stars; i++) {
      starArr[i].style.opacity = "1";
      if (i === starCalc - 1 && starCalc < 3) {
        for (let j = i + 1; j < 3; j++) {
          starArr[j].style.opacity = "0.3";
        }
      }
    }
  }
  slideMain.style.display = "flex";
  slideMain.classList.toggle("is-open");
  e.style.display = "flex";
  e.classList.add("end-drop");
  e.classList.toggle("is-open");
  setTimeout(() => {
    vicMain.style.opacity = "1";
    vicMain.classList.add("end-pop-extra");
    setTimeout(() => {
      const endPops = setInterval(() => {
        if (v === finRes) {
          clearInterval(endPops);
          line.style.display = " block";
          wordCount.classList.add("end-pop");
          setTimeout(() => {
            lnd.classList.add("end-pop");
          }, 250);
          setTimeout(() => {
            cde.classList.add("end-pop");
          }, 450);
          setTimeout(() => {
            doubleCoins.classList.add("end-pop-extra");
          }, 650);
          setTimeout(() => {
            okMain.classList.add("end-pop-extra");
            okMain.style.pointerEvents = "auto";
          }, 850);
          if (
            !hasSpelledWrongWord &&
            !endStars.achievements.Play_a_stage_without_a_wrong_spelling[0]
          )
            POP_UP("Perfection", "Play_a_stage_without_a_wrong_spelling", 2);
          if (
            !hasSpelledWord &&
            !endStars.achievements.Finish_a_stage_without_spelling_a_word[0]
          )
            POP_UP(
              "Supreme player",
              "Finish_a_stage_without_spelling_a_word",
              2
            );
          if (
            !hasUsedPowerUp &&
            !endStars.achievements.Finish_a_stage_without_using_power_ups[0]
          )
            POP_UP("Hard worker", "Finish_a_stage_without_using_power_ups", 2);
          if (
            endStars.numberOfStars >= 100 &&
            !endStars.achievements.Get_100_stars[0]
          )
            POP_UP("Star Player", "Get_100_stars", 2);
          // if (!endStars.coinsEarned < 100000) {
          //     const all = [
          //         ['Earn_1000_coins', 'Honest Work', 1000, coinsFromAd],
          //         ['Earn_5000_coins', 'Money Maker', 5000, coinsFromAd],
          //         ['Earn_10000_coins', 'Wealthy', 10000, coinsFromAd],
          //         ['Earn_50000_coins', 'Magnate', 50000, coinsFromAd],
          //         ['Earn_100000_coins', 'Tycoon', 100000, coinsFromAd]
          //     ]
          //     all.forEach(e => {
          //         if (endStars.achievements[e[0]][0] < e[2]) {
          //             endStars.achievements[e[0]][0] += e[3];
          //             if (endStars.achievements[e[0]][0] >= e[2]) {
          //                 POP_UP(e[1]);
          //             }
          //         }
          //     })
          // }
          localStorage.setItem("GS", JSON.stringify(endStars));
        }
        n.innerHTML = `~${v}~`;
        v--;
      }, 50);
    }, 450);
  }, 250);
};
