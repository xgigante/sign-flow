export interface HeaderProps {
  handleOpenModal: (title: string, content: React.ReactNode) => void;
  handleClosedModal: (modalId: string) => void;
}
