"use strict";
import { createClone, style } from "../../clone.js";
import { achievementsArr } from "../components/Achievement.js";
import { modifyJustAchieved } from "../components/Achievements-main-container.js";
import { displayMenus } from "../components/Display-menus.js";
import { dailyRewardMainCont } from "../components/Daily-rewards-main-container.js";

const dailyReward = document.getElementById("dr");
const loadScreen = document.getElementById("load-screen");
const slideMain = document.getElementById("slide-main");
const okMain = document.getElementById("ok-main");
let today = new Date().getDay();

const checkDate = JSON.parse(localStorage.getItem("GS"));

const POP_UP = (description, title) => {
  const [achOBJ] = achievementsArr.filter(
    e => e.title.textContent === description
  );

  achOBJ.medal.style.backgroundImage =
    "url(Images/medal_0001_Rectangle-1-copy-5.png)";
  achOBJ.bar.style.width = `${achOBJ.bar.parentNode.style.width}`;
  achOBJ.newTxt.style.display = "flex";
  achOBJ.amount = "100%";
  checkDate.achievements[title][2] = true;

  modifyJustAchieved([title, achOBJ, 2]);

  createClone(
    "Pop-up",
    document.getElementById("pop-up-cont")
  ).description = description;
};

export const GIVE_REWARD = () => {
  const achieved = (title, key) => {
    if (!checkDate.achievements[key][0]) {
      POP_UP(title, key);
      checkDate.achievements[key][0] = true;
    }
  };
  if (
    checkDate.numberOfStagesPlayed <= 20 &&
    !checkDate.hasAchievedMaxLevelsInOneDay
  ) {
    const lim = checkDate.numberOfStagesPlayed;
    switch (lim) {
      case 4:
        achieved("Casual gamer", "Play_5_levels_in_one_day");
        break;
      case 9:
        achieved("Up to something", "Play_10_levels_in_one_day");
        break;
      case 19:
        achieved("Oh dear!", "Play_20_levels_in_one_day");
        checkDate.hasAchievedMaxLevelsInOneDay = true;
        break;
    }
  }
  // today !== checkDate.date
  if (true) {
    displayMenus.screen = dailyRewardMainCont.main;
    checkDate.numberOfStagesPlayed = 0;
    slideMain.style.height = "100vh";

    style(
      {
        animation: "enddrop 0.2s ease",
        opacity: "1"
      },
      dailyRewardMainCont.rTxt
    );

    setTimeout(() => {
      dailyRewardMainCont.dailyReward1.classList.add("jump");
    }, 300);
    setTimeout(() => {
      dailyRewardMainCont.dailyReward2.classList.add("jump");
    }, 500);

    checkDate.date = today;
    // if (!checkDate.coinsEarned < 100000) {
    //     const all = [
    //         ['Earn_1000_coins', 'Honest Work', 1000, coinsFromAd],
    //         ['Earn_5000_coins', 'Money Maker', 5000, coinsFromAd],
    //         ['Earn_10000_coins', 'Wealthy', 10000, coinsFromAd],
    //         ['Earn_50000_coins', 'Magnate', 50000, coinsFromAd],
    //         ['Earn_100000_coins', 'Tycoon', 100000, coinsFromAd]
    //     ]
    //     all.forEach(e => {
    //         if (checkDate.achievements[e[0]][0] < e[2]) {
    //             checkDate.achievements[e[0]][0] += e[3];
    //             if (checkDate.achievements[e[0]][0] >= e[2]) {
    //                 POP_UP(e[1]);
    //             }
    //         }
    //     })
    // }
  }
  localStorage.setItem("GS", JSON.stringify(checkDate));
};
const bg = document.getElementById("bg");

const levLoad = JSON.parse(localStorage.getItem("GS"));

const LOAD_LEVEL = e => {
  loadScreen.style.display = "flex";
  window.scrollTo(0, levLoad.scroll);
  localStorage.setItem("CL", e);
  return;
};

