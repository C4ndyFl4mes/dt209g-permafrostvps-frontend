
/*
    SiteConfig interface representerar webbplatsens konfigurationsinställningar.
*/
export interface SiteConfig {
    layout_settings: {
        sidebar_position: 'left' | 'right';
    },
    seo_settings: {
        logotype: {
            url: string;
            alt: string;
        } | null,
        favicon: {
            url: string;
            alt: string;
        } | null,
        website_title: string;
    },
    footer_settings: {
        footer_text: string;
        contact: {
            email: string;
            phone: string;
            address: string;
        }
    }
}