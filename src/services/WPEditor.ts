import axios, { type AxiosResponse, type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios';
import type { Section } from '@/interfaces/Section';
import type { MenuItem } from '@/interfaces/MenuItem';
import type { SiteConfig } from '@/interfaces/SiteConfig';
import type { NewsItem } from '@/interfaces/NewsItem';
import type { WPError } from '@/interfaces/WPError';

/**
 * WPEditor service hanterar kommunikationen med WordPress Editor API.
 */
export class WPEditor {

    // Axios klient för API-anrop
    private static client = axios.create({
        baseURL: 'https://studenter.miun.se/~issv2400/writeable/project1/wordpress/wp-json/wp-editor/v1'
    });
    // Standardkonfiguration för API-anrop
    private static config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders
    };

    /**
     * Hämtar sektioner för en given sid-slug.
     * @param page_slug - Sid-slug för vilken sektioner ska hämtas.
     * @returns - En lista av sektioner.
     */
    public static async getSections(page_slug: string): Promise<Section[] | WPError> {
        const response: AxiosResponse<Section[] | WPError> = await this.client.get(`/sections?slug=${page_slug}`, this.config);
        return response.data;
    }

    /**
     * Hämtar menyobjekt för en given menyplats.
     * @param menu_name - Menyplatsens namn.
     * @returns - En lista av menyobjekt.
     */
    public static async getMenuItems(menu_name: string): Promise<MenuItem[]> {
        const response: AxiosResponse<MenuItem[]> = await this.client.get(`/menus?location=${menu_name}`, this.config);
        return response.data;
    }

    /**
     * Hämtar webbplatsens konfigurationsinställningar.
     * @returns - Webbplatsens konfigurationsinställningar.
     */
    public static async getSiteConfig(): Promise<SiteConfig> {
        const response: AxiosResponse<SiteConfig> = await this.client.get('/site-config', this.config);
        return response.data;
    }

    /**
     * Hämtar en enskild nyhetsartikel baserat på dess slug.
     * @param slug - Nyhetsartikelns slug.
     * @returns - En nyhetsartikel.
     */
    public static async getSingleNews(slug: string): Promise<NewsItem> {
        const response: AxiosResponse<NewsItem> = await this.client.get(`/news?slug=${slug}`, this.config);
        return response.data;
    }
}