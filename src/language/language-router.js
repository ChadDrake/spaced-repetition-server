const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const LinkedList = require("../Linked-List/LinkedList");
const { listen } = require("../app");

const languageRouter = express.Router();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.use(express.json());
languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/head", async (req, res, next) => {
  try {
    let firstWord = await LanguageService.getFirstWord(
      req.app.get("db"),
      req.language.head
    );
    let word = firstWord[0];
    res.json({
      nextWord: word.original,
      totalScore: req.language.total_score,
      wordCorrectCount: word.correct_count,
      wordIncorrectCount: word.incorrect_count,
    });
  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", async (req, res, next) => {
  let { guess } = req.body;

  if (!guess) {
    return res.status(400).json({ error: "Missing 'guess' in request body" });
  }
  let db = req.app.get("db");
  let firstWord = await LanguageService.getFirstWord(db, req.language.head);
  let word = firstWord[0];
  let isCorrect = false;
  if (word.translation === guess) {
    isCorrect = true;
    word.correct_count++;
    req.language.total_score++;
    word.memory_value *= 2;
  } else {
    word.incorrect_count++;
    word.memory_value = 1;
  }
  let list = new LinkedList();
  let words = await LanguageService.getLanguageWords(db, req.language.id);
  list.insertFirst(word);
  let currNode = list.head;
  while (currNode.value) {
    let nextWord = words.find((word) => word.id === currNode.value.next);
    if (!nextWord) {
      nextWord = null;
    }
    list.insertLast(nextWord);
    currNode = currNode.next;
  }
  let wordNode;
  list.remove(list.head.value.original);
  if (word.memory_value >= 10) {
    wordNode = list.insertLast(word);
  } else {
    wordNode = list.insertAt(word, word.memory_value + 1);
  }

  let tempNode = list.head;
  while (tempNode.next.value) {
    tempNode.value.next = tempNode.next.value.id;
    await LanguageService.updateWord(db, tempNode.value.id, tempNode.value);
    tempNode = tempNode.next;
  }

  await LanguageService.updateLanguage(db, req.language.id, {
    total_score: req.language.total_score,
    head: list.head.value.id,
  });
  let response = {
    isCorrect,
    wordCorrectCount: list.head.value.correct_count,
    wordIncorrectCount: list.head.value.incorrect_count,
    totalScore: req.language.total_score,
    answer: word.translation,
    nextWord: list.head.value.original,
  };

  res.json(response);
});

module.exports = languageRouter;
