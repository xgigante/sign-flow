import React from "react";

import { TEXT } from "../constants/constants";
import { ModalIdEnum } from "../constants/modals.constants";
import { EmailListProps } from "../interfaces/email-list.interface";
import StatusAttributes from "../share/components/status-attributes.component";

/**
 * EmailList component renders a list of email addresses with their status and a close button.
 *
 * @component
 * @param {EmailListProps} props - The props for the EmailList component.
 * @param {Document} props.document - The document containing the list of signers and their statuses.
 * @param {function} props.onClose - The function to call when the close button is clicked.
 *
 * @returns {JSX.Element} The rendered EmailList component.
 */
const EmailList: React.FC<EmailListProps> = ({ document, onClose }) => {
  return (
    <>
      <ul>
        {document.signers.map((email, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b"
          >
            {email} <StatusAttributes status={document.status} />
          </li>
        ))}
      </ul>
      <div className="text-right mt-8">
        <button
          className="btn-primary"
          onClick={() => onClose(ModalIdEnum.EmailList)}
          aria-label={TEXT.EMAIL_LIST.CLOSE}
        >
          {TEXT.EMAIL_LIST.CLOSE}
        </button>
      </div>
    </>
  );
};

export default EmailList;
