"use strict";
import { WORDS_ARRAY } from "./wordsDatabase.js";

//The little guy that selects random words from the words database (for a secret purpose) U w U.
let mashed = "";
const putBack = [];
const GENERATE = () => {
  for (let i = 0; i < i + 1; i++) {
    if (mashed.length >= 25) {
      break;
    }
    const ran = Math.floor(Math.random() * WORDS_ARRAY.length);
    mashed += `${WORDS_ARRAY[ran]}`;
    putBack.push(WORDS_ARRAY[ran]);
    WORDS_ARRAY.splice(ran, 1);
  }
  return;
};
GENERATE();
export const genWords = `${mashed.slice(0, 25).toUpperCase()}`;
putBack.forEach(e => {
  WORDS_ARRAY.push(e);
});
