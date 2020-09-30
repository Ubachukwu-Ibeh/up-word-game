import { create as c, component, createClone, style } from "../../clone.js";
import { dailyRewardMainCont } from "./Daily-rewards-main-container.js";
import { displayMenus } from "./Display-menus.js";

const empty = c("div");
let cId = 0;

component("Daily-reward", () => c("div", {}, ["rewardPic"], ["claimBtn"]), {
  props: {
    rewardPic() {
      return c("div");
    },
    claimBtn() {
      return c(
        "div",
        {},
        c(
          "p",
          {
            style: "margin: auto: margin-right: 0px;"
          },
          "Get"
        ),
        ["rCoinImage"],
        c("p", {}, ["rPrice"])
      );
    },
    rCoinImage() {
      return c("div");
    },
    rPrice: ""
  },
  states: {
    STRIKE() {
      const obj = this;
      this.cId = cId;
      this.rPrice = this.cId === 0 ? "100" : "400";
      cId++;
      style(
        {
          margin: "auto",
          display: "flex",
          "flex-direction": "column"
        },
        this.main
      );

      style(
        {
          margin: "auto",
          "margin-bottom": "0px",
          width: "35vw",
          height: "35vw",
          "background-color": "brown"
        },
        this.rewardPic
      );

      style(
        {
          margin: "auto",
          "margin-top": "10px",
          display: "flex",
          padding: "3vw 5vw",
          "background-image":
            obj.cId === 0
              ? `linear-gradient(
            rgb(213, 255, 194),
            rgb(131, 255, 74),
            rgb(129, 214, 31),
            rgb(99, 255, 37)
          )`
              : `linear-gradient(
            rgb(255, 230, 183),
            rgb(255, 145, 2),
            rgb(255, 166, 0),
            rgb(255, 208, 0)
          )`,
          "border-radius": "10px",
          "font-family": "box2",
          "font-size": "11pt",
          color: obj.cId === 0 ? "darkgreen" : "brown"
        },
        this.claimBtn
      );

      style(
        {
          margin: "auto",
          "margin-left": "10px",
          "margin-right": "0px",
          width: "20px",
          height: "20px",
          "background-image": "url(Images/coin-1_0005_Ellipse-1-copy-10.png)",
          "background-size": "contain",
          "background-repeat": "no-repeat",
          "background-position": "center"
        },
        this.rCoinImage
      );

      style(
        {
          margin: "auto",
          "margin-left": "2px"
        },
        this.rPrice.parentNode
      );

      this.claimBtn.addEventListener("click", () => {
        displayMenus.screen = empty;
        document.getElementById("slide-main").style.height = "unset";
      });
    }
  }
});
dailyRewardMainCont.dailyReward1 = createClone("Daily-reward", false).main;
dailyRewardMainCont.dailyReward2 = createClone("Daily-reward", false).main;
