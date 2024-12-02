import React from "react";
import { TEXT } from "../constants/constants";

/**
 * Footer component that displays a fixed footer at the bottom of the page.
 * It includes the current year and some text defined by the `TEXT` object.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 p-4 z-10 flex justify-center items-center">
      <p className="text-xs text-gray-600">
        © {currentYear} - {TEXT.LOGO_TITLE}. {TEXT.RIGHTS_RESERVED}.
      </p>
    </footer>
  );
};

export default Footer;
