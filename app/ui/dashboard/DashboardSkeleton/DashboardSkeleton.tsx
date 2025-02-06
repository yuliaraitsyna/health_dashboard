import React from "react";
import styles from "./DashboardSkeleton.module.css";
import { HeartWidget } from "../Widgets/HeartWidget/HeartWidget";
import { InfoWidget } from "../Widgets/InfoWidget/InfoWidget";
import { AuthorWidget } from "../Widgets/AuthorWidget/AuthorWidget";

export default function DashboardSkeleton() {
  return (
    <div className={styles.grid}>
      <HeartWidget className={styles.widget}  />
      <InfoWidget className={styles.widgetLarge} />
      <AuthorWidget className={styles.widget} />
      <div className={styles.widgetWide}>Wide Widget</div>
      <div className={styles.widget}>Small Widget</div>
    </div>
  );
}