setTimeout(() => {
  window.scrollTo(0, levLoad.scroll);
}, 0);

for (let i = 0; i < levLoad.levels.length; i++) {
  const levelNum = document.createElement("p");
  levelNum.innerHTML = i + 1;
  const starDiv = document.createElement("div");
  starDiv.classList.add("stars");
  const star1 = document.createElement("div");
  star1.id = `star1${i}`;
  const star2 = document.createElement("div");
  star2.id = `star3${i}`;
  const star3 = document.createElement("div");
  star3.id = `star2${i}`;
  star1.classList.add("star1");
  star2.classList.add("star2");
  star3.classList.add("star3");
  starDiv.append(star1, star2, star3);
  if (i > 0) {
    if (levLoad.levels[i - 1].animPlayed) {
      for (let j = 0; j < levLoad.levels[i - 1].stars; j++) {
        document.getElementById(`star${j + 1}${i - 1}`).style.opacity = "1";
      }
    }
  }
  const levelNumDivMain = document.createElement("div");
  levelNumDivMain.classList.add("level-num-div-main");
  levelNumDivMain.id = `lndm${i}`;
  const levelNumDiv = document.createElement("a");
  levelNumDiv.setAttribute("href", `../GAME/game.html`);
  levelNumDiv.id = `lnd${i}`;
  if (!i) {
    levelNumDiv.style.pointerEvents = "auto";
    levelNumDiv.classList.add("level-num-div");
  } else if (i > 0) {
    if (levLoad.levels[i - 1].animPlayed) {
      levelNumDiv.classList.add("level-num-div");
    } else {
      levelNumDiv.style.pointerEvents = "none";
      levelNumDiv.classList.add("level-num-div-locked");
    }
  }

  levelNumDiv.addEventListener("click", () => {
    LOAD_LEVEL(i);
  });

  levelNumDiv.append(levelNum);
  levelNumDivMain.append(starDiv, levelNumDiv);
  bg.append(levelNumDivMain);

  if (i === levLoad.levels.length - 1) {
    loadScreen.style.display = "none";
    setTimeout(() => {
      GIVE_REWARD();
    }, 1500);
  }
  if (i === levLoad.levels.length - 1 && levLoad.levels[i].animPlayed) {
    for (let j = 0; j < levLoad.levels[i].stars; j++) {
      document.getElementById(`star${j + 1}${i}`).style.opacity = "1";
    }
  }
}
let scrlC = 0;
let scrll = levLoad.scroll;
if (
  levLoad.levelsPassed > 0 &&
  !levLoad.levels[levLoad.levelsPassed - 1].animPlayed
) {
  let incr = 0;
  for (
    let i = 0;
    i < levLoad.levels[Number(localStorage.getItem("CL"))].stars;
    i++
  ) {
    setTimeout(() => {
      document
        .getElementById(`star${i + 1}${levLoad.levelsPassed - 1}`)
        .classList.add("star-pop");
    }, (incr += 402));
  }

  const elem = document.getElementById(`lnd${levLoad.levelsPassed}`);

  setTimeout(() => {
    const scrollact = setInterval(() => {
      if (scrlC === 246) {
        clearInterval(scrollact);
        const levLoad = JSON.parse(localStorage.getItem('GS'));
        if (!(levLoad.levelsPassed === levLoad.levels.length)) {
          levLoad.numberOfStagesPlayed += 1;
          elem.classList.remove("level-num-div-locked");
          elem.classList.add("level-num-div");
          elem.classList.add("super-pop");
          elem.style.pointerEvents = "auto";
        }
        levLoad.scroll = scrll;
        levLoad.levels[levLoad.levelsPassed - 1].animPlayed = true;
        localStorage.setItem("GS", JSON.stringify(levLoad));
        return;
      }
      scrll += 3;
      scrlC += 3;
      window.scrollTo(0, scrll);
    }, 10);
  }, 1500);
}

okMain.addEventListener("click", () => {
  slideMain.style.display = "none";
  dailyReward.style.display = "none";
});
