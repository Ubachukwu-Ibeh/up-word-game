import { create as c, component, createClone, style } from "../../clone.js";
component(
  "Daily-reward-main-container",
  () => c("div", {}, ["rTxt"], ["dContent"]),
  {
    props: {
      dContent() {
        return c("div", {}, ["dailyReward1"], ["or"], ["dailyReward2"]);
      },
      rTxt() {
        return c("p", {}, "Daily Reward");
      },
      or() {
        return c("p", {}, "OR");
      },
      dailyReward1: "",
      dailyReward2: ""
    },
    states: {
      STRIKE() {
        style(
          {
            margin: "auto",
            display: "flex",
            "flex-direction": "column",
            width: "100vw",
            height: "100vh",
            "background-color": "rgba(0, 0, 0, 0.5)"
          },
          this.main
        );
        style(
          {
            margin: "auto",
            "margin-top": "0px",
            display: "flex",
            width: "inherit"
          },
          this.dContent
        );
        style(
          {
            margin: "auto",
            padding: "10px 8px",
            "background-color": "yellow",
            color: "red",
            "border-radius": "100%",
            border: "5px solid white",
            "font-size": "14pt",
            "font-family": "box2"
          },
          this.or
        );
        style(
          {
            margin: "auto",
            "margin-bottom": "50px",
            "font-family": "box3",
            color: "white",
            "border-radius": "10px",
            margin: "auto",
            "font-size": "30pt",
            opacity: "0"
          },
          this.rTxt
        );
      }
    }
  }
);
export const dailyRewardMainCont = createClone(
  "Daily-reward-main-container",
  false
);
