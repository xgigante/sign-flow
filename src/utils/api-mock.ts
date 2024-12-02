import { Document } from "../interfaces/document.interface";
import { v4 as uuidv4 } from "uuid";
import { DocumentStatusType } from "../types/types";
import { DocumentStatusEnum } from "../constants/documents.contants";

const documentsMock: Document[] = [];

/**
 * Uploads a document with the given name and signers.
 *
 * @param name - The name of the document to be uploaded.
 * @param signers - An array of signers associated with the document.
 * @returns The newly created document.
 */
export const uploadDocument = (name: string, signers: string[]): Document => {
  const newDocument: Document = {
    id: uuidv4(),
    name,
    status: DocumentStatusEnum.Pending,
    signers,
  };
  documentsMock.push(newDocument);
  return newDocument;
};

/**
 * Deletes a document from the documentsMock array by its ID.
 *
 * @param id - The ID of the document to be deleted.
 * @returns void
 */
export const deleteDocumentId = (id: string): void => {
  const documentIndex = documentsMock.findIndex((doc) => doc.id === id);
  if (documentIndex !== -1) {
    documentsMock.splice(documentIndex, 1);
  }
};

/**
 * Retrieves a list of mock documents.
 *
 * @returns {Document[]} An array of mock documents.
 */
export const getDocuments = (): Document[] => {
  return documentsMock;
};

/**
 * Updates the status of a document in the mock documents list.
 *
 * @param id - The unique identifier of the document to update.
 * @param status - The new status to set for the document.
 * @returns The updated document if found, otherwise `undefined`.
 */
export const updateDocumentStatus = (
  id: string,
  status: DocumentStatusType
): Document | undefined => {
  const documentIndex = documentsMock.findIndex((doc) => doc.id === id);
  if (documentIndex !== -1) {
    documentsMock[documentIndex].status = status;
    return documentsMock[documentIndex];
  }
  return undefined;
};

/**
 * Updates the signers of a document by adding new email addresses to the existing signers.
 *
 * @param id - The unique identifier of the document to update.
 * @param emails - An array of email addresses to add as signers to the document.
 * @returns The updated document if the document with the given id is found, otherwise `null`.
 */
export const updateDocumentSigners = (
  id: string,
  emails: string[]
): Document | null => {
  const documentIndex = documentsMock.findIndex((doc) => doc.id === id);
  if (documentIndex !== -1) {
    documentsMock[documentIndex].signers = [
      ...documentsMock[documentIndex].signers,
      ...emails,
    ];
    return documentsMock[documentIndex];
  }
  return null;
};
