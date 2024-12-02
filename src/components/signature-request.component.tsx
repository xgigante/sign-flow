import React from "react";

import { TEXT } from "../constants/constants";
import { useSignatureRequestActions } from "../hooks/use-signature-request-actions.hook";
import { SignatureRequestProps } from "../interfaces/signature-request.interface";
import EmailInput from "../share/components/email-input.component";
import ProgressBar from "../share/components/progress-bar.component";

/**
 * Component for handling signature requests.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onRequestSignature - Callback function to handle signature request.
 * @param {string} props.documentId - The ID of the document to be signed.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SignatureRequest: React.FC<SignatureRequestProps> = ({
  onRequestSignature,
  documentId,
}) => {
  const {
    emails,
    progress,
    isRunning,
    handleEmailChange,
    handleEmailError,
    addEmailInput,
    removeEmailInput,
    handleRequestSignature,
  } = useSignatureRequestActions(onRequestSignature);

  return (
    <div>
      {!isRunning ? (
        <>
          {emails.map((email, index) => (
            <EmailInput
              key={index}
              email={email}
              index={index}
              onEmailChange={handleEmailChange}
              addEmailInput={addEmailInput}
              onEmailError={handleEmailError}
              removeEmailInput={() => removeEmailInput(index)}
              isLast={index === emails.length - 1}
            />
          ))}
          <div className="text-right mt-8">
            <button
              onClick={() => handleRequestSignature(documentId)}
              className="btn-primary"
            >
              {TEXT.SIGNATURE_REQUEST.SEND_SIGNATURE_REQUEST}
            </button>
          </div>
        </>
      ) : (
        <div className="pt-2 pb-4">
          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
};

export default SignatureRequest;
