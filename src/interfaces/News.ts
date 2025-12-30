import type { NewsItem } from "./NewsItem";

// Ett gränssnitt som representerar en lista av nyhetsobjekt
export interface News {
    news: NewsItem[];
}