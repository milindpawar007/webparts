import * as React from "react";
import { useState } from "react";
import { FC } from "react";
import styles from "./BcFacilities.module.scss";
import type { IBcFacilitiesProps } from "./IBcFacilitiesProps";
import BcModal from "./BcModal";
import FacilityLinks from "./BCFacilityLinks";
import FacilityNews from "./BCFacilityNews";

const BcCarousel: FC<IBcFacilitiesProps> = ({
  items,
  facility,
  setUserProperty,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tempSelectedFacility, setTempSelectedFacility] = useState<string>(
    items.find((item) => item.Title.toLowerCase() === facility.toLowerCase())
      ?.Title || items[0].Title
  );

  const selectedItem = items.find(
    (item) => item.Title.toLowerCase() === facility.toLowerCase()
  ) ||
    items[0] || {
      Title: "",
      BC_FacilityImage: { Url: "" },
      BC_FacilityLink: { Url: "" },
      BC_FacilityLinks: [],
    };

  const [selectedFacility, setSelectedFacility] = useState<string>(
    selectedItem?.Title || ""
  );
  const [facilityImage, setFacilityImage] = useState<string>(
    selectedItem?.BC_FacilityImage.Url || ""
  );
  const [facilityLink, setFacilityLink] = useState<string>(
    selectedItem?.BC_FacilityLink.Url || ""
  );
  const [facilitiesArray, setfacilitiesArray] = useState<[]>(
    selectedItem?.BC_FacilityLinks || []
  );

  const windowTarget = new Map<string, string>([
    ["Same Window", "_self "],
    ["New Window", "_blank"],
  ]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleSelect = async () => {
    const selectedItem = items.find(
      (item) => item.Title === tempSelectedFacility
    );
    if (selectedItem) {
      setSelectedFacility(selectedItem.Title);
      setFacilityImage(selectedItem.BC_FacilityImage.Url);
      setFacilityLink(selectedItem.BC_FacilityLink.Url);
      setfacilitiesArray(selectedItem.BC_FacilityLinks);
      setIsOpen(false);
      await setUserProperty(selectedItem.Title);
    }
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const facilityNewsItems = [
    {
      title: "NEW BHH & BBMC Campus Phone Lists",
      url: "https://bannerhealth.sharepoint.com/sites/Connect/HeartHospital/Pages/Article.aspx?newsID=4",
    },
    {
      title: "BBMC BHH Geriatric Toolkit Q1 2021",
      url: "https://bannerhealth.sharepoint.com/sites/Connect/HeartHospital/Pages/Article.aspx?newsID=3",
    },
    {
      title: "BHH Daisy Winner - Q3 2021",
      url: "https://bannerhealth.sharepoint.com/sites/Connect/HeartHospital/Pages/Article.aspx?newsID=1",
    },
  ];

  return (
    <section className={styles["bh-card"]}>
      <div className={styles["widget-location"]}>
        <div className={styles["widget-container"]}>
          <div className={styles["widget-content"]}>
            <div className={styles["widget-item"]}>
              <div className={styles["widget-image"]}>
                <a href={facilityLink} className="facilityimage">
                  <img
                    src={facilityImage}
                    alt="Banner Heart Hospital"
                    className={styles["facility-location-image"]}
                  />
                </a>
              </div>
              <div className={styles["widget-text"]}>
                <h4>
                  <a href={facilityLink} className={styles["facility-name"]}>
                    {selectedFacility}
                  </a>
                </h4>
                <a
                  className={styles["change-location"]}
                  onClick={handleButtonClick}
                >
                  Change facility
                </a>
              </div>
            </div>
          </div>
        </div>
        <ul
          className={`${styles.accordion} ${
            isCollapsed ? styles.collapsed : styles.expanded
          }`}
        >
          <li className={styles["accordion-item"]}>
            <a
              href="#"
              className={`${styles["accordion-title"]} ${
                isCollapsed ? styles.collapsed : ""
              }`}
              onClick={toggleCollapse}
            >
              Facility link and news
            </a>

            <div className={styles["accordion-content"]}>
              {facilityNewsItems.length > 0 && (
                <FacilityNews newsItems={facilityNewsItems} />
              )}
              {facilitiesArray.length > 0 && (
                <FacilityLinks
                  facilitiesArray={facilitiesArray}
                  windowTarget={windowTarget}
                />
              )}
            </div>
          </li>
        </ul>
      </div>
      <BcModal
        isOpen={isOpen}
        items={items}
        tempSelectedFacility={tempSelectedFacility}
        setTempSelectedFacility={setTempSelectedFacility}
        handleSelect={handleSelect}
        handleClose={handleClose}
      />
    </section>
  );
};

export default BcCarousel;
