import { createContext } from "react";
import type { NotificationContextType } from "../model";

export const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)