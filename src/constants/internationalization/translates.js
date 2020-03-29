import { languages } from "./languages";
import { en } from "./en";
import { ru } from "./ru";
import { it } from "./it";

const translates = {
  [languages.en]: en,
  [languages.ru]: ru,
  [languages.it]: it,
};

export { translates };
