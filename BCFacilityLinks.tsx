import * as React from "react";
import styles from "./BcFacilities.module.scss";

interface FacilityLink {
  Title: string;
  Url: string;
  WindowTarget?: string;
}

interface FacilityLinksProps {
  facilitiesArray: FacilityLink[];
  windowTarget: Map<string, string>;
}

const FacilityLinks: React.FC<FacilityLinksProps> = ({
  facilitiesArray,
  windowTarget,
}) => {
  if (facilitiesArray.length === 0) {
    return null;
  }

  return (
    <ul>
      <li className={styles["entry-category"]}>
        <h6>Facility Links</h6>
      </li>
      {facilitiesArray.map((link, index) => {
        const target =
          windowTarget.get(link?.WindowTarget ?? "New Window") ?? "_blank";
        return (
          <li key={index} className={styles["entry-post"]}>
            <a href={link.Url} target={target}>
              {link.Title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default FacilityLinks;
