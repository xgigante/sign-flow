import { renderHook } from "@testing-library/react";
import { useDocumentContext } from "../../context/document-context";
import { useHeaderActions } from "../../hooks/use-header-actions.hook";
import { act } from "react";
import { TEXT } from "../../constants/constants";
import { ModalIdEnum } from "../../constants/modals.constants";

jest.mock("../../context/document-context");

describe("useHeaderActions", () => {
  const handleOpenModal = jest.fn();
  const handleClosedModal = jest.fn();
  const addDocument = jest.fn();

  beforeEach(() => {
    (useDocumentContext as jest.Mock).mockReturnValue({ addDocument });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should open upload modal with correct title and content", () => {
    const { result } = renderHook(() =>
      useHeaderActions(handleOpenModal, handleClosedModal)
    );

    act(() => {
      result.current.openUploadModal();
    });

    expect(handleOpenModal).toHaveBeenCalledWith(
      TEXT.UPLOAD_DOCUMENTS_TITLE,
      expect.anything()
    );
  });

  it("should handle file upload and add document", () => {
    const { result } = renderHook(() =>
      useHeaderActions(handleOpenModal, handleClosedModal)
    );
    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    });

    act(() => {
      result.current.openUploadModal();
    });

    const uploadComponent = handleOpenModal.mock.calls[0][1];
    act(() => {
      uploadComponent.props.onFileUpload(file);
    });

    expect(addDocument).toHaveBeenCalledWith(
      expect.objectContaining({ name: "test.pdf" })
    );
    expect(handleClosedModal).toHaveBeenCalledWith(ModalIdEnum.UploadDocument);
  });
});
