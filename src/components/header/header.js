import * as React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./header.css";
import { Container } from "../container/container";
import { scrollToTop } from "../../utils/scroll-to-top";
import { condClassName } from "../../utils/conditional-class-name";
import { links } from "../../constants/router/links";
import { useListener } from "../../hooks/use-listener";
import { useInternationalization } from "../../hooks/use-internationalization";
import { not } from "../../utils/predicates";
import { compClassName } from "../../utils/composed-class-name";
import { languages } from "../../constants/internationalization/languages";
import { useOnClickOutside } from "../../hooks/use-on-click-oustside";

const MenuButton = React.memo(({ toggleMenu }) => (
  <div className={classes.menuButton} onClick={toggleMenu}>
    <div className={classes.menuButtonItem} />
    <div className={classes.menuButtonItem} />
    <div className={classes.menuButtonItem} />
    <div className={classes.menuButtonItem} />
    <div className={classes.menuButtonItem} />
    <div className={classes.menuButtonItem} />
  </div>
));

const Language = () => {
  const [{ language, setLanguage }] = useInternationalization();

  const [expanded, setExpanded] = React.useState(false);

  const [ref] = useOnClickOutside(() => setExpanded(false));

  const toggleExpanded = () => setExpanded(not);

  const onLanguageClick = (l) => () => {
    setExpanded(false);

    setLanguage(l);
  };

  return (
    <div ref={ref} className={classes.languageContainer}>
      <div
        className={compClassName(classes.languageIcon, classes[language])}
        onClick={toggleExpanded}
      />

      {
        expanded && (
          <ul className={compClassName(globalClasses.fadingIn, classes.listOfLanguages)}>

            {
              Object.values(languages)
                .filter((l) => l !== language)
                .map((l) => (
                  <li
                    key={l}
                    className={compClassName(classes[l], classes.languageIcon)}
                    onClick={onLanguageClick(l)}
                  />
                ))
            }

          </ul>
        )
      }
    </div>
  );
};

const Menu = () => {
  const [{ translate }] = useInternationalization();

  const [menu, setMenu] = React.useState(false);

  const resizeListener = () => (window.innerWidth > 768) && hideMenu();

  useListener(window, "resize", resizeListener);

  React.useEffect(
    () => {
      if (menu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    [menu],
  );

  const toggleMenu = () => setMenu(!menu);

  const hideMenu = () => setMenu(false);

  const onLinkClick = () => {
    hideMenu();

    scrollToTop();
  };

  return (
    <div className={`${classes.menu} ${condClassName(classes.visible, menu)}`}>
      <MenuButton toggleMenu={toggleMenu} />

      <div className={classes.links}>

        {
          Object
            .values(links)
            .slice(1)
            .map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={classes.link}
                onClick={onLinkClick}
              >
                {translate(link)}
              </a>
            ))
        }

        <Language />
      </div>
    </div>
  );
};

export const Header = () => (
  <div className={classes.headerContainer}>
    <Container>
      <div className={classes.header}>
        <a
          href={`#${links.home}`}
          className={classes.logo}
          onClick={scrollToTop}
        >
          LOREM10
        </a>

        <Menu />
      </div>
    </Container>
  </div>
);

Header.displayName = "Header";
Menu.displayName = "Menu";
MenuButton.displayName = "MenuButton";
