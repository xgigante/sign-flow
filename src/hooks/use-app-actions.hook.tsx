import { useState } from "react";
import { useSimulateProgress } from "./use-simulate-progress.hook";
import { ModalIdEnum } from "../constants/modals.constants";
import { notificationService } from "../services/notification.services";
import { updateDocumentStatus } from "../utils/api-mock";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { TEXT } from "../constants/constants";
import { useModal } from "./use-modal.hook";

/**
 * A custom hook that provides modal state and handlers for the application.
 *
 * This hook uses the `useModal` and `useSimulateProgress` hooks to manage modal state
 * and simulate a progress bar. It also provides a `handleConfirm` function to handle
 * modal confirmations.
 *
 * @returns {Object} An object containing modal state and handlers.
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
