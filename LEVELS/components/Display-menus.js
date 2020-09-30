"use strict";
import { create as c, component, createClone } from "../../clone.js";

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
