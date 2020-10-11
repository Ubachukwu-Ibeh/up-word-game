"use strict";

/**
 * Another spaghettified module of chaos during the time of my noobishness & before the time of clone. Good luck.
 * */

import {
  SELECTED,
  wordDispP,
  sortedIdNums,
  END,
  finalBreak,
  CHANGE_BG
} from "./findTheWordsGameTest.js";
import { FLY } from "./coinsAnim.js";
import { VALID } from "./theBot.js";
import { score } from "./scores.js";
import { createClone, style } from "../../clone.js";
export const initSound = url => {
  const sound = new Audio(url);
  sound.preload = "auto";
  return sound;
};
const currGS = JSON.parse(localStorage.getItem("GS"));
export let moves = currGS.levels[Number(localStorage.getItem("CL"))].moves;
export const modifyMoves = val => (moves += val);
export let actCoins = currGS.coins;

const coinsCont = document.getElementById("coin-amt");
coinsCont.innerHTML = `x ${actCoins}`;

const correct = initSound(`music/correct.mp3`);
const wrong = initSound(`music/wrong.mp3`);
const beenSpelled = initSound(`music/beep.wav`);
const crack = initSound(`music/Crack.mp3`);
const breakSfx = initSound(`music/Break.mp3`);

const FORMED_LIST = document.getElementById("wf1");
const SUBMIT_BUTTON = document.getElementById("sub");
SUBMIT_BUTTON.addEventListener("click", () => {
  SUBMIT();
});

const POP_UP = (description, storage, achName, num) => {
  storage.achievements[achName][num] = true;
  setTimeout(() => {
    createClone(
      "Pop-up",
      document.getElementById("pop-up-cont")
    ).description = description;
  }, 1000);
};

export let hasSpelledWrongWord = false;
export let hasSpelledWord = false;
export let currScore = 0;
let formedWordCount = 0;
export const formedWordsColl = [];

