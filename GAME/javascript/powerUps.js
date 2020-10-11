"use strict";
import {
  sortedIdNums,
  END,
  ACT_CLEAR,
  SELECTED,
  powerGrid,
  finalBreak,
  hasEnded
} from "./findTheWordsGameTest.js";
import { slideMain } from "./scores.js";
import { settingsDiv } from "./settings.js";
import { style } from "../../clone.js";
import { getRate as setRate } from "../components/Tube.js";

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
    v && navigator.vibrate(80);
    if (p === sortedIdNums.length || hasEnded) {
      if (hasEnded) {
        clearInterval(blow);
        powerGrid.style.display = "none";
        powerGrid.classList.toggle("is-open");
        return;
      } else {
        slideMain.style.display = "none";
        slideMain.classList.toggle("is-open");
        powerGrid.style.display = "none";
        powerGrid.classList.toggle("is-open");
        clearInterval(blow);
        CHANGE();
        return;
      }
    }
    document
      .getElementById(`powD${sortedIdNums[p]}`)
      .classList.add("explosion");
    p++;
  }, 200);
};

export const BLAST_ONE = () => {
  setRate(0.01);
  setTimeout(() => {
    setRate(1 / 20);
  }, 5000);
};

export const ADD_TIME = () => {
  setRate(-1);
};

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
      i === ADD_TIME &&
        !hasEnded &&
        (slideMain.style.backgroundColor = "rgba(0,0,0,0)");
      if (i === BLAST_ONE) {
        slideMain.style.display = "none";
        slideMain.classList.toggle("is-open");
      }
      if (i === BLAST) {
        powerGrid.style.display = "flex";
        powerGrid.classList.toggle("is-open");
      }
      i();
    }, 2000);
  }
};
