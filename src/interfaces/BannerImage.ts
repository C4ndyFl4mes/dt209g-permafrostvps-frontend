// Ett gränssnitt som representerar en bannerbild med olika storlekar och alternativ text
export interface BannerImage {
    banner_image: {
        alt: string;
        large: {
            url: string;
            width: number;
            height: number;
        }
        small: {
            url: string;
            width: number;
            height: number;
        }
    }
}