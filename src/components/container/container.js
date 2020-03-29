import * as React from "react";

import classes from "./container.css";

export const Container = React.memo(({
                                       children,
                                     }) => (
  <div className={classes.container}>
    {children}
  </div>
));

Container.displayName = "Container";
