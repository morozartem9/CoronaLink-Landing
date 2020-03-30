import React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./demo.css";
import { links } from "../../constants/router/links";
import { compClassName } from "../../utils/composed-class-name";
import { Container } from "../container/container";
import { useInternationalization } from "../../hooks/use-internationalization";
import { keys } from "../../constants/internationalization/keys";
import slideImage from "../../assets/slides/test.png";
import { useListener } from "../../hooks/use-listener";

const slides = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga incidunt minima molestias obcaecati reprehenderit! Adipisci assumenda, maxime minima nam sequi voluptatibus! A accusantium amet asperiores dignissimos, distinctio doloremque eveniet ex exercitationem, facilis illo impedit ipsam laudantium natus nemo nisi nostrum quisquam rem repellat reprehenderit repudiandae soluta suscipit tempore velit voluptatem",
    image: slideImage,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga incidunt minima molestias obcaecati reprehenderit! Adipisci assumenda, maxime minima nam sequi voluptatibus! A accusantium amet asperiores dignissimos, distinctio doloremque eveniet ex exercitationem, facilis illo impedit ipsam laudantium natus nemo nisi nostrum quisquam rem repellat reprehenderit repudiandae soluta suscipit tempore velit voluptatem",
    image: slideImage,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga incidunt minima molestias obcaecati reprehenderit! Adipisci assumenda, maxime minima nam sequi voluptatibus! A accusantium amet asperiores dignissimos, distinctio doloremque eveniet ex exercitationem, facilis illo impedit ipsam laudantium natus nemo nisi nostrum quisquam rem repellat reprehenderit repudiandae soluta suscipit tempore velit voluptatem",
    image: slideImage,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga incidunt minima molestias obcaecati reprehenderit! Adipisci assumenda, maxime minima nam sequi voluptatibus! A accusantium amet asperiores dignissimos, distinctio doloremque eveniet ex exercitationem, facilis illo impedit ipsam laudantium natus nemo nisi nostrum quisquam rem repellat reprehenderit repudiandae soluta suscipit tempore velit voluptatem",
    image: slideImage,
  },
];

const Slider = () => {
  const ref = React.useRef(null);

  const [slideIndex, setSlideIndex] = React.useState(0);

  const [scrollLeft, setScrollLeft] = React.useState(0);

  React.useEffect(
    () => {
      ref.current.scrollLeft = scrollLeft;
    },
    [scrollLeft],
  );

  const enhancedSetScrollLeft = () => {
    setScrollLeft(ref.current.offsetWidth * slideIndex);
  };

  React.useEffect(enhancedSetScrollLeft, [slideIndex]);

  useListener(window, "resize", enhancedSetScrollLeft, slideIndex);

  const onPrevArrowClick = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const onNextArrowClick = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={classes.sliderContainer}>
      <div ref={ref} className={classes.slider}>

        {
          slides.map((slide, index) => (
            <div key={index} className={classes.slide}>
              <p className={classes.slideDescription}>{slide.text}</p>

              <div style={{ backgroundImage: `url(${slide.image})` }} className={classes.slideImage} />
            </div>
          ))
        }

      </div>

      {
        slideIndex > 0 && (
          <div
            className={compClassName(globalClasses.fadingIn, classes.arrow, classes.prev)}
            onClick={onPrevArrowClick}
          />
        )
      }

      {
        slideIndex < slides.length - 1 && (
          <div
            className={compClassName(globalClasses.fadingIn, classes.arrow, classes.next)}
            onClick={onNextArrowClick}
          />
        )
      }

    </div>
  );
};

const Demo = () => {
  const [{ translate }] = useInternationalization();

  return (
    <Container>
      <div id={links.demo} className={compClassName(globalClasses.content, classes.demo)}>
        <h2 className={globalClasses.headlineTwo}>
          {translate(keys.demo)}
        </h2>

        <Slider />
      </div>
    </Container>
  );
};

Slider.displayName = "Slider";
Demo.displayName = "Demo";

export { Demo };
