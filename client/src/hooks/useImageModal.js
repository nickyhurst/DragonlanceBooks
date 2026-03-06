import { useState } from "react";

export default function useImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");

  const openModal = (src, imageAlt = "Image") => {
    setImage(src);
    setAlt(imageAlt);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    image,
    alt,
    openModal,
    closeModal,
  };
}