import { notification } from 'antd';
import Result from '../models/Result';

export default class Alert {
    public static handelResult(result: Result<any>): void {
        if (result.success) {
            Alert.success(result.message, result.description);
        } else {
            Alert.error(result.message, result.description);
        }
    }

    public static error(message: string, description?: string): void {
        Alert.notification('error', message, description);
    }

    public static success(message: string, description?: string): void {
        Alert.notification('success', message, description);
    }

    public static warning(message: string, description?: string): void {
        Alert.notification('warning', message, description);
    }

    public static info(message: string, description?: string): void {
        Alert.notification('info', message, description);
    }

    private static notification(
        type: 'success' | 'info' | 'warning' | 'error',
        message: string,
        description?: string
    ): void {
        notification[type]({
            message,
            description
        });
    }
}
