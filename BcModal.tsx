import * as React from "react";
import { FC } from "react";
import styles from "./BcFacilities.module.scss";
import Button from "../../../controls/Button";
import Selector from "../../../controls/Selector";

interface BcModalProps {
  isOpen: boolean;
  items: any[];
  tempSelectedFacility: string;
  setTempSelectedFacility: (value: string) => void;
  handleSelect: () => void;
  handleClose: () => void;
}

const BcModal: FC<BcModalProps> = ({
  isOpen,
  items,
  tempSelectedFacility,
  setTempSelectedFacility,
  handleSelect,
  handleClose,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTempSelectedFacility(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.revealOverlay}>
      <div className={`${styles.widgetChangeFacilityModal} ${styles.reveal}`}>
        <h1 className={styles.chooseFacilityModalDropdown}>
          Choose a facility
        </h1>
        <p className={styles.chooseFacilityModalDropdownPara}>
          This selection will inform the facility links and facility news on
          your homepage and in your personal navigation menu.
        </p>
        <div className="ui form">
          <div className={styles.selectionDropdown}>
            <Selector
              id="FacilitySelect"
              label="Facility"
              options={items.map((item) => ({
                value: item.Title,
                label: item.Title,
              }))}
              defaultValue={tempSelectedFacility}
              onChange={handleSelectChange}
            />
            <small>This can be changed at any time.</small>
          </div>
          <div className={styles.formButtons}>
            <a className={styles.btnCancel} onClick={handleClose}>
              Cancel
            </a>
            <Button onClick={handleSelect} variant="bh-primary-button-large">
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcModal;
