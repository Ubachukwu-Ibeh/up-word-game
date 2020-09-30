"use strict";
export const SCALE = () => {
  const elemHeight = document.getElementById("main").scrollHeight;
  const elemWidth = document.getElementById("main").scrollWidth;
  const main = document.getElementById("main");
  const slide = document.getElementById("slide");
  const scale = Math.min(
    window.innerWidth / elemWidth,
    window.innerHeight / elemHeight
  );
  if (window.innerWidth >= 1280) {
    main.style.transform = `scale(${scale - 0.27})`;
    slide.style.transform = `scale(${scale - 0.27})`;
    return;
  }
  if (window.innerWidth >= 1024) {
    main.style.transform = `scale(${scale - 0.7})`;
    slide.style.transform = `scale(${scale - 0.7})`;
    return;
  }
  if (window.innerWidth >= 768) {
    main.style.transform = `scale(${scale - 0.5})`;
    slide.style.transform = `scale(${scale - 0.5})`;
    return;
  }
  if (window.innerWidth >= 600) {
    main.style.transform = `scale(${scale - 0.4})`;
    slide.style.transform = `scale(${scale - 0.4})`;
    return;
  }
  main.style.transform = `scale(${scale - 0.18})`;
  slide.style.transform = `scale(${scale - 0.18})`;
};
SCALE();
