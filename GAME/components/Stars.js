import { create as c, createClone, style, component } from "../../clone.js";
import { timer } from "./Timer-container.js";

export const storage = JSON.parse(localStorage.getItem('GS')).levels[Number(localStorage.getItem("CL"))];
const starMargins = storage.starMargins;

component("Stars", () => c("div", {}, ["star1"], ["star2"], ["star3"]), {
  props: {
    star1: () => c("div"),
    star2: () => c("div"),
    star3: () => c("div")
  },
  states: {
    STRIKE() {
      const main = this.main,
        star1 = this.star1,
        otherStars = [this.star2,this.star3];
      style(
        {
          display: "flex",
          "margin-bottom": "10px",
          width: "fit-content",
          "margin-left": "0px"
        },
        main
      );
      style(
        {
          width: "10px",
          height: "10px",
          "border-radius": "50%",
          "background-color": "yellow",
          "margin-left": "3px"
        },
        star1
      );
      let starArr = [10];
      this.starPositions = [[star1, 10]];
      starMargins.forEach(item => {
        starArr.push(item, 10);
        const star = otherStars.splice(0, 1)[0];
        this.starPositions.push([star, starArr.reduce((a, b) => a + b, 0)]);
        style(
          {
            width: "10px",
            height: "10px",
            "border-radius": "50%",
            "background-color": "yellow",
            "margin-left": `${item}px`
          },
          star
        );
      });
    }
  }
});
export const stars = createClone("Stars", timer.main);
