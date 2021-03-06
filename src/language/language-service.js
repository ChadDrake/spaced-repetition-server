const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },
  getFirstWord(db, id) {
    return db.from("word").select("*").where({ id });
  },
  updateWord(db, id, item) {
    return db.from("word").where({ id }).update({
      memory_value: item.memory_value,
      correct_count: item.correct_count,
      incorrect_count: item.incorrect_count,
      next: item.next,
    });
  },
  updateLanguage(db, id, item) {
    return db
      .from("language")
      .where({ id })
      .update({ total_score: item.total_score, head: item.head });
  },
};

module.exports = LanguageService;
