import React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./demo.css";
import { links } from "../../constants/router/links";
import { compClassName } from "../../utils/composed-class-name";
import { Container } from "../container/container";
import { useInternationalization } from "../../hooks/use-internationalization";
import { keys } from "../../constants/internationalization/keys";

const Demo = () => {
  const [{ translate }] = useInternationalization();

  return (
    <Container>
      <div id={links.demo} className={compClassName(globalClasses.content, classes.demo)}>
        <h2 className={globalClasses.headlineTwo}>
          {translate(keys.demo)}
        </h2>
      </div>
    </Container>
  );
};

Demo.displayName = "Demo";

export { Demo };
