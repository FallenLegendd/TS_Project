import { useAlerts } from "../hooks/useAlerts";
import styles from "./AlertContainer.module.css";
import { useEffect, useState } from "react";
import type { AlertType } from "../model";

function AlertItem({ alert }: { alert: AlertType }) {
  const [isExiting, setIsExiting] = useState(false);
  const { dispatch } = useAlerts();


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1750);

    const timer2 = setTimeout(() => {
      setIsExiting(false);
    }, 2800);

    const timer3 = setTimeout(() => {
      dispatch({ type: "CLEAR_ALERTS" });
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  /* return (
    <div>
    {isExiting ? (<div
      className={`${styles.alert} ${styles[alert.type]} ${
        isExiting ? styles.enter : styles.exit
      }`}
      >
        <span className={styles.message}>{alert.message}</span>
      </div>) : (<></>)
    }
    </div>
  ); */

  return (
    <div>
     <div
      className={`${styles.alert} ${styles[alert.type]} ${
        isExiting ? styles.enter : styles.exit
      }`}
      >
        <span className={styles.message}>{alert.message}</span>
      </div>
    </div>
  );
}

export  function AlertContainer() {
  const { alerts } = useAlerts();
  return (
    <div className={styles.alertContainer}>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  )
}
