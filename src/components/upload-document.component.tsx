import classNames from "classnames";
import React from "react";
import { FaTrash } from "react-icons/fa";

import { TEXT } from "../constants/constants";
import { useUploadDocumentActions } from "../hooks/use-upload-document-actions.hook";
import { UploadDocumentProps } from "../interfaces/update-document.interface";
import ProgressBar from "../share/components/progress-bar.component";

/**
 * UploadDocument component allows users to upload documents and manage the upload process.
 *
 * @component
 * @param {UploadDocumentProps} props - The properties for the UploadDocument component.
 * @param {function} props.onFileUpload - Callback function to handle file upload.
 *
 * @returns {JSX.Element} The rendered UploadDocument component.
 */
const UploadDocument: React.FC<UploadDocumentProps> = ({ onFileUpload }) => {
  const { documentState, handlers } = useUploadDocumentActions(onFileUpload);
  const { files, progress, isRunning } = documentState;
  const { handleFileChange, handleDeleteFile, handleUpload } = handlers;

  return (
    <div>
      <>
        <input
          type="file"
          accept=".pdf,.docx"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />

        {files.length === 0 && (
          <p className="text-sm">{TEXT.UPLOAD_DOCUMENT.ALLOWED_FILE_TYPES}</p>
        )}
        {files.map((file, index) => (
          <div key={index}>
            <div className="flex text-xs sm:text-sm items-center justify-between p-2 mt-1 border-b">
              <p className="flex-1">{file?.name}</p>
              {!isRunning && (
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="text-gray-500 hover:text-gray-700 ml-4 "
                >
                  <FaTrash />
                </button>
              )}
            </div>
            {isRunning && <ProgressBar progress={progress} />}
          </div>
        ))}
        <div className="flex justify-end pt-8">
          {files.length === 0 && (
            <label className="btn-primary" htmlFor="file-upload">
              {TEXT.UPLOAD_DOCUMENT.SELECT_FILE}
            </label>
          )}
          {files.length > 0 && (
            <div className="flex items-right gap-2">
              <label
                className={classNames("btn-secondary", {
                  "btn-secondary-disabled": isRunning,
                })}
                htmlFor="file-upload"
              >
                {TEXT.UPLOAD_DOCUMENT.ADD_MORE_DOCUMENTS}
              </label>
              <button
                onClick={handleUpload}
                className={classNames("btn-primary", {
                  "btn-primary-disabled": isRunning,
                })}
              >
                {TEXT.UPLOAD_DOCUMENT.UPLOAD_FILES}
              </button>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default UploadDocument;
