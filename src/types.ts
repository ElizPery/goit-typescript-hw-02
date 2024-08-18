export type ApiResponce = {
  items: ImageItem[];
  total: number;
}

export type ImageItem = {
    id: number;
    webformatURL: string;
    largeImageURL: string;
    tags: string;
    [x: string]: string | number;
};