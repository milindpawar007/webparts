import * as React from "react";
import { FC } from "react";
import Slider from "react-slick";
import styles from "./BcCarousel.module.scss";
import type { IBcCarouselProps } from "./IBcCarouselProps";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../../controls/Button";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from "@microsoft/sp-core-library";

const BcCarousel: FC<IBcCarouselProps> = ({
  items = [], // Default empty array to prevent undefined errors
  toggleInfoAutoPlay = true,
  showNavigation = true,
  infiniteLoop = true,
  slideDuration = 5000,
  onConfigurePropertyPane,
  displayMode,
  maxCharacters = 100 // Ensure default maxCharacters to avoid undefined issues
}) => {
  const windowTarget = new Map<string, string>([
    ["Same Window", "_self"],
    ["New Window", "_blank"],
  ]);

  const settings = {
    dots: showNavigation,
    infinite: infiniteLoop,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: toggleInfoAutoPlay,
    autoplaySpeed: slideDuration,
    arrows: false,
    fade: true,
    centerMode: false,
    cssEase: "linear",
    swipeToSlide: true,
  };

  const sortedItems = (items: any[]) => {
    return [...items].sort((a, b) => {
      const orderA = Number(a?.Order);
      const orderB = Number(b?.Order);

      if (!a?.Order || isNaN(orderA)) return 1;
      if (!b?.Order || isNaN(orderB)) return -1;

      return orderA - orderB;
    });
  };

  const truncateText = (text: string = "", maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div>
      {items.length === 0 ? (
        <div>
          <Placeholder
            iconName="Edit"
            iconText="Banner Connect Carousel"
            description="Please edit the webpart"
            buttonLabel="Edit"
            onConfigure={onConfigurePropertyPane}
            hideButton={displayMode === DisplayMode.Read}
          />
        </div>
      ) : (
        <section className={styles["bc-carousel"]}>
          <Slider {...settings}>
            {sortedItems(items).map((item, index) => (
              <div key={index}>
                <div className={styles["slide-container"]}>
                  <aside className={styles.aside}>
                    <h1>{truncateText(item?.Heading || "No Title", maxCharacters)}</h1>
                    <p>{truncateText(item?.SubHeading || "No Description", maxCharacters)}</p>

                    {typeof item?.ButtonText === "string" &&
                      item.ButtonText.trim() !== "" &&
                      typeof item?.ButtonLink === "string" &&
                      item.ButtonLink.trim() !== "" && (
                        <a
                          href={item.ButtonLink}
                          title={item.ButtonText}
                          target={windowTarget.get(item?.ButtonTarget) || "_self"}
                          rel="noopener noreferrer"
                        >
                          <Button variant="outlined-2">
                            {truncateText(item.ButtonText, maxCharacters)}
                          </Button>
                        </a>
                      )}
                  </aside>

                  {item?.ImageURL ? (
                    <img src={item.ImageURL} alt={`Slide ${index}`} />
                  ) : (
                    <div className={styles["image-placeholder"]}>Image Not Available</div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}
    </div>
  );
};

export default BcCarousel;
