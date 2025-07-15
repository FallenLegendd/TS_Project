export type AlertStatusType = "success" | "error" | "warning" | "info";

export type AlertType = {
    id: number;
    message: string;
    type: AlertStatusType;
}

export type AlertAction =
| {type: 'SHOW_INFO'; payload: {message: string}} 
| {type: 'SHOW_SUCCESS'; payload: {message: string}} 
| {type: 'SHOW_WARNING'; payload: {message: string}} 
| {type: 'SHOW_ERROR'; payload: {message: string}} 
| {type: 'REMOVE_ALERT'; payload: {id: number}}
| {type: 'CLEAR_ALERTS'}

export type AlertState = {
    alerts: AlertType[];
}

export type AlertContextType = {
    alerts: AlertType[];
    dispatch: React.Dispatch<AlertAction>;
}

export const initialState: AlertState = {
    alerts: [],
}

