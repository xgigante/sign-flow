import React from "react";

import Footer from "./components/footer.component";
import Header from "./components/header.component";
import Main from "./components/main.component";
import { DocumentProvider } from "./context/document-context";
import { useAppActions } from "./hooks/use-app-actions.hook";
import Modal from "./share/components/modal.component";

const App: React.FC = () => {
  const {
    isModalOpen,
    modalContent,
    modalTitle,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  } = useAppActions();

  return (
    <DocumentProvider>
      <div className="flex flex-col min-h-screen">
        <Header
          handleOpenModal={handleOpenModal}
          handleClosedModal={handleConfirm}
        />
        <Main
          handleOpenModal={handleOpenModal}
          handleClosedModal={handleConfirm}
        />
        <Footer />
        <Modal
          title={modalTitle}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {modalContent}
        </Modal>
      </div>
    </DocumentProvider>
  );
};
export default App;
