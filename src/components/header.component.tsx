import React from "react";

import logo from "../assets/logo-signaturit-group.svg";
import { TEXT } from "../constants/constants";
import { useHeaderActions } from "../hooks/use-header-actions.hook";
import { HeaderProps } from "../interfaces/header.interface";

/**
 * Header component that displays a fixed header with a logo and an upload button.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.handleOpenModal - Function to handle opening the modal.
 * @param {Function} props.handleClosedModal - Function to handle closing the modal.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header: React.FC<HeaderProps> = ({
  handleOpenModal,
  handleClosedModal,
}) => {
  const { openUploadModal } = useHeaderActions(
    handleOpenModal,
    handleClosedModal
  );

  return (
    <header className="fixed top-0 w-full bg-gray-100 p-3 z-10 flex justify-between items-center">
      <img src={logo} alt={TEXT.LOGO_TITLE} className="h-10 md:h-12 lg:h-14" />
      <button
        onClick={openUploadModal}
        className="btn-primary"
        aria-label={TEXT.UPLOAD_DOCUMENTS_TITLE}
      >
        {TEXT.UPLOAD_DOCUMENTS_TITLE}
      </button>
    </header>
  );
};

export default Header;
