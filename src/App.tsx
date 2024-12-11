import React from "react";

import Footer from "./components/footer.component";
import Header from "./components/header.component";
import Main from "./components/main.component";
import { DocumentProvider } from "./context/document-context";
import { useAppActions } from "./hooks/use-app-actions.hook";
import Modal from "./share/components/modal.component";

const App: React.FC = () => {
  const { modalState, handlers } = useAppActions();
  const { isModalOpen, modalContent, modalTitle } = modalState;
  const { openModal, closeModal, handleConfirm } = handlers;

  return (
    <DocumentProvider>
      <div className="flex flex-col min-h-screen">
        <Header handleOpenModal={openModal} handleClosedModal={handleConfirm} />
        <Main handleOpenModal={openModal} handleClosedModal={handleConfirm} />
        <Footer />
        <Modal title={modalTitle} isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>
    </DocumentProvider>
  );
};
export default App;
