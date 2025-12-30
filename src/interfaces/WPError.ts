// Ett gränssnitt som representerar ett WordPress-fel
export interface WPError {
    code: string;
    message: string;
    data: {
        status: number;
    };
}