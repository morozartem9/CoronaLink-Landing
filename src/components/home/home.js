import React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./home.css";
import { links } from "../../constants/router/links";
import { compClassName } from "../../utils/composed-class-name";
import { Container } from "../container/container";

const Home = () => {

  return (
    <Container>
      <div id={links.home} className={compClassName(globalClasses.content, classes.home)}>
        <div className={classes.container}>
          <h1 className={compClassName(globalClasses.headlineOne, classes.headline)}>
            Lorem ipsum dolor sit amet, consectetur.
          </h1>

          <p className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias aperiam aut dolor dolorem dolores,
            doloribus ducimus eaque eum eveniet excepturi exercitationem incidunt ipsam ipsum iure iusto laudantium
            minus nulla obcaecati officia omnis placeat porro provident quidem quo recusandae repellat, repellendus
            rerum saepe sint sunt temporibus ut vel voluptatem!
          </p>

          <div className={classes.imageContainer}>
            <div className={classes.image} />
          </div>
        </div>
      </div>
    </Container>
  );
};

Home.displayName = "Home";

export { Home };
