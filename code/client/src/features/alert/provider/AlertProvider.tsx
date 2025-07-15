import { useReducer } from "react";
import { AlertContext } from "../context/AlertContext";
import { type AlertState, type AlertAction, initialState } from "../model";

const alertReducer = (state: AlertState, action: AlertAction): AlertState => {
  switch (action.type) {
    case "SHOW_INFO":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { id: Date.now(), message: action.payload.message, type: "info" },
        ],
      };
    case "SHOW_SUCCESS":
      return {
        ...state,
        alerts: [...state.alerts, { id: Date.now(), message: action.payload.message, type: "success" }],
      };
    case "SHOW_WARNING":
      return {
        ...state,
        alerts: [...state.alerts, { id: Date.now(), message: action.payload.message, type: "warning" }],
      };
    case "SHOW_ERROR":
      return {
        ...state,
        alerts: [...state.alerts, { id: Date.now(), message: action.payload.message, type: "error" }],
      };
    case "REMOVE_ALERT":
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload.id),
      };
    case "CLEAR_ALERTS":
      return { ...state, alerts: [] };
    default:
      return state;
  }
};


export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(alertReducer, initialState);

    const contextValue = {
        alerts: state.alerts,
        dispatch,
    }

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    )
}