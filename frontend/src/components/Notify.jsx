import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Notify = ({ showNotify, setShowNotify }) => {

  useEffect(() => {
    if (showNotify) {
      // Show success notification
      toast.success(`${showNotify.title} has been deleted`, {
        position: "top-right",
      });
    }
  }, [showNotify, setShowNotify]);

  // Always render the ToastContainer
  return  <ToastContainer />;

};

export default Notify;