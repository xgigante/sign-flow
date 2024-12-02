import { useState } from "react";
import { TEXT } from "../constants/constants";
import { useDocumentContext } from "../context/document-context";
import { useSimulateProgress } from "../hooks/use-simulate-progress.hook";
import { notificationService } from "../services/notification.services";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { ModalIdEnum } from "../constants/modals.constants";

/**
 * Custom hook to manage signature request actions.
 *
 * @param onRequestSignature - Callback function to handle signature request.
 * @returns An object containing state and handlers for managing signature requests.
 *
 * @property {string[]} emails - Array of email addresses.
 * @property {boolean[]} errors - Array of boolean values indicating email validation errors.
 * @property {number} progress - Progress value for the signature request process.
 * @property {boolean} isRunning - Boolean indicating if the signature request process is running.
 * @property {function} handleEmailChange - Handler to update email address at a specific index.
 * @property {function} handleEmailError - Handler to update email validation error at a specific index.
 * @property {function} addEmailInput - Handler to add a new email input field.
 * @property {function} removeEmailInput - Handler to remove an email input field at a specific index.
 * @property {function} handleRequestSignature - Handler to initiate the signature request process.
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
    emails,
    errors,
    progress,
    isRunning,
    handleEmailChange,
    handleEmailError,
    addEmailInput,
    removeEmailInput,
    handleRequestSignature,
  };
};
