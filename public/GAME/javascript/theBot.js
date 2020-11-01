"use strict";
import { WORDS_ARRAY } from "./wordsDatabase.js";
import { genWords as GIVEN_WORDS } from "./wordsFilter.js";
/**
 * Ah!...the story behind this one is unique. Damn, this was actually one of the major things that made me start making a word game of all games. After learnig about array methods and stuffs about strings, I started creating and solving my own algorithm problems(not really 'creating per say, they already existed, I just didn't know. It was stuff like printing all the permutations of any given string).
 *
 * After that I then thought, wouldn't it be cool if I created something that could get all the possible words that could be spelled from any given set of letters. And boom, the game was born. This is actually the first module of the game. *tears up*. Its called the bot beacause I later wanted players to play against a bot in a "who can spell with the most letters" kind of game but it wasn't transparent so I scrapped the feature entirely...
 * after spending months building it :) *dies inside*
 *
 */
const botWords = [];
export const VALID = [];
export const RUN_BOT = () => {
  //initializes the bot.
  const GIVEN = [];
  for (let i = 0; i < GIVEN_WORDS.length; i++) {
    GIVEN.push(GIVEN_WORDS.charAt(i));
  }
  //finds all possible words that can be spelled from any given set of letters.
  for (let j = 0; j < j + 1; j++) {
    if (j === WORDS_ARRAY.length) {
      botWords.forEach(e => {
        //maps all words from the database to an pbject to be used for checking valid words.
        VALID.push(e);
      });
      return;
    }
    const LETTERS = [];
    GIVEN.forEach(e => {
      LETTERS.push(e);
    });
    for (let i = 0; i < WORDS_ARRAY[j].length; i++) {
      const letter = WORDS_ARRAY[j].charAt(i);
      if (
        LETTERS.includes(letter) === true &&
        i !== WORDS_ARRAY[j].length - 1
      ) {
        LETTERS.splice(LETTERS.indexOf(letter), 1);
        continue;
      } else if (
        LETTERS.includes(letter) === true &&
        i === WORDS_ARRAY[j].length - 1
      ) {
        botWords.push(WORDS_ARRAY[j]);
      } else {
        break;
      }
    }
  }
};
RUN_BOT();
