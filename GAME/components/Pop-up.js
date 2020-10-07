"use strict";
import { create as c, component, style } from "../../clone.js";

export let a;

component(
  "Pop-up",
  () =>
    c(
      "div",
      {
        class: "ach-cont"
      },
      c(
        "div",
        {
          class: "ach-det"
        },
        c("p", {}, ["title"]),
        c("p", {}, ["description"])
      ),
      ["medal"]
    ),
  {
    props: {
      title: "New Achievement!",
      description: "",
      medal() {
        return c("div", {
          class: "medal"
        });
      }
    },
    states: {
      STRIKE() {
        style(
          {
            padding: "8px",
            height: "fit-content",
            width: "fit-content",
            "background-image":
              "linear-gradient(rgb(150, 150, 150), rgb(50, 50, 50), rgb(80, 80, 80))",
            color: "#fff",
            animation: "popdrop 2s ease"
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
        this.title.parentNode.parentNode.style.color = "#fff";
        this.description.parentNode.style.color = "rgb(255, 187, 0)";
        setTimeout(() => {
          this.main.parentNode.removeChild(this.main);
        }, 2000);
      }
    }
  }
);
