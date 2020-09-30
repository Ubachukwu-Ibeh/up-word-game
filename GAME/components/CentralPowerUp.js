"use strict";
import { create as c, component, createClone, style } from "../../clone.js";

component(
  "CentralPowerUp",
  () =>
    c(
      "div",
      {
        class: "c-p-u"
      },
      ["powerDisplayCont"]
    ),
  {
    props: {
      powerDisplayCont() {
        return c("div", {
          class: "big-power-icon"
        });
      }
    },
    states: {
      STRIKE() {
        this.off();
      },
      off() {
        style(
          {
            display: "none"
          },
          this.powerDisplayCont
        );
      },
      play() {
        style(
          {
            display: "flex",
            animation: "slidein 2s"
          },
          this.powerDisplayCont
        );
        setTimeout(() => {
          this.off();
        }, 1990);
      }
    }
  }
);
export let centralPowerUpCont = createClone(
  "CentralPowerUp",
  document.getElementById("slide")
);
