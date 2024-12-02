import { renderHook } from "@testing-library/react";
import { useDocumentActions } from "../../hooks/use-document-actions.hook";
import { act } from "react";
import { TEXT } from "../../constants/constants";
import { Document } from "../../interfaces/document.interface";
import { DocumentStatusEnum } from "../../constants/documents.contants";
import { ModalIdEnum } from "../../constants/modals.constants";
import { notificationService } from "../../services/notification.services";

jest.mock("../../context/document-context", () => ({
  useDocumentContext: () => ({
    deleteDocument: jest.fn(),
  }),
}));

jest.mock("../../services/notification.services", () => ({
  notificationService: {
    notifySuccess: jest.fn(),
  },
}));

describe("useDocumentActions", () => {
  const handleOpenModal = jest.fn();
  const handleClosedModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open signature modal", () => {
    const { result } = renderHook(() =>
      useDocumentActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.openSignatureModal("documentId");
    });

    expect(handleOpenModal).toHaveBeenCalledWith(
      TEXT.DOCUMENT_LIST.SEND_DOCUMENTS_TO_SIGN,
      expect.anything()
    );
  });

  it("should open email modal", () => {
    const document: Document = {
      id: "1",
      name: "Test Document",
      status: DocumentStatusEnum.Pending,
      signers: [],
    };

    const { result } = renderHook(() =>
      useDocumentActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.openEmailModal(document);
    });

    expect(handleOpenModal).toHaveBeenCalledWith(
      TEXT.DOCUMENT_LIST.EMAIL_LIST_TITLE,
      expect.anything()
    );
  });

  it("should handle document deletion", () => {
    const { result } = renderHook(() =>
      useDocumentActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.handleDeleteDocument("documentId");
    });

    expect(handleOpenModal).toHaveBeenCalledWith(
      TEXT.DOCUMENT_LIST.DELETE_CONFIRMATION_TITLE,
      expect.anything()
    );
  });

  it("should confirm document deletion", () => {
    const { result } = renderHook(() =>
      useDocumentActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.handleDeleteDocument("documentId");
    });

    const confirmModalProps = handleOpenModal.mock.calls[0][1].props;

    act(() => {
      confirmModalProps.onConfirm();
    });

    expect(handleClosedModal).toHaveBeenCalledWith(ModalIdEnum.ConfirmModal);
    expect(notificationService.notifySuccess).toHaveBeenCalledWith(
      TEXT.DOCUMENT_LIST.DELETE_SUCCESS
    );
  });

  it("should cancel document deletion", () => {
    const { result } = renderHook(() =>
      useDocumentActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.handleDeleteDocument("documentId");
    });

    const confirmModalProps = handleOpenModal.mock.calls[0][1].props;

    act(() => {
      confirmModalProps.onCancel();
    });

    expect(handleClosedModal).toHaveBeenCalledWith(ModalIdEnum.ConfirmModal);
  });
});
