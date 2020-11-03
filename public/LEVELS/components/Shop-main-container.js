"use strict";
import { create as c, component, createClone } from "../../clone.js";
import { displayMenus } from "./Display-menus.js";

component(
  "Shop-main-container",
  () =>
    c(
      "div",
      {
        class: "shop-cont"
      },
      c(
        "div",
        {},
        c(
          "p",
          {
            class: "ach-txt"
          },
          "Powerups"
        )
      ),
      ["coinsCont"],
      ["shop"],
      ["shopOkBtn"]
    ),
  {
    props: {
      coinsCont() {
        return c("div", {
          class: "coins-cont"
        });
      },
      shop() {
        return c("div", {
          class: "shop"
        });
      },
      shopOkBtn() {
        return c(
          "div",
          {
            class: "ok-main-shop"
          },
          c("p", {}, "Ok")
        );
      }
    },
    states: {
      STRIKE() {
        const empty = c("div");
        const tap = new Audio(`../music/click.mp3`);
        tap.preload = "auto";

        this.shopOkBtn.addEventListener("click", () => {
          const storage = JSON.parse(localStorage.getItem("GS"));
          document.getElementById("slide-main").style.height = "unset";
          storage.sfx && tap.play();
          displayMenus.screen = empty;
        });
      },
      shopItems: [],
      width: 152,
      height: 210
    }
  }
);
export const S_M_C = createClone("Shop-main-container", false);
