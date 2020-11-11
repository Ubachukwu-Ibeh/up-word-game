"use strict";
import { create as c, component, createClone, style } from "../../clone.js";
import { A_M_C } from "./Achievements-main-container.js";
import { S_M_C } from "./Shop-main-container.js";
import { D_M_C } from "./Discover-main-container.js";
import { displayMenus, tap } from "./Display-menus.js";

let count = 0;
export const sl = document.getElementById("slide-main");
const rut = document.getElementById("r-u-t");

const screensArr = [S_M_C, A_M_C, D_M_C];

const backgroundImages = [
  {
    "background-size": "55%",
    "background-image": "url(Images/power-ups-icon_0000_P2.png)"
  },
  {
    "background-size": "80%",
    "background-image": "url(Images/Achievements-Icon_0003_Layer-1.png)"
  },
  {
    "background-size": "70%",
    "background-image": "url(Images/Discover-Icon_0002_w-copy.png)"
  },
  {
    "margin-left": "0px",
    width: "50px",
    height: "50px",
    "border-radius": "100%",
    "background-size": "35%",
    "background-image": "url(Images/Jump-Icon_0003_Layer-1.png)"
  }
];

screensArr.forEach(e => {
  let rate;
  const scale = Math.min(
    window.innerWidth / e.width,
    window.innerHeight / e.height
  );
  if (e === S_M_C) {
    if (window.innerWidth > 900 && window.innerHeight > 900) rate = 3;
    else if (window.innerWidth > 700 && window.innerHeight > 900) rate = 2;
    else rate = 0.5;
  } else {
    window.innerWidth > 700 && window.innerHeight > 700
      ? (rate = 1)
      : (rate = 0.2);
  }
  e.main.style.transform = `scale(${scale - rate})`;
});

component(
  "Shop-btn",
  () =>
    c("div", {
      class: "shop-btn"
    }),
  {
    props: {},
    states: {
      STRIKE() {
        style(backgroundImages.splice(0, 1)[0], this.main);
        if (count < 3) {
          this.screen = screensArr.splice(0, 1)[0].main;
        } else {
          this.isJumpBtn = true;
        }
        count++;
        this.main.addEventListener("click", () => {
          const storage = JSON.parse(localStorage.getItem("GS"));

          storage.sfx && tap.play();
          storage.vibration && navigator.vibrate(50);

          if (this.isJumpBtn) return (location.href = location.href);

          sl.style.height = "100%";

          displayMenus.screen = this.screen;
          
          if (this.screen === S_M_C.main) {
            S_M_C.shopItems.forEach(e => {
              JSON.parse(localStorage.getItem("GS")).coins < e.priceState &&
                e.isNotEnough();
            });
          }
        });
      }
    }
  }
);
createClone("Shop-btn", rut);
createClone("Shop-btn", rut);
createClone("Shop-btn", rut);
createClone("Shop-btn", document.getElementById("lower-left-tools"));
