import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
export default function Modal({
  title,
  onClose,
  children,
  drawer = false,
  className = "",
}) {
  const ref = useRef();
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const el = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      className={`${drawer ? "drawer" : "modal"} ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        close.current();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close.current();
        }
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          autoFocus
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>,
    document.body,
  );
}
