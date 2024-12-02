import React from "react";
import { ModalIdEnum } from "../constants/modals.constants";
import { useDocumentContext } from "../context/document-context";
import SignatureRequest from "../components/signature-request.component";
import EmailList from "../components/email-list.component";
import ConfirmModal from "../share/components/confirm-modal.component";
import { Document } from "../interfaces/document.interface";
import { TEXT } from "../constants/constants";
import { notificationService } from "../services/notification.services";

/**
 * Custom hook that provides actions for document management, such as opening modals for signatures, emails, and deletion confirmations.
 *
 * @param handleOpenModal - Function to open a modal with a given title and content.
 * @param handleClosedModal - Function to handle the closing of a modal, with optional document ID.
 *
 * @returns An object containing functions to open signature modal, open email modal, and handle document deletion.
 */
export const useDocumentActions = (
  handleOpenModal: (title: string, content: React.ReactNode) => void,
  handleClosedModal: (modalId: string, documentId?: string | undefined) => void
) => {
  const { deleteDocument } = useDocumentContext();

  const openSignatureModal = (documentId: string) => {
    handleOpenModal(
      TEXT.DOCUMENT_LIST.SEND_DOCUMENTS_TO_SIGN,
      <SignatureRequest
        onRequestSignature={(modalId: string, documentId?: string) =>
          handleClosedModal(modalId, documentId)
        }
        documentId={documentId}
      />
    );
  };

  const openEmailModal = (document: Document) => {
    handleOpenModal(
      TEXT.DOCUMENT_LIST.EMAIL_LIST_TITLE,
      <EmailList
        document={document}
        onClose={() => handleClosedModal(ModalIdEnum.EmailList)}
      />
    );
  };

  const handleDeleteDocument = (id: string) => {
    handleOpenModal(
      TEXT.DOCUMENT_LIST.DELETE_CONFIRMATION_TITLE,
      <ConfirmModal
        message={TEXT.DOCUMENT_LIST.DELETE_CONFIRMATION}
        onConfirm={() => {
          deleteDocument(id);
          handleClosedModal(ModalIdEnum.ConfirmModal);
          notificationService.notifySuccess(TEXT.DOCUMENT_LIST.DELETE_SUCCESS);
        }}
        onCancel={() => handleClosedModal(ModalIdEnum.ConfirmModal)}
      />
    );
  };

  return {
    openSignatureModal,
    openEmailModal,
    handleDeleteDocument,
  };
};
