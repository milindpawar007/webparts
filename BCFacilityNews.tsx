import * as React from "react";
import styles from "./BcFacilities.module.scss";

interface FacilityNewsProps {
  newsItems: { title: string; url: string }[];
}

const FacilityNews: React.FC<FacilityNewsProps> = ({ newsItems }) => {
  return (
    <ul>
      <li className={styles["entry-category"]}>
        <h6>Facility News</h6>
      </li>
      {newsItems.map((newsItem, index) => (
        <li key={index} className={styles["entry-post"]}>
          <a href={newsItem.url}>{newsItem.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default FacilityNews;
