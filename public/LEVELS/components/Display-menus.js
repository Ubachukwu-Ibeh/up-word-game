"use strict";
import { create as c, component, createClone } from "../../clone.js";
const initSound = url => {
  const sound = new Audio(url);
  sound.preload = "auto";
  return sound;
};
export const tap = initSound(`music/click.mp3`);
export const cash = initSound(`music/cash.mp3`);
component(
  "Display-menus",
  () =>
    c(
      "div",
      {
        class: "display-menus"
      },
      ["screen"]
    ),
  {
    props: {
      screen() {
        return c("div");
      }
    },
    states: {}
  }
);
export const displayMenus = createClone(
  "Display-menus",
  document.getElementById("display-menus-comp-containter")
);
