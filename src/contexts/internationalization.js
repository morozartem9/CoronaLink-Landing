import React from "react";

import { translates } from "../constants/internationalization/translates";
import { isNil } from "../utils/predicates";
import { languages } from "../constants/internationalization/languages";

const InternationalizationContext = React.createContext(undefined);

const getLanguage = () => {
  const rawLanguage = navigator.language || navigator.userLanguage;

  const language = !isNil(rawLanguage)
    ? rawLanguage.split("-")[0]
    : "";

  return languages[language] ?? languages.en;
};

const I18nProvider = ({
                        children,
                      }) => {
  const [language, setLanguage] = React.useState(getLanguage());

  const translate = (key) => {
    if (isNil(key)) {
      // eslint-disable-next-line no-console
      console.error("key not provided");

      return "@key@";
    }

    const translatesMap = translates[language];

    if (isNil(translatesMap)) {
      // eslint-disable-next-line no-console
      console.error("no translates for this language: %s", language);

      return "@translates@";
    }

    const translation = translatesMap[key];

    if (isNil(translation)) {
      // eslint-disable-next-line no-console
      console.error("no translation found for this key: %s", key);

      return "@translation@";
    }

    return translation;
  };

  return (
    <InternationalizationContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </InternationalizationContext.Provider>
  );
};

I18nProvider.displayName = "I18nProvider";

export { InternationalizationContext, I18nProvider };
