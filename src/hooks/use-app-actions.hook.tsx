import { useState } from "react";
import { useSimulateProgress } from "./use-simulate-progress.hook";
import { ModalIdEnum } from "../constants/modals.constants";
import { notificationService } from "../services/notification.services";
import { updateDocumentStatus } from "../utils/api-mock";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { TEXT } from "../constants/constants";
import { useModal } from "./use-modal.hook";

/**
 * Custom hook that provides application actions and modal state management.
 *
 * @returns {object} An object containing modal state and actions.
 * @returns {object.modal} Modal state and control functions.
 * @returns {boolean} modal.isModalOpen - Indicates if the modal is open.
 * @returns {ReactNode} modal.modalContent - The content of the modal.
 * @returns {string} modal.modalTitle - The title of the modal.
 * @returns {function} modal.openModal - Function to open the modal.
 * @returns {function} modal.closeModal - Function to close the modal.
 * @returns {object.actions} Application actions.
 * @returns {function} actions.handleConfirm - Function to handle confirmation actions.
 */
export const useAppActions = () => {
  const { isModalOpen, modalContent, modalTitle, openModal, closeModal } =
    useModal();
  const { isRunning, startProgress } = useSimulateProgress(2000);

  const handleConfirm = (modalId: string, documentId?: string) => {
    closeModal();
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
    modalState: {
      isModalOpen,
      modalContent,
      modalTitle,
    },
    handlers: {
      openModal,
      closeModal,
      handleConfirm,
    },
  };
};
