"use strict";
import { create as c, component, createClone } from "../../clone.js";
import { displayMenus, tap } from "./Display-menus.js";

const empty = c("div");

component(
  "Discover-main-container",
  () =>
    c(
      "div",
      {
        class: "disc-ult-main"
      },
      c(
        "div",
        {},
        c(
          "p",
          {
            class: "disc-txt"
          },
          "Discover Words!"
        )
      ),
      ["coinsCont"],
      ["discWordsMain"],
      ["discOkBtn"]
    ),
  {
    props: {
      coinsCont() {
        return c("div", {
          class: "coins-cont"
        });
      },
      discWordsMain() {
        return c("div", {
          class: "disc-words-main"
        });
      },
      discOkBtn() {
        return c(
          "div",
          {
            class: "ok-disc"
          },
          c("p", {}, "Ok")
        );
      }
    },
    states: {
      STRIKE() {
        this.discOkBtn.addEventListener("click", () => {
          const storage = JSON.parse(localStorage.getItem("GS"));

          document.getElementById("slide-main").style.height = "unset";

          storage.sfx && tap.play();
          
          displayMenus.screen = empty;
        });
      },
      width: 200,
      height: 351
    }
  }
);
export const D_M_C = createClone("Discover-main-container", false);
