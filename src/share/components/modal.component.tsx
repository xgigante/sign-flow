import React from "react";
import { FaTimes } from "react-icons/fa";
import { ModalProps } from "../../interfaces/modal.interface";

/**
 * Modal component that displays a modal dialog.
 *
 * @param {ModalProps} props - The properties for the Modal component.
 * @param {string} props.title - The title of the modal.
 * @param {boolean} props.isOpen - A boolean indicating whether the modal is open.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if the modal is not open.
 */
const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base sm:text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-black-500 hover:text-gray-500"
          >
            <FaTimes />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
