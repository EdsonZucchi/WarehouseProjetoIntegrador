import { createContext, useContext, useState } from "react";
import { Alert, Slide, Box } from "@mui/material";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, severity = "success") => {
    const id = new Date().getTime();
    const newAlert = { id, message, severity };
    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  };

  const handleClose = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1400,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {alerts.map((alert) => (
          <Slide in={true} direction="down" key={alert.id}>
            <Alert
              onClose={() => handleClose(alert.id)}
              severity={alert.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Slide>
        ))}
      </Box>
    </AlertContext.Provider>
  );
};
