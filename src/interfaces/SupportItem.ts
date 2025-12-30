// Ett gränssnitt som representerar ett supportobjekt med titel, innehåll och bildinformation
export interface SupportItem {
    title: string;
    content: string;
    image: {
        title: string;
        alt: string;
        caption: string;
        thumbnail: string;
    }
}