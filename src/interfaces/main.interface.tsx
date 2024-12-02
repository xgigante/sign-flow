export interface MainProps {
  handleOpenModal: (title: string, content: React.ReactNode) => void;
  handleClosedModal: (modalId: string, documentId?: string) => void;
}
