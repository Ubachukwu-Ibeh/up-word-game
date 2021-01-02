import {
  create as c,
  component,
  createClone,
  style
} from "../../clone.js";
import {
  dailyRewardMainCont
} from "./Daily-rewards-main-container.js";
import {
  displayMenus,
  cash
} from "./Display-menus.js";
import {
  outerCoinsClone,
  coinsClone,
  coinsCloneDisc
} from "./Coins.js";

const empty = c("div");
export let cId = 0;
const rewardImages = ['url(Images/smallCoins.png)', 'url(Images/chest.png)'];
const csc = document.getElementById('coming-soon');

const comingSoon = document.createElement('p')
comingSoon.innerText = 'Coming soon!';
comingSoon.classList.add('coming-soon');

const showComingSoon = (e) => {
  csc.style.display = 'flex';
  csc.appendChild(comingSoon);
  comingSoon.classList.add('fade-in');
  e && (e.style.pointerEvents = "none");

  setTimeout(() => {
    csc.style.display = 'none';
    comingSoon.style.display = 'none';
    csc.removeChild(comingSoon);
  }, 980);
}
if(sessionStorage.getItem('tried400')) {
  sessionStorage.removeItem('tried400');
  showComingSoon();
}

component("Daily-reward", () => c("div", {}, ["rewardPic"], ["claimBtn"]), {
  props: {
    rewardPic() {
      return c("div");
    },
    claimBtn() {
      return c(
        "div", {},
        c(
          "p", {
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
      style({
          margin: "auto",
          display: "flex",
          "flex-direction": "column"
        },
        this.main
      );

      style({
          margin: "auto",
          "margin-bottom": "0px",
          width: "40vw",
          height: "40vw",
          'background-image': rewardImages.splice(0, 1)[0],
          'background-position': 'center',
          'background-size': '150%',
          'background-repeat': 'no-repeat',
        },
        this.rewardPic
      );

      style({
          margin: "auto",
          "margin-top": "10px",
          display: "flex",
          padding: "3vw 5vw",
          "background-image": obj.cId === 0 ?
            `linear-gradient(
            rgb(213, 255, 194),
            rgb(131, 255, 74),
            rgb(129, 214, 31),
            rgb(99, 255, 37)
          )` : `linear-gradient(
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

      style({
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

      style({
          margin: "auto",
          "margin-left": "2px"
        },
        this.rPrice.parentNode
      );

      this.claimBtn.addEventListener("click", () => {
        displayMenus.screen = empty;
        document.getElementById("slide-main").style.height = "unset";
        if (this.cId === 0) {
          outerCoinsClone.giveCoins();
          [coinsCloneDisc, coinsClone, outerCoinsClone].forEach(e => {
            e.internalCoinsCounter += 100;
            e.coins = `${e.internalCoinsCounter}`;
          })
          const storage = JSON.parse(localStorage.getItem('GS'));
          storage.sfx && cash.play();
          storage.coins += 100;
          localStorage.setItem('GS', JSON.stringify(storage));
        } else {
          showComingSoon(this.main);
        }
      });
    }
  }
});
dailyRewardMainCont.dailyReward1 = createClone("Daily-reward", false).main;
dailyRewardMainCont.dailyReward2 = createClone("Daily-reward", false).main;