import { useState } from "react";
import { TEXT } from "../constants/constants";
import { useSimulateProgress } from "../hooks/use-simulate-progress.hook";
import { notificationService } from "../services/notification.services";

/**
 * Custom hook to manage file upload actions.
 *
 * @param {function} onFileUpload - Callback function to handle file upload.
 * @returns {object} - An object containing:
 *   - `files`: Array of selected files.
 *   - `progress`: Upload progress percentage.
 *   - `isRunning`: Boolean indicating if the upload is in progress.
 *   - `handleFileChange`: Function to handle file selection changes.
 *   - `handleDeleteFile`: Function to handle file deletion.
 *   - `handleUpload`: Function to initiate the file upload process.
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
    files,
    progress,
    isRunning,
    handleFileChange,
    handleDeleteFile,
    handleUpload,
  };
};
