import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useAlert } from "../../components/AlertProvider";
import { requestUseCase } from "../usecase/RequestUseCase";
import { useState } from "react";

export default function RequestItemCard({ open, onClose, idRequest }) {
  const { showAlert } = useAlert();

  const handleAddRequest = async () => {
    try {
      showAlert("Adicionado com sucesso");
      onClose();
      return true;
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullScreen>
      <DialogTitle>
        Requisição #{idRequest}
        
        <Button onClick={onClose} variant="outlined" color="error" sx={{ float: "right" }}>
          Fechar
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        
      </DialogContent>
      <DialogActions>
        
      </DialogActions>
    </Dialog>
  );
}
