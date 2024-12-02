import { useState } from "react";
import { useSimulateProgress } from "./use-simulate-progress.hook";
import { ModalIdEnum } from "../constants/modals.constants";
import { notificationService } from "../services/notification.services";
import { updateDocumentStatus } from "../utils/api-mock";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { TEXT } from "../constants/constants";

/**
 * Custom hook that provides actions and state management for modals and signature processes.
 *
 * @returns {object} An object containing:
 * - `isModalOpen` {boolean}: State indicating if the modal is open.
 * - `modalContent` {React.ReactNode}: The content to be displayed in the modal.
 * - `modalTitle` {string}: The title of the modal.
 * - `isRunning` {boolean}: State indicating if the signature process is running.
 * - `handleOpenModal` {function}: Function to open the modal with a given title and content.
 * - `handleCloseModal` {function}: Function to close the modal and reset its content and title.
 * - `handleConfirm` {function}: Function to handle confirmation actions based on the modal ID and optional document ID.
 */
export const useAppActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");
  const { isRunning, startProgress } = useSimulateProgress(2000);

  const handleOpenModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const handleConfirm = (modalId: string, documentId?: string) => {
    setIsModalOpen(false);
    if (modalId === ModalIdEnum.SignatureRequest) {
      simulateSignaturesProcess(documentId as string);
    }
  };

  const simulateSignaturesProcess = (documentId: string) => {
    startProgress(() => {
      if (!isRunning) {
        notificationService.notifySuccess(TEXT.SIGNATURE_REQUEST.COMPLETED);
        updateDocumentStatus(documentId, DocumentStatusEnum.Signed);
        console.log(TEXT.SIGNATURE_REQUEST.COMPLETED, documentId);
      }
    });
  };

  return {
    isModalOpen,
    modalContent,
    modalTitle,
    isRunning,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  };
};
