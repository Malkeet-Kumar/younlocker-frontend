import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

const MyAlert = ({ alertMessage = "", type = "success",timeStamp }) => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (alertMessage) {
      enqueueSnackbar(alertMessage, { variant: type});
    }
  }, [alertMessage, type, enqueueSnackbar,timeStamp]);

  return null; // No need to render anything, as notistack handles it
};

export default function IntegrationNotistack({ alertMessage, alertType }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      preventDuplicate={false}
    >
      <MyAlert alertMessage={alertMessage} type={alertType} timeStamp={Date.now()} />
    </SnackbarProvider>
  );
}