export const SUBMIT = () => {
  //everything that happens when submit button is clicked.
  SUBMIT_BUTTON.classList.add("shake");
  setTimeout(() => {
    SUBMIT_BUTTON.classList.remove("shake");
  }, 198);

  const subStore = JSON.parse(localStorage.getItem("GS"));

  if (SELECTED.length) {
    let formedWord = "";

    for (let i = 0; i < SELECTED.length; i++)
      formedWord += SELECTED[i].innerText;
    if (formedWordsColl.includes(formedWord)) {
      CHANGE_BG(`linear-gradient(rgb(255, 196, 0), rgb(255, 196, 0))`, 198); //play brown background anim if word is has already been spelled.
      return subStore.sfx && beenSpelled.play();
    }
    if (VALID.includes(formedWord)) {
      //checks if formed word is a valid word.
      if (subStore.sfx === true) correct.play();
      CHANGE_BG(`linear-gradient(rgb(0, 255, 55), rgb(0, 255, 55))`, 198); //play green background anim if word is valid.
      formedWordsColl.push(formedWord);

      const current = document.createElement("p");
      const currentDiv = document.createElement("div");
      const currentLengthDiv = document.createElement("div");
      currentLengthDiv.classList.add("red-circle");
      currentDiv.classList.add("curr-div");
      const currentLengthP = document.createElement("p");
      current.innerHTML = formedWord;
      current.id = `w${formedWordCount}`;
      formedWordCount++;
      currentLengthDiv.append(currentLengthP);
      currentDiv.append(current, currentLengthDiv);
      FORMED_LIST.append(currentDiv); //adds the word you formed to the 'YOUR WORDS LIST'. <-- this is an old comment, helps a little(which is the point of comments)
      const addScore = formedWord.length;

      if (
        formedWord.length >= 10 &&
        !subStore.achievements.Spell_a_10_letter_word_or_more[0]
      ) {
        POP_UP("Smarty Pants", subStore, "Spell_a_10_letter_word_or_more", 2);
        subStore.achievements.Spell_a_10_letter_word_or_more[0] = true;
      }

      currentLengthP.innerHTML = `${addScore}`;

      FLY(); //plays coins animation.

      actCoins += 9e4; //adds coins
      subStore.coins = actCoins; //store current coins you have in memory.
      coinsCont.innerHTML = `x ${actCoins}`; //display coins amount in game.

      currScore += addScore; //counts the length of your word as the score.
      score.innerHTML = currScore;

      const noChoice = []; //Can't remember why this does what it does lol..I mean look at its name which btw means I had no choice.

      SELECTED.forEach(e => {
        noChoice.push(e);
      });

      for (let i = 0; i < i + 1; i++) {
        // Does this for every block you selected and clears them.
        if (!SELECTED.length) {
          setTimeout(() => {
            noChoice.forEach(e => {
              e.classList.remove("glow-white", "shrink");
            });
          }, 300);

          setTimeout(() => {
            if (!moves || !sortedIdNums.length) END(awesome, oops); //If you've run out of moves or cleared all the blocks. Has a timeout to wait for coins animation to play to prevent lag from the animation that comes after.
          }, 1160);

          if (!subStore.wordsSpelled.includes(formedWord)) {
            subStore.wordsSpelled.push(formedWord);
            const all = [
              ["Spell_50_words", "Welcome to the Game", 50, 1],
              ["Spell_100_words", "Spelling Bee Champion", 100, 1],
              ["Spell_200_words", "Walking Dictionary", 200, 1]
            ];

            all.forEach(e => {
              if (subStore.achievements[e[0]][0] < e[2]) {
                subStore.achievements[e[0]][0] += e[3];
                if (subStore.achievements[e[0]][0] === e[2]) {
                  POP_UP(e[1], subStore, e[0], 3);
                }
              }
            });
          }
          //Notice how organised the code is from line 146 - 184? that was me not being a noob ;)
          if (!subStore.coinsEarned < 100000) {
            const all = [
              ["Earn_1000_coins", "Honest Work", 1000, addScore],
              ["Earn_5000_coins", "Money Maker", 5000, addScore],
              ["Earn_10000_coins", "Wealthy", 10000, addScore],
              ["Earn_50000_coins", "Magnate", 50000, addScore],
              ["Earn_100000_coins", "Tycoon", 100000, addScore]
            ];
            all.forEach(e => {
              if (subStore.achievements[e[0]][0] < e[2]) {
                subStore.achievements[e[0]][0] += e[3];
                if (subStore.achievements[e[0]][0] >= e[2]) {
                  POP_UP(e[1], subStore, e[0], 3);
                }
              }
            });
          }
          hasSpelledWord = true;
          localStorage.setItem("GS", JSON.stringify(subStore));
          return;
        }

        const clearLett = document.getElementById(`lett${SELECTED[0].id}`);

        wordDispP.removeChild(clearLett);
        SELECTED[0].classList.remove("selected");
        SELECTED[0].classList.add("shrink", "glow-white");
        SELECTED[0].classList.toggle("is-clicked");
        if (SELECTED[0].classList.contains("unique")) {
          const cl = SELECTED[0].classList[2];
          const clP = cl.length - 1;
          SELECTED[0].classList.remove(cl);
          SELECTED[0].classList.add(
            cl.slice(0, clP) + `${Number(cl.charAt(clP)) + 1}`
          );
          const canPlay = subStore.sfx;
          for (let g = 0; g < finalBreak.length; g++) {
            if (SELECTED[0].classList.contains(finalBreak[g])) {
              canPlay && breakSfx.play();
              const idNum = SELECTED[0].id.slice(2),
                breakElem = document.getElementById(`breakDiv${idNum}`);
              setTimeout(() => {
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
              }, 250);
              sortedIdNums.splice(sortedIdNums.indexOf(Number(idNum)), 1);
              break;
            } else {
              canPlay && crack.play();
            }
          }
        }
        SELECTED.splice(0, 1);
      }
    } else {
      subStore.sfx && wrong.play();
      hasSpelledWrongWord = true;
      CHANGE_BG(`linear-gradient(rgb(255, 0, 0), rgb(255, 0, 0))`, 198); //red background for wrong word
    }
  } else return;
};
