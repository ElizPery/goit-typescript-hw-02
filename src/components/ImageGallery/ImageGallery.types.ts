import { ImageItem } from "../../types";

export type ImageGalleryProps = {
    items: ImageItem[];
    toggleModal: (img: string, alt: string) => void;
}