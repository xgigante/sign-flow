import { useState } from "react";

/**
 * Custom hook for managing modal state.
 *
 * @returns {object} Object containing modal state and handlers.
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  return {
    isModalOpen,
    modalContent,
    modalTitle,
    openModal,
    closeModal,
  };
};
