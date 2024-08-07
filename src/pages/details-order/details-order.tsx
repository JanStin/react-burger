import React from "react";
import styles from "./styles.module.css";
import { DetailsOfOrder } from "../../components/details-of-order/details-of-order"

export const DetailsOrder = (): React.JSX.Element => {
  return (
    <div className={styles.main}>
      <DetailsOfOrder />
    </div>
  );
};
