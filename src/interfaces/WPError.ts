
export interface WPError {
    code: string;
    message: string;
    data: {
        status: number;
    };
}