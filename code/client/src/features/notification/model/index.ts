export type NotificationStatusType = "success" | "error" | "warning" | "info";

export type NotificationType = {
    id: number;
    message: string;
    type: NotificationStatusType;
}

export type NotificationAction = 
| {type: 'SHOW_INFO'; payload: {message: string}}
| {type: 'SHOW_SUCCESS'; payload: {message: string}}
| {type: 'SHOW_WARNING'; payload: {message: string}}
| {type: 'SHOW_ERROR'; payload: {message: string}}
| {type: 'REMOVE_NOTIFICATION'; payload: {id: number}}
| {type: 'CLEAR_NOTIFICATIONS'}

export type NotificationState = {
    notifications: NotificationType[]
}

export type NotificationContextType = {
    notifications: NotificationType[];
    dispatch: React.Dispatch<NotificationAction>
}

export const initialState: NotificationState = {
    notifications: [],
}



