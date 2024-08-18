import { useEffect, useState, useRef, FormEvent } from "react";
import Searchbar from "../Searchbar/Searchbar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import { fetchGallery } from "../../api/gallery.ts";
import Button from "../Button/Button.jsx";
import css from "./App.module.css";
import Loader from "../Loader/Loader.jsx";
import { Modal } from "../Modal/Modal.jsx";
import Notiflix from "notiflix";
import { ApiResponce, ImageItem } from "../../types.ts";

export function App() {
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<ImageItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const isFirstRender = useRef<boolean>(true);

  useEffect((): void => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData(query, page);
  }, [query, page]);

  const fetchData = async (query:string, page: number) => {
    if (query.trim() === "") {
      return Notiflix.Notify.warning("Please enter your request");
    }

    setIsLoading(true);

    try {
      const response: ApiResponce = await fetchGallery(query, page);

      if (response.items.length === 0) {
        setIsLoading(false);
        return Notiflix.Notify.failure("Nothing found");
      }

      setItems((prev) => [...prev, ...response.items]);
      setTotal(response.total);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const targetInput = target.elements[1] as HTMLInputElement;

    const inputValue = targetInput.value;

    setQuery(inputValue);
    setItems([]);
    setPage(1);
  };

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const onCloseModal = (): void => {
    setShowModal(false);
    setModalData("");
    setTags("");
  };

  const onOpenModal = (img: string, alt: string): void => {
    setShowModal(true);
    setModalData(img);
    setTags(alt);
  };

  return (
    <div className={css.app}>
      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={modalData} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      {items.length !== 0 && (
        <ImageGallery items={items} toggleModal={onOpenModal} />
      )}
      {isLoading && <Loader />}
      {isError && <div> "Something went wrong, please try another query" </ div>
      // {/* // Notiflix.Notify.failure(
      //   //   "Something went wrong, please try another query"
      //   // ) */}
      }
      {total / items.length > 1 && !isLoading && items.length !== 0 && (
        <Button onClick={handleLoadMore} />
      )}
    </div>
  );
}
