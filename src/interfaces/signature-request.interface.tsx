export interface SignatureRequestProps {
  onRequestSignature: (modalId: string, documentId?: string) => void;
  documentId: string;
}
