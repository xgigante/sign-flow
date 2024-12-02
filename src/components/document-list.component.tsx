import React from "react";
import { FaRegEnvelope, FaSignature, FaTrash } from "react-icons/fa";

import { TEXT } from "../constants/constants";
import { DocumentStatusEnum } from "../constants/documents.contants";
import { useDocumentContext } from "../context/document-context";
import { useDocumentActions } from "../hooks/use-document-actions.hook";
import { DocumentListProps } from "../interfaces/document.interface";
import StatusAttributes from "../share/components/status-attributes.component";

/**
 * DocumentList component renders a list of documents with actions to request signatures, view emails, and delete documents.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.handleOpenModal - Function to handle opening a modal.
 * @param {function} props.handleClosedModal - Function to handle closing a modal.
 *
 * @returns {JSX.Element} The rendered DocumentList component.
 *
 * @remarks
 * This component uses the `useDocumentContext` hook to fetch the list of documents and the `useDocumentActions` hook to handle document actions.
 * It conditionally renders a table of documents if there are any, otherwise it displays a message indicating no files have been uploaded.
 */
const DocumentList: React.FC<DocumentListProps> = ({
  handleOpenModal,
  handleClosedModal,
}) => {
  const { documents } = useDocumentContext();
  const { openSignatureModal, openEmailModal, handleDeleteDocument } =
    useDocumentActions(handleOpenModal, handleClosedModal);

  return (
    <section className="w-full">
      <h3 className="text-sm sm:text-lg font-bold mb-2">
        {TEXT.DOCUMENT_LIST.TITLE}
      </h3>
      {Array.isArray(documents) && documents.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-blue-600">
            <tr>
              <th className="table-header">
                {TEXT.DOCUMENT_LIST.DOCUMENT_NAME}
              </th>
              <th className="table-header">{TEXT.DOCUMENT_LIST.STATUS}</th>
              <th className="table-header">{TEXT.DOCUMENT_LIST.ACTIONS}</th>
              <th className="table-header">{TEXT.DOCUMENT_LIST.DELETE}</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const isPending = doc.status === DocumentStatusEnum.Pending;
              const isSigned = doc.status === DocumentStatusEnum.Signed;
              return (
                <tr key={doc.id} className="hover:bg-gray-100">
                  <td className="table-cell text-left">{doc.name}</td>
                  <td className="table-cell">
                    <StatusAttributes status={doc.status} />
                  </td>
                  <td className="table-cell">
                    {isPending ? (
                      <button
                        className="btn-primary-small flex items-center justify-center"
                        onClick={() => openSignatureModal(doc.id)}
                        aria-label={TEXT.DOCUMENT_LIST.REQUEST_SIGNATURE}
                      >
                        <FaSignature className="sm:mr-2" />
                        <span className="hidden sm:block">
                          {TEXT.DOCUMENT_LIST.REQUEST_SIGNATURE}
                        </span>
                      </button>
                    ) : (
                      <button
                        className="btn-secondary-small flex items-center justify-center"
                        onClick={() => openEmailModal(doc)}
                        aria-label={TEXT.DOCUMENT_LIST.VIEW_EMAILS}
                      >
                        <FaRegEnvelope className="sm:mr-2" />
                        <span className="hidden sm:block">
                          {TEXT.DOCUMENT_LIST.VIEW_EMAILS}
                        </span>
                      </button>
                    )}
                  </td>
                  <td className="table-cell">
                    {!isSigned && (
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full"
                        onClick={() => handleDeleteDocument(doc.id)}
                        aria-label={TEXT.DOCUMENT_LIST.DELETE_DOCUMENT}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm text-center">
          {TEXT.DOCUMENT_LIST.NO_FILES_UPLOADED}
        </p>
      )}
    </section>
  );
};

export default DocumentList;
