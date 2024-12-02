import React from "react";
import DocumentList from "./document-list.component";
import { MainProps } from "../interfaces/main.interface";

/**
 * Main component that serves as the main content area of the application.
 * It renders a `DocumentList` component and passes down modal handling functions.
 *
 * @param {Object} props - The props object.
 * @param {function} props.handleOpenModal - Function to handle opening the modal.
 * @param {function} props.handleClosedModal - Function to handle closing the modal.
 *
 * @returns {JSX.Element} The rendered main content area.
 */
const Main: React.FC<MainProps> = ({ handleOpenModal, handleClosedModal }) => {
  return (
    <main className="flex-grow overflow-y-auto pt-20 sm:pt-24 pb-16 p-4">
      <DocumentList
        handleOpenModal={handleOpenModal}
        handleClosedModal={handleClosedModal}
      />
    </main>
  );
};

export default Main;
