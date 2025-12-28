
/*
    MenuItem interface representerar ett menyobjekt.
*/
export interface MenuItem {
    id: number;
    title: string;
    slug: string;
    page_id: number;
    parent_id: number;
}