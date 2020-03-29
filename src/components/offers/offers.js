import React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./offers.css";
import { links } from "../../constants/router/links";
import { compClassName } from "../../utils/composed-class-name";
import { useInternationalization } from "../../hooks/use-internationalization";
import { keys } from "../../constants/internationalization/keys";
import { Container } from "../container/container";

const Offer = React.memo(()=>{

  return (
    <div className={classes.offer}>
      <h3 className={compClassName(globalClasses.headlineThree, classes.cardHeadline)}>
        Lorem ipsum dolor sit
      </h3>

      <p className={classes.offerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem doloremque ea incidunt laborum necessitatibus quaerat totam? Aut doloremque, impedit iusto laboriosam molestias praesentium quibusdam quis quos veniam voluptatum. Corporis
      </p>
    </div>
  );
});

const Offers = () => {
  const [{translate}]= useInternationalization();

  return (
    <Container>
      <div id={links.offers} className={compClassName(globalClasses.content, classes.offers)}>
        <h2 className={globalClasses.headlineTwo}>
          {translate(keys.whatDoWeOffer)}
        </h2>

        <div className={classes.offersContainer}>
          <Offer/>

          <Offer/>

          <Offer/>
        </div>
      </div>
    </Container>
  );
};

Offer.displayName = "Offer";
Offers.displayName = "Offers";

export { Offers };
