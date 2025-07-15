import { createContext } from "react";
import type { AlertContextType } from "../model";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);


