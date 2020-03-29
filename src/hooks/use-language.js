import React from "react";

import { InternationalizationContext } from "../contexts/internationalization";

const useLanguage = () => [React.useContext(InternationalizationContext)];

export { useLanguage };
