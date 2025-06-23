import { createContext, useContext, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDialogContext = createContext();

export function useConfirm() {
  return useContext(ConfirmDialogContext);
}

export function ConfirmDialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [resolveFn, setResolveFn] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setOptions(options);
      setOpen(true);
      setResolveFn(() => resolve);
    });
  }, []);

  const handleClose = (result) => {
    setOpen(false);
    if (resolveFn) resolveFn(result);
  };

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{options.title || "Confirmação"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{options.message || "Tem certeza?"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}
