import { useState } from "react";
import { TEXT } from "../constants/constants";
import { useDocumentContext } from "../context/document-context";
import { useSimulateProgress } from "../hooks/use-simulate-progress.hook";
import { notificationService } from "../services/notification.services";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { ModalIdEnum } from "../constants/modals.constants";

/**
 * Custom hook that provides actions and state management for handling signature requests.
 *
 * @param onRequestSignature - Callback function to be called when a signature request is made.
 * @returns An object containing the current state and handlers for managing signature requests.
 *
 * @property {Object} signatureState - The current state of the signature request.
 * @property {string[]} signatureState.emails - Array of email addresses for the signature request.
 * @property {number} signatureState.progress - Progress of the signature request simulation.
 * @property {boolean} signatureState.isRunning - Indicates if the signature request simulation is running.
 *
 * @property {Object} handlers - Handlers for managing signature request actions.
 * @property {Function} handlers.handleEmailChange - Handler for changing an email address.
 * @property {Function} handlers.handleEmailError - Handler for setting an error state for an email address.
 * @property {Function} handlers.addEmailInput - Handler for adding a new email input field.
 * @property {Function} handlers.removeEmailInput - Handler for removing an email input field.
 * @property {Function} handlers.handleRequestSignature - Handler for initiating a signature request.
 */
export const useSignatureRequestActions = (
  onRequestSignature: (modalId: ModalIdEnum, documentId: string) => void
) => {
  const [emails, setEmails] = useState<string[]>([""]);
  const [errors, setErrors] = useState<boolean[]>([false]);
  const { updateDocumentSigners, updateDocumentStatus } = useDocumentContext();
  const { progress, isRunning, startProgress } = useSimulateProgress(2000);

  const handleEmailChange = (index: number, value: string) => {
    setEmails((prevEmails) => {
      const updatedEmails = [...prevEmails];
      updatedEmails[index] = value;
      return updatedEmails;
    });
  };

  const handleEmailError = (index: number, hasError: boolean) => {
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = hasError;
      return updatedErrors;
    });
  };

  const addEmailInput = () => {
    setEmails((prevEmails) => [...prevEmails, ""]);
    setErrors((prevErrors) => [...prevErrors, false]);
  };

  const removeEmailInput = (index: number) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
    setErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  const handleRequestSignature = (documentId: string) => {
    const hasErrors = errors.some((error) => error);

    if (hasErrors) {
      notificationService.notifyError(TEXT.SIGNATURE_REQUEST.INVALID_EMAIL);
      return;
    }

    const validEmails = emails
      .map((email) => email.trim())
      .filter((email) => email);

    if (validEmails.length === 0) {
      notificationService.notifyError(TEXT.SIGNATURE_REQUEST.EMAIL_PLACEHOLDER);
      return;
    }

    startProgress(() => {
      updateDocumentSigners(documentId, validEmails);
      updateDocumentStatus(documentId, DocumentStatusEnum.Sent);
      notificationService.notifyInfo(
        TEXT.SIGNATURE_REQUEST.SIGNATURE_REQUEST_SENT
      );
      onRequestSignature(ModalIdEnum.SignatureRequest, documentId);
    });
  };

  return {
    signatureState: { emails, progress, isRunning },
    handlers: {
      handleEmailChange,
      handleEmailError,
      addEmailInput,
      removeEmailInput,
      handleRequestSignature,
    },
  };
};
