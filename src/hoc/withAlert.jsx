import React, { useState } from "react";
import IntegrationNotistack from "../app/components/Alert";

const withAlert = (Component) => {
  return (props) => {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    const triggerAlert = (message, type) => {
      setAlertMessage(""); // Reset message first
      setAlertType(type);
      setTimeout(() => {
        setAlertMessage(message);
      }, 0); // Re-set the same message after a brief timeout
    };

    const addedProps = {
      setAlertMessage: (message) => triggerAlert(message, alertType),
      setAlertType,
      alertSuccess: (message) => triggerAlert(message, "success"),
      alertWarning: (message) => triggerAlert(message, "warning"),
      alertError: (message) => triggerAlert(message, "error"),
      closeAlert: () => {
        setAlertMessage("");
      },
      alertMessage,
      alertType
    };

    return (
      <>
        <Component {...props} {...addedProps} />
        <IntegrationNotistack alertMessage={alertMessage} alertType={alertType} />
      </>
    );
  };
};

export default withAlert;
