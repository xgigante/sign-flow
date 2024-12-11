import { useState } from "react";
import { TEXT } from "../constants/constants";
import { useSimulateProgress } from "../hooks/use-simulate-progress.hook";
import { notificationService } from "../services/notification.services";

/**
 * Custom hook to manage document upload actions.
 *
 * @param {function} onFileUpload - Callback function to handle file upload.
 * @returns {object} An object containing the state of the document and handlers for file actions.
 * @returns {object} stateDocument - The state of the document upload.
 * @returns {File[]} stateDocument.files - Array of files selected for upload.
 * @returns {number} stateDocument.progress - Progress of the upload simulation.
 * @returns {boolean} stateDocument.isRunning - Indicates if the upload simulation is running.
 * @returns {object} handlers - Handlers for file actions.
 * @returns {function} handlers.handleFileChange - Handler for file input change event.
 * @returns {function} handlers.handleDeleteFile - Handler to delete a selected file.
 * @returns {function} handlers.handleUpload - Handler to start the upload process.
 */
export const useUploadDocumentActions = (
  onFileUpload: (file: File) => void
) => {
  const [files, setFiles] = useState<(File | null)[]>([]);
  const { progress, isRunning, startProgress } = useSimulateProgress(2000);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      alert(TEXT.UPLOAD_DOCUMENT.MAX_FILES_EXCEEDED);
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    startProgress(() => {
      files.forEach((file) => {
        if (file) {
          onFileUpload(file);
        }
      });
      if (!isRunning) {
        setFiles([]);
        notificationService.notifySuccess(TEXT.UPLOAD_DOCUMENT.UPLOAD_SUCCESS);
      }
    });
  };

  return {
    stateDocument: { files, progress, isRunning },
    handlers: {
      handleFileChange,
      handleDeleteFile,
      handleUpload,
    },
  };
};
