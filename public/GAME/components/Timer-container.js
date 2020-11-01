import { create as c, createClone, style, component } from "../../clone.js";

component("Timer-container", () => c("div"), {
  props: {},
  states: {
    STRIKE() {
      style(
        {
          margin: "auto",
          width: "fit-content"
        },
        this.main
      );
    }
  }
});
export const timer = createClone(
  "Timer-container",
  document.getElementById("timer-cont")
);
