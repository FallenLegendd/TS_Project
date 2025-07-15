import { useEffect, useState } from "react";
import type { NotificationType } from "../model";
import { useNotifications } from "../hooks/useNotifications";
import styles from './NotificationContainer.module.css'
import { useAlerts } from "@/features/alert";




function NotificationItem({notification}: {notification: NotificationType}){
    const [isShow, setIsShow] = useState(false)
    const { dispatch } = useNotifications()

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsShow(true);
        }, 1750);
    
        const timer2 = setTimeout(() => {
          setIsShow(false);
        }, 2800);
    
        const timer3 = setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATIONS" });
        }, 3200);

        return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div>
     <div
      className={`${styles.notification} ${styles[notification.type]} ${
        isShow ? styles.enter : styles.exit
      }`}
      >
        <span className={styles.message}>{notification.message}</span>
      </div>
    </div>
  );

}



export  function NotificationContainer() {
  const { alerts } = useAlerts();
  return (
    <div className={styles.notificationContainer}>
      {alerts.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}