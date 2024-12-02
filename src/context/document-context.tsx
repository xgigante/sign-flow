import React, { createContext, useContext, useState } from "react";
import {
  Document,
  DocumentContextType,
  DocumentProviderProps,
} from "../interfaces/document.interface";
import {
  updateDocumentSigners,
  updateDocumentStatus,
  deleteDocumentId,
} from "../utils/api-mock";
import { DocumentStatusType } from "../types/types";

export const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

/**
 * Provides the Document context to its children components.
 *
 * @param {DocumentProviderProps} props - The props for the DocumentProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the Document context.
 *
 * @returns {JSX.Element} The DocumentProvider component.
 *
 * @component
 *
 * @example
 * ```tsx
 * <DocumentProvider>
 *   <YourComponent />
 * </DocumentProvider>
 * ```
 *
 * @context
 * The context value includes:
 * - `documents`: An array of Document objects.
 * - `addDocument`: A function to add a new document to the context.
 * - `deleteDocument`: A function to delete a document from the context by its ID.
 * - `updateDocumentSigners`: A function to update the signers of a document in the context.
 * - `updateDocumentStatus`: A function to update the status of a document in the context.
 */
export const DocumentProvider: React.FC<DocumentProviderProps> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = (document: Document) => {
    setDocuments((prevDocuments) => [...prevDocuments, document]);
  };

  const deleteDocument = (id: string) => {
    deleteDocumentId(id);
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => doc.id !== id)
    );
  };

  const updateDocumentSignersInContext = (id: string, emails: string[]) => {
    const updatedDocument = updateDocumentSigners(id, emails);
    if (updatedDocument) {
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === updatedDocument.id ? updatedDocument : doc
        )
      );
    }
  };

  const updateDocumentStatusInContext = (
    id: string,
    status: DocumentStatusType
  ) => {
    const updatedDocument = updateDocumentStatus(id, status);
    if (updatedDocument) {
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === updatedDocument.id ? updatedDocument : doc
        )
      );
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        addDocument,
        deleteDocument,
        updateDocumentSigners: updateDocumentSignersInContext,
        updateDocumentStatus: updateDocumentStatusInContext,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

/**
 * Custom hook to access the DocumentContext.
 *
 * This hook provides the current context value for the DocumentContext.
 * It must be used within a DocumentProvider; otherwise, it will throw an error.
 *
 * @throws {Error} If the hook is used outside of a DocumentProvider.
 *
 * @returns {DocumentContextType} The current context value for the DocumentContext.
 */
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider"
    );
  }
  return context;
};
