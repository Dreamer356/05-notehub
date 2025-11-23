import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);


  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
