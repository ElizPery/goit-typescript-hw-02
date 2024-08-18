export type ImageGalleryItemProps = {
    smallImg: string;
    toggleModal: (img: string, alt: string) => void;
    largeImageURL: string;
    alt: string;
}