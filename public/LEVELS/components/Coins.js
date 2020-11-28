"use strict";
import { create as c, component, createClone, style } from "../../clone.js";
import { S_M_C } from "./Shop-main-container.js";
import { D_M_C } from "./Discover-main-container.js";

const allCoinsClone = [];
component(
  "Coins",
  () =>
    c(
      "div",
      {
        class: "shop-coins-div"
      },
      ["coinsPic"],
      c("p", {}, ["coins"])
    ),
  {
    props: {
      coinsPic() {
        return c("div");
      },
      coins: `${JSON.parse(localStorage.getItem("GS")).coins}`
    },
    states: {
      STRIKE() {
        this.internalCoinsCounter = JSON.parse(
          localStorage.getItem("GS")
        ).coins;

        allCoinsClone.push(this);

        style(
          {
            "text-shadow":
              "-.8px -.8px 0 purple, .8px -.8px 0px purple, -.8px .8px 0px purple, .8px .8px 0px purple"
          },
          this.main
        );
      },
      giveCoins(){
        this.main.classList.add('bounce');
      },
      reduce(val, reduceStore, arr, obj) {
        this.internalCoinsCounter = this.internalCoinsCounter - val;

        const internalCoinsCounter = this.internalCoinsCounter;

        reduceStore.coins = internalCoinsCounter;

        allCoinsClone.forEach(e => {
          e.coins = `${internalCoinsCounter}`;
        });

        localStorage.setItem("GS", JSON.stringify(reduceStore));

        obj.priceState += obj.priceState + 200;

        obj.price = `${obj.priceState}`;
        
        if (internalCoinsCounter < obj.priceState) {
          arr.forEach(e => {
            if (e.priceState > internalCoinsCounter) e.isNotEnough();
          });
        }
        return;
      },
      internalCoinsCounter: ""
    }
  }
);

export const coinsClone = createClone("Coins", S_M_C.coinsCont);
export const outerCoinsClone = createClone("Coins", document.getElementById("outer-shop-coins-div"));
export const coinsCloneDisc = createClone("Coins", D_M_C.coinsCont);

//bad practice.
style(
  {
    width: "10px",
    height: "10px"
  },
  coinsCloneDisc.coinsPic
);

style(
  {
    width: "10px",
    height: "10px"
  },
  coinsClone.coinsPic
);

style(
  {
    "font-size": "6pt",
    "margin-left": "5px"
  },
  coinsCloneDisc.coins.parentNode
);

style(
  {
    "font-size": "6pt",
    "margin-left": "5px"
  },
  coinsClone.coins.parentNode
);
