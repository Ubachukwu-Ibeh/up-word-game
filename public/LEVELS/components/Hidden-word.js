"use strict";
import { create as c, component, style, createClone } from "../../clone.js";
import {
  unlockWordTabClone,
  modifyHiddenWordArrUnlock
} from "./Unlock-word-tab.js";
import { modifyHiddenWordArr } from "./Shop-item.js";
import { wordInfoTabClone } from "./Word-info-tab.js";
import { D_M_C } from "./Discover-main-container.js";
import { tap } from "./Display-menus.js";

let allHiddenWordsArr = [];
let count = 0;
const storage = JSON.parse(localStorage.getItem("GS"));

component("Hidden-word", () => c("div", {}, ["costDiv"]), {
  props: {
    costDiv() {
      if (storage.hiddenWords[count][2]) {
        return c("p", {}, `${storage.hiddenWords[count][0]}`);
      } else {
        return c("div", {}, ["coinImage"], ["price"]);
      }
    },
    price: "",
    coinImage() {
      return c("div");
    }
  },
  states: {
    STRIKE() {
      const myHiddenWordsArr = storage.hiddenWords[count];
      this.word = myHiddenWordsArr[0];
      this.meaning = myHiddenWordsArr[1];
      let hasBeenUnlocked = myHiddenWordsArr[2],
        canBeAfforded = false;
      this.cloneNum = count;
      count++;
      let width = this.word.length;

      if (!hasBeenUnlocked) {
        this.statePrice = width * 100;
        this.price = `${this.statePrice}`;

        style(
          {
            margin: "auto",
            display: "flex",
            "font-size": "5pt",
            "text-align": "center",
            color: "white",
            "font-family": "box2"
          },
          this.costDiv
        );

        style(
          {
            margin: "auto",
            width: "5px",
            height: "5px",
            "background-image": "url(Images/coin-1_0005_Ellipse-1-copy-10.png)",
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "margin-left": "5px",
            "margin-right": "2px"
          },
          this.coinImage
        );
        canBeAfforded = storage.coins >= this.statePrice;
      } else {
        style(
          {
            margin: "auto",
            color: "white",
            "font-size": "6pt",
            "font-family": "box2",
            "text-shadow":
              "-.8px -.8px 0 purple, .8px -.8px 0px purple, -.8px .8px 0px purple, .8px .8px 0px purple"
          },
          this.costDiv
        );
      }
      style(
        {
          margin: "auto",
          opacity: canBeAfforded || hasBeenUnlocked ? "1" : "0.5",
          "pointer-events": canBeAfforded || hasBeenUnlocked ? "auto" : "none",
          height: "20px",
          display: "flex",
          margin: "5px auto",
          width: `${width * 10}px`,
          "border-radius": "5px",
          "background-image": !hasBeenUnlocked
            ? "linear-gradient(rgb(25, 230, 183), rgb(25, 150, 122), rgb(25, 120, 120), rgb(25, 120, 120))"
            : "linear-gradient(rgb(255, 230, 183), rgb(255, 145, 2), rgb(255, 166, 0), rgb(255, 208, 0))",
          "box-shadow": "0px 3px 5px rgba(0, 0, 0, 0.3)",
          border: "2px solid white"
        },
        this.main
      );

      this.main.addEventListener("click", () => {
        const storage = JSON.parse(localStorage.getItem("GS"));

        storage.sfx && tap.play();
        
        if (this.hasBeenUnlocked || hasBeenUnlocked) {
          wordInfoTabClone.main.style.display = "flex";
          wordInfoTabClone.word = `${this.word}`;
          wordInfoTabClone.meaning = `${this.meaning}`;
        } else {
          unlockWordTabClone.main.style.display = "flex";
          unlockWordTabClone.price = `${this.statePrice}`;
          unlockWordTabClone.clickedWord = this;
        }
      });
      allHiddenWordsArr = [...allHiddenWordsArr, this];
    }
  }
});
export const discBoard = document.getElementById("disc-words-main");
for (let i = 0; i < storage.hiddenWords.length; i++) {
  createClone("Hidden-word", D_M_C.discWordsMain);
}
modifyHiddenWordArr(allHiddenWordsArr);
modifyHiddenWordArrUnlock(allHiddenWordsArr);
