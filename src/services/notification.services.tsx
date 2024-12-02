import { toast } from "react-toastify";
import { FaSpinner, FaTimes, FaCheck, FaInfo } from "react-icons/fa";

const notifyLoading = (message: string) => {
  toast.info(
    <div className="flex items-center">
      <FaSpinner className="ml-2 mr-2 animate-spin" />
      {message}
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "toast-loading",
      icon: false,
    }
  );
};

const notifyError = (message: string) => {
  toast.error(
    <div className="flex items-center">
      <FaTimes className="ml-2 mr-2" />
      {message}
    </div>,
    {
      className: "toast-error",
      icon: false,
      autoClose: 1000,
    }
  );
};

const notifySuccess = (message: string) => {
  toast.success(
    <div className="flex items-center">
      <FaCheck className="ml-2 mr-2" />
      {message}
    </div>,
    {
      className: "toast-success",
      icon: false,
      autoClose: 1000,
    }
  );
};

const notifyInfo = (message: string) => {
  toast.info(
    <div className="flex items-center">
      <FaInfo className="ml-2 mr-2" />
      {message}
    </div>,
    {
      className: "toast-info",
      icon: false,
      autoClose: 1000,
    }
  );
};

const hideLoading = () => {
  toast.dismiss();
};

export const notificationService = {
  notifyLoading,
  notifyError,
  notifySuccess,
  notifyInfo,
  hideLoading,
};
