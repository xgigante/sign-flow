import React from "react";
import { FaCheck, FaClock, FaPaperPlane, FaTimes } from "react-icons/fa";
import { DocumentStatusEnum } from "../../constants/documents.contants";
import { DocumentStatusType } from "../../types/types";
import { StatusAttributesProps } from "../../interfaces/status-attributes.interface";

/**
 * `StatusAttributes` is a React functional component that displays the status of a document
 * with corresponding styles and icons based on the status type.
 *
 * @param {StatusAttributesProps} props - The props for the component.
 * @param {DocumentStatusType} props.status - The status of the document.
 *
 * @returns {JSX.Element} The rendered component.
 */
const StatusAttributes: React.FC<StatusAttributesProps> = ({ status }) => {
  const getStatusAttributes = (status: DocumentStatusType) => {
    switch (status) {
      case DocumentStatusEnum.Pending:
        return {
          className:
            "px-2 py-1 sm:pr-3 rounded-full inline-flex items-center bg-yellow-200 text-yellow-800 text-xs",
          icon: <FaClock className="sm:mr-2" />,
        };
      case DocumentStatusEnum.Signed:
        return {
          className:
            "px-2 py-1 sm:pr-3 rounded-full inline-flex items-center bg-green-200 text-green-800 text-xs",
          icon: <FaCheck className="sm:mr-2" />,
        };
      case DocumentStatusEnum.Rejected:
        return {
          className:
            "px-2 py-1 sm:pr-3 rounded-full inline-flex items-center bg-red-200 text-red-800 text-xs",
          icon: <FaTimes className="sm:mr-2" />,
        };
      case DocumentStatusEnum.Sent:
        return {
          className:
            "px-2 py-1 sm:pr-3 rounded-full inline-flex items-center bg-blue-200 text-blue-800 text-xs",
          icon: <FaPaperPlane className="sm:mr-2" />,
        };
      default:
        return {
          className: "",
          icon: null,
        };
    }
  };

  const { className, icon } = getStatusAttributes(status);

  return (
    <div className={`status-attribute ${className}`}>
      {icon}
      <span className="hidden sm:block">{status}</span>
    </div>
  );
};

export default StatusAttributes;
