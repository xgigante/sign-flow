import UploadDocument from "../components/upload-document.component";
import { TEXT } from "../constants/constants";
import { ModalIdEnum } from "../constants/modals.constants";
import { useDocumentContext } from "../context/document-context";
import { uploadDocument } from "../utils/api-mock";

/**
 * Custom hook to handle header actions related to document uploads.
 *
 * @param handleOpenModal - Function to open a modal with a given title and content.
 * @param handleClosedModal - Function to handle the closing of a modal by its ID.
 *
 * @returns An object containing the `openUploadModal` function.
 */
export const useHeaderActions = (
  handleOpenModal: (title: string, content: React.ReactNode) => void,
  handleClosedModal: (modalId: string) => void
) => {
  const { addDocument } = useDocumentContext();

  const openUploadModal = () => {
    handleOpenModal(
      TEXT.UPLOAD_DOCUMENTS_TITLE,
      <UploadDocument onFileUpload={handleFileUpload} />
    );
  };
  const handleFileUpload = (file: File) => {
    if (file) {
      const signers: any[] = [];
      const newDocument = uploadDocument(file.name, signers);
      addDocument(newDocument);
      handleClosedModal(ModalIdEnum.UploadDocument);
    }
  };

  return {
    openUploadModal,
  };
};
