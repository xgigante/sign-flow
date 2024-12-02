import React from "react";
import { ConfirmModalProps } from "../../interfaces/confirm.modal.interface";
import { TEXT } from "../../constants/constants";

/**
 * ConfirmModal component renders a modal with a message and two buttons: Confirm and Cancel.
 *
 * @param {ConfirmModalProps} props - The properties for the ConfirmModal component.
 * @param {string} props.message - The message to display in the modal.
 * @param {() => void} props.onConfirm - The callback function to call when the Confirm button is clicked.
 * @param {() => void} props.onCancel - The callback function to call when the Cancel button is clicked.
 *
 * @returns {JSX.Element} The rendered ConfirmModal component.
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      <p className="text-xs sm:text-base">{message}</p>
      <div className="gap-2 flex justify-end mt-8">
        <button className="btn-secondary" onClick={onCancel}>
          {TEXT.CONFIRM_MODAL.CANCEL}
        </button>
        <button className="btn-primary" onClick={onConfirm}>
          {TEXT.CONFIRM_MODAL.CONFIRM}
        </button>
      </div>
    </>
  );
};

export default ConfirmModal;
