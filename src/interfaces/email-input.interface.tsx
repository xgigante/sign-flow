export interface EmailInputProps {
  email: string;
  index: number;
  onEmailChange: (index: number, value: string) => void;
  addEmailInput: () => void;
  onEmailError: (index: number, value: boolean) => void;
  removeEmailInput: (index: number) => void;
  isLast: boolean;
}
