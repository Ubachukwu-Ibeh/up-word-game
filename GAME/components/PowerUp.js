"use strict";
/**
 * Enter clone.js. The framework I created after I realised the benefits of the concept of component based UI/UI logic architecture and after I had more regard for performance and ease of development (the game was getting too huge). There was no time to learn react or any other framework for me, but there was time apparently to build my own framework from scratch :) how nice
 * After one month of working on clone and not working on the game....*drum rolls*...CLONE.JS was created and ready to start saving me from the spaghetti code monster and making me so productive I started getting arrogant like: 'Oh I'm supposed to make this huge component and Im like 'yeah I'll do it after browsing aimlessly on YouTube, it won't take me time to build it, I have CLONE.JS now.' kind of arrogant.
 *
 * Making the game with clone helped me to improve clone which then helped me to improve the game and so on.
 *
 * clone.js was used heavily in the LEVELS/components folder.
 */
import { create as c, component, createClone, style } from "../../clone.js";
import { POWER, BLAST, BLAST_ONE, ADD_TIME } from "../javascript/powerUps.js";
import { modifyHasUsedowerUp } from "../javascript/ending.js";
import { centralPowerUpCont } from "../components/CentralPowerUp.js";

export let counter = 0;
const powerUpActions = [BLAST, BLAST_ONE, ADD_TIME];
const powerUpDivArt = [
  "url(Images/power-ups_0002_P1.png)",
  "url(Images/power-ups_0000_P2.png)",
  "url(Images/power-ups_0001_P3.png)"
];
const powerUpAmt = ["powerUp1", "powerUp2", "powerUp3"];

component(
  "PowerUp",
  () =>
    c(
      "div",
      {
        class: "power-div"
      },
      ["powerUp"],
      c(
        "div",
        {
          class: "pow-amt"
        },
        c("p", {}, ["amt"])
      )
    ),
  {
    props: {
      amt: "",
      powerUp() {
        return c("div", {
          class: "power-up"
        });
      }
    },
    states: {
      STRIKE() {
        this.myIcon = powerUpDivArt[counter];
        style(
          {
            "background-image": this.myIcon
          },
          this.powerUp
        );
        this.internalCounter = counter;
        this.num = JSON.parse(localStorage.getItem("GS"))[powerUpAmt[counter]];
        this.amt = `${this.num}`;
        if (!this.num) this.main.style.opacity = "0.5";
        counter++;
        this.main.addEventListener("click", () => {
          if (!this.num) return;
          const reducePower = JSON.parse(localStorage.getItem("GS"));
          this.amt = `${(this.num -= 1)}`;
          style(
            {
              "background-image": this.myIcon
            },
            centralPowerUpCont.powerDisplayCont
          );
          centralPowerUpCont.play();
          POWER(powerUpActions[this.internalCounter]);
          if (!this.num) this.main.style.opacity = "0.5";
          reducePower[powerUpAmt[this.internalCounter]] -= 1;
          localStorage.setItem("GS", JSON.stringify(reducePower));
          modifyHasUsedowerUp(true);
        });
      },
      myIcon: "",
      num: 0,
      internalCounter: 0
    }
  }
);
const powerCont = document.getElementById("players");
createClone("PowerUp", powerCont);
createClone("PowerUp", powerCont);
createClone("PowerUp", powerCont);
