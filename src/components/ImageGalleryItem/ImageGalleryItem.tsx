import css from "./ImageGalleryItem.module.css";
import { ImageGalleryItemProps } from "./ImageGalleryItem.types";
// import PropTypes from "prop-types";

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ smallImg, toggleModal, largeImageURL, alt }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => toggleModal(largeImageURL, alt)}
    >
      <img src={smallImg} alt={alt} className={css.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

// ImageGalleryItem.propTypes = {
//   smallImg: PropTypes.string.isRequired,
//   toggleModal: PropTypes.func.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
// };
