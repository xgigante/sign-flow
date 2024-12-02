import React from "react";
import { FaCheck, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { TEXT } from "../../constants/constants";
import { EmailInputProps } from "../../interfaces/email-input.interface";

/**
 * EmailInput component for handling email input fields with validation.
 *
 * @component
 * @param {EmailInputProps} props - The properties for the EmailInput component.
 * @param {string} props.email - The current email value.
 * @param {number} props.index - The index of the email input in the list.
 * @param {function} props.onEmailChange - Callback function to handle email changes.
 * @param {function} props.addEmailInput - Callback function to add a new email input field.
 * @param {function} props.onEmailError - Callback function to handle email validation errors.
 * @param {function} props.removeEmailInput - Callback function to remove the email input field.
 * @param {boolean} props.isLast - Boolean indicating if this is the last email input field.
 *
 * @returns {JSX.Element} The rendered EmailInput component.
 */
const EmailInput: React.FC<EmailInputProps> = ({
  email,
  index,
  onEmailChange,
  addEmailInput,
  onEmailError,
  removeEmailInput,
  isLast,
}) => {
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    onEmailChange(index, newEmail);
    if (!validateEmail(newEmail)) {
      onEmailError(index, !validateEmail(email));
    } else {
      onEmailError(index, false);
    }
  };

  return (
    <div key={index} className="mb-2 flex items-center">
      {email.trim() !== "" &&
        (validateEmail(email) ? (
          <FaCheck className="text-green-500 mr-2" />
        ) : (
          <FaTimes className="text-red-500 mr-2" />
        ))}
      <input
        type="text"
        value={email}
        onChange={handleChange}
        placeholder={TEXT.SIGNATURE_REQUEST.EMAIL_PLACEHOLDER}
        className="border p-2 flex-1 rounded-lg text-sm"
      />
      {isLast ? (
        <button onClick={addEmailInput} className="btn-primary ml-2">
          <FaPlus />
        </button>
      ) : (
        <button
          onClick={() => removeEmailInput(index)}
          className="btn-secondary ml-2"
        >
          <FaMinus />
        </button>
      )}
    </div>
  );
};

export default EmailInput;
