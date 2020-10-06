import { create as c, createClone, style, component } from "../../clone.js";
import { stars } from "./Stars.js";
import { timer } from "./Timer-container.js";
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
      let width = 291;

      const check = {},
        starPositions = stars.starPositions;

      while (starPositions.length) {
        const position = starPositions.splice(0, 1)[0];
        check[position[1] - 10] = [
          () => {
            position[0].style.opacity = "0";
          },
          position[0]
        ];
      }

      setInterval(() => {
        bar.style.width = `${width--}px`;
        check[width] && check[width][0]();

        if (width === 0) {
          Object.keys(check).forEach(e => (check[e][1].style.opacity = "1"));
          bar.style.width = "291px";
          width = 291;
        }
      }, 50);
    }
  }
});
createClone("Tube", timer.main);
