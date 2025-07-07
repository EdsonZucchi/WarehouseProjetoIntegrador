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
import { useState } from "react";
import { warehouseUsecase } from "../usecase/WarehouseUseCase";

export default function WarehouseCard({ open, onClose }) {
  const { showAlert } = useAlert();
  const [name, setName] = useState(""); 

  const handleWarehouse = async () => {
    try {
      await warehouseUsecase.saveWarehouse(name)
      showAlert("Adicionado com sucesso");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        Novo Armazém
        <Button
          onClick={handleWarehouse}
          variant="contained"
          sx={{ float: "right", marginLeft: "20px" }}
        >
          Adicionar
        </Button>
      </DialogTitle>
      <DialogContent dividers>
            <TextField
              label="Nome"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
