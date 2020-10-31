import {
  create as c,
  createClone,
  style,
  component
} from "../../clone.js";
import {
  stars,
  storage
} from "./Stars.js";
import {
  timer
} from "./Timer-container.js";
import {
  END
} from "../javascript/findTheWordsGameTest.js";
import {
  slideMain
} from "../javascript/scores.js";
import {
  centralPowerUpCont
} from "./CentralPowerUp.js";


export let starCalc = 3;
export const setStarCalc = (val) => starCalc = val;
let width = 291;

const check = {},
  starPositions = stars.starPositions;

export const defRate = Number(storage.difficulty);
let rate = defRate;
export const getRate = val => (rate = val);

component("Tube", () => c("div", {}, ["bar"]), {
  props: {
    bar: () => c("div")
  },
  states: {
    STRIKE() {
      const main = this.main,
        bar = this.bar;
      style({
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
      style({
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
      let hasPassed = {};
      return setInterval(() => {
        obj.bar.style.width = `${(width -= rate)}px`;
        if (width >= 291) {
          hasPassed = {};
          rate = 0.05;
          Object.keys(check).forEach(e => {
            check[e][0].style.opacity = "1";
            starCalc < 3 && starCalc++;
          });
          slideMain.style.display = "none";
          slideMain.classList.remove("is-open");
          slideMain.style.backgroundColor = "rgba(0,0,0,0.5)";
        }
        if (rate === -1) {
          obj.bar.style.backgroundImage = `linear-gradient(
              rgb(213, 255, 194),
              rgb(131, 255, 74),
              rgb(129, 214, 31),
              rgb(99, 255, 37)
            )`;
        } else if (rate === 0) {
          obj.bar.style.backgroundImage = `linear-gradient(
            rgb(255, 255, 255),
            rgb(150, 150, 150),
            rgb(100, 100, 100),
            rgb(80, 80, 80)
          )`;
        } else {
          obj.bar.style.backgroundImage = `linear-gradient(
          rgb(255, 197, 90),
          rgb(255, 145, 2),
          rgb(255, 166, 0),
          rgb(255, 208, 0)
        )`;
        }
        Object.keys(check).forEach(e => {
          if (e >= width && !hasPassed[e]) {
            hasPassed[e] = e;
            check[e][0].style.opacity = "0";
            starCalc--;
          }
        });
        if (width <= 0) {
          centralPowerUpCont.off();
          END();
        }
      }, 10);
    }
  }
});
export const tubeInterval = createClone("Tube", timer.main);

setTimeout(() => {
  if (JSON.parse(localStorage.getItem('GS')).firstTime) {

    const slideMain = document.getElementById('slide-main');
    slideMain.style.display = 'flex';
    slideMain.classList.toggle('is-open');
    const tut = document.getElementById('tutorial');
    tut.style.display = 'flex';
  
    const ok = document.getElementById('ok-main-tut');
    ok.style.pointerEvents = 'auto';
  
    ok.addEventListener('click', () => {
      const storage = JSON.parse(localStorage.getItem('GS'));
      storage.firstTime = false;
      slideMain.style.display = 'none';
      slideMain.classList.toggle('is-open');
      tut.style.display = 'none';
      tubeInterval.tubeInterval();
      localStorage.setItem('GS', JSON.stringify(storage));
    })
  }else{
    tubeInterval.tubeInterval();
  }
}, 1000);