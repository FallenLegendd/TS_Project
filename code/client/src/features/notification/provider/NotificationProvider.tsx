import { useReducer } from "react";
import { NotificationContext } from "../context/NotificationContext";
import {
  type NotificationState,
  type NotificationAction,
  initialState,
} from "../model";

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "SHOW_INFO":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: action.payload.message, type: "info" },
        ],
      };
    case "SHOW_SUCCESS":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: action.payload.message, type: "success" },
        ],
      };
    case "SHOW_WARNING":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: action.payload.message, type: "warning" },
        ],
      };
    case "SHOW_ERROR":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: action.payload.message, type: "error" },
        ],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload.id)
      };
    case 'CLEAR_NOTIFICATIONS':
        return {...state, notifications: []}
    default:
        return state
  }
};

export const NotificationProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    const contextValue = {
        notifications: state.notifications,
        dispatch,
    }

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    )
}
