import React from "react";
import { ProgressBarProps } from "../../interfaces/progress.interface";

/**
 * ProgressBar component displays a progress bar with a specified progress percentage.
 *
 * @param {ProgressBarProps} props - The properties for the ProgressBar component.
 * @param {number} props.progress - The current progress percentage to be displayed.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full">
      <div className="w-full bg-gray-200 rounded-full h-[2px] absolute">
        <div
          className="bg-blue-600 h-[2px] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
