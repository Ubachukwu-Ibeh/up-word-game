"use strict";
import {
  sortedIdNums,
  END,
  ACT_CLEAR,
  SELECTED,
  powerGrid,
  finalBreak
} from "./findTheWordsGameTest.js";
import { slideMain } from "./scores.js";
import { settingsDiv } from "./settings.js";
import { moveCount, modifyMoves } from "./submit.js";
import { modifyV } from "./ending.js";
import { style } from "../../clone.js";

export const POWER = i => {
  if (!sortedIdNums.length) {
    return;
  }
  if (
    !sortedIdNums.length ||
    slideMain.classList.contains("is-open") ||
    settingsDiv.classList.contains("is-open")
  ) {
    return;
  } else {
    if (SELECTED.length) {
      ACT_CLEAR();
    }
    slideMain.style.display = "flex";
    slideMain.classList.toggle("is-open");
    setTimeout(() => {
      powerGrid.style.display = "flex";
      powerGrid.classList.toggle("is-open");
      i();
    }, 2000);
  }
};

const playCracked = i => {
  const breakElem = document.getElementById(`breakDiv${i}`);
  style(
    {
      display: "block",
      animation: "break-drop 0.5s"
    },
    breakElem
  );
  setTimeout(() => {
    breakElem.style.display = "none";
  }, 490);
};

export const BLAST = () => {
  sortedIdNums.forEach(k => {
    const item = document.getElementById(`pd${k}`);
    item.style.pointerEvents = "none";
  });
  const v = JSON.parse(localStorage.getItem("GS")).vibration;

  const CHANGE = () => {
    sortedIdNums.forEach(e => {
      const currPow = document.getElementById(`wD${e}`);
      const cl = currPow.classList[2];
      const clP = cl.length - 1;
      currPow.classList.remove(cl);
      currPow.classList.add(cl.slice(0, clP) + `${Number(cl.charAt(clP)) + 1}`);
    });

    const checkr = [];
    sortedIdNums.forEach(n => {
      document.getElementById(`powD${n}`).classList.remove("explosion");
      checkr.push(n);
    });

    for (let g = 0; g < checkr.length; g++) {
      for (let i = 0; i < finalBreak.length; i++) {
        if (
          document
            .getElementById(`wD${checkr[g]}`)
            .classList.contains(finalBreak[i])
        ) {
          playCracked(checkr[g]);
          sortedIdNums.splice(sortedIdNums.indexOf(checkr[g]), 1);
          if (sortedIdNums.length === 0) {
            END();
          }
          break;
        }
      }
    }
  };
  let p = 0;
  const blow = setInterval(() => {
    if (v) {
      navigator.vibrate(80);
    }
    if (p === sortedIdNums.length) {
      slideMain.style.display = "none";
      slideMain.classList.toggle("is-open");
      powerGrid.style.display = "none";
      powerGrid.classList.toggle("is-open");
      clearInterval(blow);
      CHANGE();
      return;
    }
    document
      .getElementById(`powD${sortedIdNums[p]}`)
      .classList.add("explosion");
    p++;
  }, 200);
};

export const REAL_BLAST = i => {
  sortedIdNums.forEach(k => {
    const item = document.getElementById(`pd${k}`);
    item.style.pointerEvents = "none";
    item.classList.remove("rim");
  });
  const item = document.getElementById(`powD${i}`);
  item.classList.add("explosion2");
  const currPow = document.getElementById(`wD${i}`);
  const cl = currPow.classList[2];
  const clP = cl.length - 1;
  currPow.classList.remove(cl);
  currPow.classList.add(cl.slice(0, clP) + `${Number(cl.charAt(clP)) + 1000}`); //Hack of the century
  sortedIdNums.splice(sortedIdNums.indexOf(i), 1);
  playCracked(i);
  setTimeout(() => {
    slideMain.style.display = "none";
    slideMain.classList.remove("is-open");
    powerGrid.style.display = "none";
    powerGrid.classList.remove("is-open");
    item.classList.remove("explosion2");
    if (!sortedIdNums.length) {
      END();
    }
  }, 1004);
};
export const BLAST_ONE = () => {
  sortedIdNums.forEach(n => {
    const item = document.getElementById(`pd${n}`);
    item.classList.add("rim");
    item.style.pointerEvents = "auto";
  });
};

sortedIdNums.forEach(n => {
  const item = document.getElementById(`pd${n}`);
  item.addEventListener("click", () => {
    REAL_BLAST(n);
  });
});

const nav = document.getElementById("nav");
export const ADD_MOVES = () => {
  let movesPlus = 0;
  const addMoves = setInterval(() => {
    if (movesPlus === 3) {
      clearInterval(addMoves);
      nav.classList.remove("glow-nav");
      setTimeout(() => {
        slideMain.style.display = "none";
        slideMain.classList.remove("is-open");
        powerGrid.style.display = "none";
        powerGrid.classList.remove("is-open");
      }, 500);
      return;
    }
    movesPlus++;
    modifyMoves(1);
    modifyV(1);
    moveCount.innerHTML = `${Number(moveCount.innerHTML) + 1}`;
    nav.classList.add("glow-nav");
  }, 500);
};
