"use strict";
import {
  create as c,
  component,
  createClone,
  style,
  redefineProperty
} from "../../clone.js";
import {
  coinsClone,
  outerCoinsClone,
  coinsCloneDisc
} from "./Coins.js";
import {
  achievementsArr
} from "./Achievement.js";
import {
  modifyJustAchieved
} from "./Achievements-main-container.js";
import {
  cash,
  tap
} from "./Display-menus.js";

let allHiddenWordsArr = [];
export const modifyHiddenWordArrUnlock = arr => {
  allHiddenWordsArr = arr;
};

component("Unlock-word-tab", () => c("div", {}, ["mainTab"]), {
  props: {
    mainTab() {
      return c("div", {}, ["question"], ["costDiv"], ["options"]);
    },
    question() {
      return c("p", {}, "Do you want to unlock this word?");
    },
    costDiv() {
      return c("div", {}, c("p", {}, "Cost:"), ["coinImage"], ["price"]);
    },
    coinImage() {
      return c("div");
    },
    price: "",
    options() {
      return c("div", {}, ["cancelBtn"], ["unlockBtn"]);
    },
    unlockBtn() {
      return c(
        "div", {
          class: "ok-ach"
        },
        c("p", {}, "Yes")
      );
    },
    cancelBtn() {
      return c(
        "div", {
          class: "ok-ach"
        },
        c("p", {}, "No")
      );
    }
  },
  states: {
    STRIKE() {
      const POP_UP = (description, storage, num, key) => {
        const [achOBJ] = achievementsArr.filter(
          e => e.title.textContent === description
        );
        achOBJ.medal.style.backgroundImage =
          "url(Images/medal_0001_Rectangle-1-copy-5.png)";
        achOBJ.bar.style.width = `${achOBJ.bar.parentNode.style.width}`;

        modifyJustAchieved([key, achOBJ, 2]);

        achOBJ.newTxt.style.display = "flex";

        achOBJ.amount = "100%";

        storage.achievements[`Unlock_${num}_words`][2] = true;
        storage.achievements[`Unlock_${num}_words`][0] = true;

        createClone(
          "Pop-up",
          document.getElementById("pop-up-cont")
        ).description = description;
      };

      style({
          display: "none",
          margin: "auto",
          width: "inherit",
          height: "inherit",
          "background-color": "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          "z-index": "1"
        },
        this.main
      );

      style({
          margin: "auto",
          display: "flex",
          "flex-direction": "column",
          "background-color": "rgb(200, 255, 200)",
          height: "25%",
          width: "75%",
          padding: "10px 20px",
          "border-radius": "10px",
          "box-shadow": "0px 0px 5px rgba(0, 0, 0, 0.5)",
          animation: "poprise 0.2s ease",
          "font-family": "box3"
        },
        this.mainTab
      );

      style({
          margin: "auto",
          display: "flex",
          "font-family": "box2",
          "font-size": "5pt",
          "text-align": "center",
          color: "rgb(230, 100, 20)",
          "font-size": "12pt"
        },
        this.costDiv
      );

      style({
          margin: "auto",
          width: "20px",
          height: "20px",
          "background-image": "url(Images/coin-1_0005_Ellipse-1-copy-10.png)",
          "background-size": "contain",
          "background-repeat": "no-repeat",
          "background-position": "center",
          "margin-left": "5px",
          "margin-right": "2px"
        },
        this.coinImage
      );

      style({
          margin: "auto",
          "font-size": "14pt",
          "text-align": "center",
          color: "rgb(85, 19, 19)"
        },
        this.question
      );

      style({
          display: "flex",
          width: "100%",
          margin: "auto"
        },
        this.options
      );

      style({
          margin: "auto",
          width: "45%",
          height: "50px",
          "font-size": "20pt"
        },
        this.cancelBtn
      );

      style({
          margin: "auto",
          width: "45%",
          height: "50px",
          "font-size": "20pt",
          border: "2px solid rgba(50, 126, 0, 0.7)"
        },
        this.unlockBtn
      );

      style({
          "background-image": "linear-gradient(rgb(255, 230, 183), rgb(255, 145, 2), rgb(255, 166, 0), rgb(255, 208, 0))",
          border: "2px solid rgb(255, 130, 2)"
        },
        this.cancelBtn
      );

      this.cancelBtn.addEventListener(
        "click",
        () => (this.main.style.display = "none")
      );

      this.unlockBtn.addEventListener("click", () => {
        style({
            animation: "shake 0.2s ease",
            "pointer-events": "none"
          },
          this.unlockBtn
        );

        const storage = JSON.parse(localStorage.getItem("GS"));
        if (storage.sfx) {
          tap.play();
          cash.play();
        }
        const clickedWord = this.clickedWord;
        storage.coins -= clickedWord.statePrice;

        [coinsClone, coinsCloneDisc, outerCoinsClone].forEach(e => {
          e.coins = `${storage.coins}`;
          e.internalCoinsCounter = storage.coins;
        })
        storage.hiddenWords[clickedWord.cloneNum][2] = true;

        clickedWord.hasBeenUnlocked = true;

        if (storage.numberOfUnlockedWords < 100) {
          storage.numberOfUnlockedWords += 1;

          switch (storage.numberOfUnlockedWords) {
            case 10:
              POP_UP("Curious Cat", storage, 10, "Unlock_10_words");
              break;
            case 20:
              POP_UP("Discoverer", storage, 20, "Unlock_20_words");
              break;
            case 50:
              POP_UP("Word Hunter", storage, 50, "Unlock_50_words");
              break;
            case 100:
              POP_UP("Etymologist", storage, 100, "Unlock_100_words");
              break;
          }
        }

        setTimeout(() => {
          style({
              animation: undefined
            },
            this.unlockBtn
          );
          this.mainTab.style.animation = "elevate 0.8s ease";
          setTimeout(() => {
            this.main.style.display = "none";
            this.mainTab.style.animation = "poprise 0.2s ease";

            redefineProperty("costDiv", "revealedWord", clickedWord);
            clickedWord.revealedWord = c("p", {}, `${clickedWord.word}`);

            style({
                margin: "auto",
                color: "white",
                "font-size": "6pt",
                "font-family": "box2",
                "text-shadow": "-.8px -.8px 0 purple, .8px -.8px 0px purple, -.8px .8px 0px purple, .8px .8px 0px purple"
              },
              clickedWord.revealedWord
            );

            style({
                "background-image": "linear-gradient(rgb(255, 230, 183), rgb(255, 145, 2), rgb(255, 166, 0), rgb(255, 208, 0))",
                animation: "superpop 0.8s ease"
              },
              clickedWord.main
            );

            setTimeout(() => {
              clickedWord.main.style.animation = undefined;
              style({
                  "pointer-events": "auto"
                },
                this.unlockBtn
              );
            }, 790);
          }, 790);
        }, 100);
        allHiddenWordsArr.forEach(e => {
          if (e.statePrice && e.statePrice > storage.coins && !e.hasBeenUnlocked) {
            style({
                opacity: "0.5",
                "pointer-events": "none"
              },
              e.main
            );
          }
        });
        localStorage.setItem("GS", JSON.stringify(storage));
      });
    }
  }
});
export const unlockWordTabClone = createClone(
  "Unlock-word-tab",
  document.getElementById("slide-main")
);