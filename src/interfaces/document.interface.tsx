import { ReactNode } from "react";
import { DocumentStatusType } from "../types/types";

export interface Document {
  id: string;
  name: string;
  status: DocumentStatusType;
  signers: string[];
}

export interface DocumentProviderProps {
  children: ReactNode;
}

export interface DocumentContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  deleteDocument: (id: string) => void;
  updateDocumentSigners: (id: string, emails: string[]) => void;
  updateDocumentStatus: (id: string, status: DocumentStatusType) => void;
}

export interface DocumentListProps {
  handleOpenModal: (title: string, content: React.ReactNode) => void;
  handleClosedModal: (modalId: string, documentId?: string) => void;
}
