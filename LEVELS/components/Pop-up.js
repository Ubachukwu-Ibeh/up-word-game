"use strict";
import { create as c, component, style } from "../../clone.js";

export let a;

component(
  "Pop-up",
  () =>
    c(
      "div",
      {
        class: "scale-pop-up"
      },
      ["achDetails"],
      ["medal"]
    ),
  {
    props: {
      achDetails() {
        return c(
          "div",
          {
            class: "ach-det"
          },
          c("p", {}, ["popUpTitle"]),
          c("p", {}, ["description"])
        );
      },
      popUpTitle: "New Achievement!",
      description: "",
      medal() {
        return c("div");
      }
    },
    states: {
      STRIKE() {
        style(
          {
            display: "flex",
            padding: "8px",
            height: "fit-content",
            width: "fit-content",
            "background-image":
              "linear-gradient(rgb(150, 150, 150), rgb(50, 50, 50), rgb(80, 80, 80))",
            color: "#fff",
            animation: "popdrop 2s ease",
            "box-shadow": "0px 5px 8px rgba(0, 0, 0, 0.2)",
            border: ".5px solid rgb(221, 174, 66)",
            "border-radius": "5px",
            margin: "3px auto"
          },
          this.main
        );

        style(
          {
            margin: "auto",
            height: "35px",
            width: "50px",
            "margin-left": "100px",
            "background-image": "url(Images/medal_0001_Rectangle-1-copy-5.png)",
            "background-size": "contain",
            "background-position": "center",
            "background-repeat": "no-repeat"
          },
          this.medal
        );

        style(
          {
            margin: "auto",
            width: " 50%",
            "margin-left": "15px",
            "font-family": "box3",
            color: "brown",
            "font-size": "9pt",
            color: "chocolate"
          },
          this.achDetails
        );

        style(
          {
            color: "white",
            "font-size": "11pt"
          },
          this.popUpTitle.parentNode
        );

        style(
          {
            color: "rgb(255, 187, 0)",
            "font-size": "9pt"
          },
          this.description.parentNode
        );

        setTimeout(() => {
          this.main = "";
        }, 2000);
      }
    }
  }
);
