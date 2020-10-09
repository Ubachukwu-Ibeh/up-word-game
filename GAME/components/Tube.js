import { create as c, createClone, style, component } from "../../clone.js";
import { stars } from "./Stars.js";
import { timer } from "./Timer-container.js";
import { END } from "../javascript/findTheWordsGameTest.js";
import { slideMain } from "../javascript/scores.js";

export let starCount = 3;
let width = 291;

const check = {},
  starPositions = stars.starPositions;

export let rate = 1;
export const getRate = val => (rate = val);
component("Tube", () => c("div", {}, ["bar"]), {
  props: {
    bar: () => c("div")
  },
  states: {
    STRIKE() {
      const main = this.main,
        bar = this.bar;
      style(
        {
          display: "flex",
          "margin-bottom": "5px",
          width: "291px",
          height: "10px",
          border: "3px solid #fff",
          "margin-left": "0px",
          "background-color": "white",
          "border-radius": "10px"
        },
        main
      );
      style(
        {
          display: "flex",
          "margin-bottom": "5px",
          width: "291px",
          height: "10px",
          "background-image": `linear-gradient(
            rgb(255, 197, 90),
            rgb(255, 145, 2),
            rgb(255, 166, 0),
            rgb(255, 208, 0)
          )`,
          "border-top-left-radius": "5px",
          "border-bottom-left-radius": "5px"
        },
        bar
      );

      while (starPositions.length) {
        const position = starPositions.splice(0, 1)[0];
        check[position[1] - 10] = [position[0]];
      }
    },
    tubeInterval() {
      const obj = this;
      return setInterval(() => {
        obj.bar.style.width = `${(width -= rate)}px`;
        if (width >= 291) {
          rate = 1;
          Object.keys(check).forEach(e => {
            check[e][0].style.opacity = "1";
            starCount++;
          });
          slideMain.style.display = "none";
          slideMain.classList.remove("is-open");
        }
        if (rate === -10) {
          obj.bar.style.backgroundImage = `linear-gradient(
              rgb(213, 255, 194),
              rgb(131, 255, 74),
              rgb(129, 214, 31),
              rgb(99, 255, 37)
            )`;
        } else {
          obj.bar.style.backgroundImage = `linear-gradient(
          rgb(255, 197, 90),
          rgb(255, 145, 2),
          rgb(255, 166, 0),
          rgb(255, 208, 0)
        )`;
        }
        if (check[width]) {
          check[width][0].style.opacity = "0";
          starCount--;
        }
        if (!width) {
          END();
        }
      }, 50);
    }
  }
});
export const tubeInterval = createClone("Tube", timer.main).tubeInterval();
