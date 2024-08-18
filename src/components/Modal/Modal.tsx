import css from "./Modal.module.css";
import {  MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./Modal.types";
// import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

export function Modal({ onClose, children }: ModalProps) {
  useEffect((): (() => void) => {
    const handleKeydown = (e: globalThis.KeyboardEvent): void => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent): void => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
