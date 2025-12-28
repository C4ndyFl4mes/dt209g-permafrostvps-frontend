
/*
    SiteConfig interface representerar webbplatsens konfigurationsinställningar.
*/
export interface SiteConfig {
    layout_settings: {
        sidebar_position: 'left' | 'right';
    },
    color_settings: {
        primary_color: string;
        secondary_color: string;
        primary_text_color: string;
        secondary_text_color: string;
        button_color: string;
        button_text_color: string;
        link_color: string;
    },
    seo_settings: {
        logotype: {
            url: string;
            alt: string;
        } | null,
        favicon: {
            url: string;
            alt: string;
        } | null
    }
}