import React from "react";

import { TEXT } from "../constants/constants";
import { SignatureRequestProps } from "../interfaces/signature-request.interface";
import EmailInput from "../share/components/email-input.component";
import ProgressBar from "../share/components/progress-bar.component";
import { useSignatureRequestActions } from "../hooks/use-signature-request-actions.hook";

/**
 * Component for handling the signature request process.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.onRequestSignature - Callback function to handle the signature request.
 * @param {string} props.documentId - The ID of the document to be signed.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SignatureRequest: React.FC<SignatureRequestProps> = ({
  onRequestSignature,
  documentId,
}) => {
  const { signatureState, handlers } =
    useSignatureRequestActions(onRequestSignature);
  const { emails, progress, isRunning } = signatureState;
  const {
    handleEmailChange,
    handleEmailError,
    addEmailInput,
    removeEmailInput,
    handleRequestSignature,
  } = handlers;

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
