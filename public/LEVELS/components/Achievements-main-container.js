"use strict";
import { create as c, component, createClone } from "../../clone.js";
import { displayMenus } from "./Display-menus.js";

const tap = new Audio(`music/click.mp3`);
tap.preload = "auto";

const empty = c("div");

let justAchievedArr = [];
export const modifyJustAchieved = arr => {
  justAchievedArr.push(arr);
};

component(
  "Achievements-main-container",
  () =>
    c(
      "div",
      {
        class: "ach-ult-main"
      },
      c(
        "div",
        {},
        c(
          "p",
          {
            class: "ach-txt"
          },
          "Achievements"
        )
      ),
      ["achievementsList"],
      ["achOkBtn"]
    ),
  {
    props: {
      achievementsList() {
        return c("div", {
          class: "ach-main-cont"
        });
      },
      achOkBtn() {
        return c(
          "div",
          {
            class: "ok-ach"
          },
          c("p", {}, "Ok")
        );
      }
    },
    states: {
      STRIKE() {
        this.achOkBtn.addEventListener("click", () => {
          const storage = JSON.parse(localStorage.getItem("GS"));
          justAchievedArr.forEach(e => {
            storage.achievements[e[0]][e[2]] = false;
            e[1].newTxt.style.display = "none";
          });
          document.getElementById("slide-main").style.height = "unset";
          storage.sfx && tap.play();
          displayMenus.screen = empty;
          localStorage.setItem("GS", JSON.stringify(storage));
        });
      },
      width: 150,
      height: 271
    }
  }
);
export const A_M_C = createClone("Achievements-main-container", false);
