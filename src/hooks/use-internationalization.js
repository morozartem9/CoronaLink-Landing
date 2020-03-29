import React from "react";

import { InternationalizationContext } from "../contexts/internationalization";

const useInternationalization = () => [React.useContext(InternationalizationContext)];

export { useInternationalization };
