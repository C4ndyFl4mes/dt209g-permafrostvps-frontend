// Ett gränssnitt som representerar ett enskilt nyhetsobjekt
export interface NewsItem {
    id: number;
    title: string;
    content: string | undefined; // När nyhetsobjektet hämtas som en del av en lista kan innehållet vara undefined.
    excerpt: string;
    date: string;
    author: string | undefined; // När nyhetsobjektet hämtas som en del av en lista kan författaren vara undefined.
    thumbnail: string;
    alt: string;
    slug: string;
}