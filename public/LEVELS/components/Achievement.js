"use strict";
import { create as c, component, createClone, style } from "../../clone.js";
import { A_M_C, modifyJustAchieved } from "./Achievements-main-container.js";

const { achievements } = JSON.parse(localStorage.getItem("GS"));

component(
  "Achievement",
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
        c("p", {}, ["description"]),
        c(
          "p",
          {
            class: "amt"
          },
          ["amount"]
        ),
        c(
          "div",
          {
            class: "ach-bar-cont"
          },
          ["bar"]
        )
      ),
      ["newNotify"]
    ),
  {
    props: {
      title: "",
      description: "",
      amount: "",
      bar() {
        return c("div");
      },
      newNotify() {
        return c("div", {}, ["newTxt"], ["medal"]);
      },
      newTxt() {
        return c("p", {}, "NEW!");
      },
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
            margin: "auto",
            height: "20px",
            width: "40px",
            "background-image": "url(../Images/medal_0002_Rectangle-1-copy-4.png)",
            "background-size": "contain",
            "background-position": "center",
            "background-repeat": "no-repeat"
          },
          this.medal
        );

        style(
          {
            margin: "auto",
            "font-size": "3pt",
            display: "flex",
            "margin-eft": "5px",
            "flex-direction": "column"
          },
          this.newNotify
        );

        style(
          {
            margin: "auto",
            "margin-right": "0px",
            "margin-top": "0px",
            "background-color": "red",
            padding: "1px 2px",
            "border-radius": "2px",
            color: "white",
            "font-family": "box2",
            transform: "rotate(20deg)",
            display: "none"
          },
          this.newTxt
        );
      }
    }
  }
);

export const achievementsArr = [];
export const achMainCont = document.getElementById("ach-main-cont");
const medalImage = "url(../Images/medal_0001_Rectangle-1-copy-5.png)";

for (const key in achievements) {

  const achClone = createClone("Achievement", A_M_C.achievementsList);

  achClone.description = key.replace(/_/g, " ");

  if (typeof achievements[key][0] === "number") {
    if (achievements[key][3]) {
      achClone.newTxt.style.display = "flex";
      modifyJustAchieved([key, achClone, 3]);
    }
    achClone.title = achievements[key][2];

    if (achievements[key][0] > achievements[key][1])
      achievements[key][0] = achievements[key][1];

    const amt = Math.ceil((achievements[key][0] / achievements[key][1]) * 100);
    achClone.amount = `${amt}%`;
    achClone.bar.style.width = `${
      (achievements[key][0] * 70) / achievements[key][1]
    }px`;

    if (amt === 100)
      achClone.medal.style.backgroundImage = medalImage;

  } else if (
    typeof achievements[key][0] === "boolean" &&
    achievements[key][0]
  ) {
    if (achievements[key][2]) {
      achClone.newTxt.style.display = "flex";
      modifyJustAchieved([key, achClone, 2]);
    }
    achClone.title = achievements[key][1];
    achClone.medal.style.backgroundImage = medalImage;
    achClone.bar.style.width = `${achClone.bar.parentNode.style.width}`;
    achClone.amount = "100%";
  } else if (
    typeof achievements[key][0] === "boolean" &&
    !achievements[key][0]
  ) {
    achClone.title = achievements[key][1];
    achClone.bar.style.width = "0px";
    achClone.amount = "0%";
  }
  achievementsArr.push(achClone);
}
