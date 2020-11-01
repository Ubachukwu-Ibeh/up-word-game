"use strict";
import { create as c, component, createClone, style } from "../../clone.js";

component("Word-info-tab", () => c("div", {}, ["mainTab"]), {
  props: {
    mainTab() {
      return c("div", {}, ["wordCont"], ["meaningCont"], ["okBtn"]);
    },
    wordCont() {
      return c("p", {}, ["word"]);
    },
    word: "",
    meaningCont() {
      return c("p", {}, ["meaning"]);
    },
    meaning: "",
    okBtn() {
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
      const tap = new Audio(`music/click.mp3`);
      tap.preload = "auto";

      style(
        {
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

      style(
        {
          margin: "auto",
          display: "flex",
          "flex-direction": "column",
          "background-color": "wheat",
          height: "fit-content",
          width: "75%",
          padding: "10px 20px",
          "border-radius": "10px",
          "box-shadow": "0px 0px 5px rgba(0, 0, 0, 0.5)",
          animation: "poprise 0.2s ease",
          "font-family": "box2",
          "text-align": "center"
        },
        this.mainTab
      );

      style(
        {
          margin: "10px auto",
          width: "90%"
        },
        this.meaningCont
      );

      style(
        {
          color: "white",
          "font-family": "box2",
          "text-shadow":
            "-.8px -.8px 0 purple, .8px -.8px 0px purple, -.8px .8px 0px purple, .8px .8px 0px purple",
          margin: "10px auto",
          "font-size": "14pt",
          "text-align": "center"
        },
        this.wordCont
      );

      style(
        {
          margin: "10px auto",
          width: "45%",
          height: "50px",
          "font-size": "20pt",
          "background-image":
            "linear-gradient(rgb(213, 255, 194), rgb(131, 255, 74), rgb(129, 214, 31), rgb(99, 255, 37))",
          border: "2px rgba(50, 126, 0, 0.7) solid"
        },
        this.okBtn
      );

      this.okBtn.addEventListener("click", () => {
        const storage = JSON.parse(localStorage.getItem("GS"));
        storage.sfx && tap.play();
        this.main.style.display = "none";
      });
    }
  }
});
export const wordInfoTabClone = createClone(
  "Word-info-tab",
  document.getElementById("slide-main")
);
