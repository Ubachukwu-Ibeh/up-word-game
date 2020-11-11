"use strict";
import { create as c, component, createClone, style } from "../../clone.js";
import { coinsClone } from "./Coins.js";
import { achievementsArr } from "./Achievement.js";
import { S_M_C } from "./Shop-main-container.js";
import { modifyJustAchieved } from "./Achievements-main-container.js";
import { cash } from "./Display-menus.js";

let allHiddenWordsArr = [];

export const modifyHiddenWordArr = arr => (allHiddenWordsArr = arr);

const powerUpImagesStyles = [
  "url(Images/power-ups_0002_P1.png)",
  "url(Images/power-ups_0000_P2.png)",
  "url(Images/power-ups_0001_P3.png)"
];

let cloneCount = 0;
const powerUpAmt = ["powerUp1", "powerUp2", "powerUp3"];

component(
  "Shop-item",
  () =>
    c(
      "div",
      {
        class: "shop-item-div"
      },
      c(
        "div",
        {
          class: "power-div"
        },
        ["powerUpIcon"],
        c(
          "div",
          {
            class: "pow-amt"
          },
          c("p", {}, ["amt"])
        )
      ),
      c(
        "div",
        {
          class: "buy-btn"
        },
        c("p", {}, "Buy"),
        c("div", {
          class: "shop-coin-icon"
        }),
        c(
          "p",
          {
            class: "price-txt"
          },
          ["price"]
        )
      )
    ),
  {
    props: {
      powerUpIcon() {
        return c("div", {
          class: "power-up"
        });
      },
      price: "",
      amt: ""
    },
    states: {
      STRIKE() {
        const POP_UP = (description, title, num, storage) => {
          const [achOBJ] = achievementsArr.filter(
            e => e.title.textContent === description
          );
          achOBJ.medal.style.backgroundImage =
            "url(../Images/medal_0001_Rectangle-1-copy-5.png)";

          achOBJ.bar.style.width = `${achOBJ.bar.parentNode.style.width}`;

          storage.achievements[title][num] = true;

          modifyJustAchieved([title, achOBJ, num]);

          achOBJ.newTxt.style.display = "flex";
          achOBJ.amount = "100%";
          createClone(
            "Pop-up",
            document.getElementById("pop-up-cont")
          ).description = description;
        };

        S_M_C.shopItems.push(this);

        this.internalCloneCount = cloneCount;

        this.powerUpIcon.style.backgroundImage =
          powerUpImagesStyles[cloneCount];

        this.stateAmt = JSON.parse(localStorage.getItem("GS"))[
          powerUpAmt[cloneCount]
        ];

        cloneCount === 0 ? (this.priceState = 400) : (this.priceState = 200);
        this.amt = `${this.stateAmt}`;

        let a = this.priceState;
        for (let i = 0; i < this.stateAmt; i++) a += a + 200;

        this.price = `${a}`;
        this.priceState = a;

        coinsClone.internalCoinsCounter < this.priceState && this.isNotEnough();
        cloneCount++;
        const main = this.main;

        main.addEventListener("click", () => {
          main.style.pointerEvents = "none";

          setTimeout(() => {
            main.style.pointerEvents = "auto";
          }, 1000);

          if (coinsClone.internalCoinsCounter < this.priceState) return;

          const powerStore = JSON.parse(localStorage.getItem("GS"));

          powerStore.sfx && cash.play();

          coinsClone.reduce(
            this.priceState,
            powerStore,
            allShopItemClones,
            this
          );

          this.main.style.animation = "shake 0.2s";

          setTimeout(() => {
            this.main.style.animation = undefined;
          }, 190);
          this.amt = `${(this.stateAmt += 1)}`;

          if (
            this.stateAmt === 5 &&
            !powerStore.achievements.Buy_up_to_5_of_any_power_up[0]
          ) {
            powerStore.achievements.Buy_up_to_5_of_any_power_up[0] = true;
            POP_UP("Power!", "Buy_up_to_5_of_any_power_up", 2, powerStore);
          }
          if (
            allShopItemClones.filter(e => e.stateAmt >= 5).length === 3 &&
            !powerStore.achievements.Buy_up_to_5_of_all_3_power_ups[0]
          ) {
            powerStore.achievements.Buy_up_to_5_of_all_3_power_ups[0] = true;

            POP_UP(
              "Super Hero",
              "Buy_up_to_5_of_all_3_power_ups",
              2,
              powerStore
            );
          }

          powerStore[powerUpAmt[this.internalCloneCount]] = this.stateAmt;
          
          allHiddenWordsArr.forEach(e => {
            if (e.statePrice && e.statePrice > powerStore.coins) {
              style(
                {
                  opacity: "0.5",
                  "pointer-events": "none"
                },
                e.main
              );
            }
          });
          localStorage.setItem("GS", JSON.stringify(powerStore));
        });
      },
      stateAmt: 0,
      priceState: undefined,
      internalCloneCount: 0,
      isNotEnough() {
        this.main.style.opacity = "0.5";
      }
    }
  }
);
export const allShopItemClones = [
  createClone("Shop-item", S_M_C.shop),
  createClone("Shop-item", S_M_C.shop),
  createClone("Shop-item", S_M_C.shop)
];
