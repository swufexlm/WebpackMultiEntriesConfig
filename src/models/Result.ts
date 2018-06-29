export default interface Result<T> {
    success: boolean;
    errorCode: string;
    message: string;
    description?: string;
    data?: T;
}
