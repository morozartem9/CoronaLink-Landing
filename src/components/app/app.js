import React from "react";

import * as classes from "./app.css";
import { Header } from "../header/header";
import { Home } from "../home/home";
import { Offers } from "../offers/offers";
import { Demo } from "../demo/demo";
import { ContactUs } from "../contact-us/contact-us";
import { Footer } from "../footer/footer";

const App = () => (
  <div className={classes.app}>
    <Header />

    <Home />

    <Offers />

    <Demo />

    <ContactUs />

    <Footer/>
  </div>
);

App.displayName = "App";

export { App };
