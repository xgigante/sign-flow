import { useState } from "react";

/**
 * Custom hook to manage modal state.
 *
 * @returns {object} An object containing:
 * - `isModalOpen` {boolean}: State indicating if the modal is open.
 * - `modalContent` {React.ReactNode}: Content to be displayed in the modal.
 * - `modalTitle` {string}: Title of the modal.
 * - `openModal` {function}: Function to open the modal with a specified title and content.
 * - `closeModal` {function}: Function to close the modal and reset its state.
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
