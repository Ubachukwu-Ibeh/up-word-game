"use strict";
const check = sessionStorage.getItem('hasEntered');
!check && (() => {
    const SCALE = () => {
        const elemHeight = document.getElementById('content').scrollHeight;
        const elemWidth = document.getElementById('content').scrollWidth;
        const main = document.getElementById('content');
        const slide = document.getElementById('slide-home');
        const scale = Math.min(window.innerWidth / elemWidth, window.innerHeight / elemHeight);
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
    }
    SCALE();
})()
export let d;