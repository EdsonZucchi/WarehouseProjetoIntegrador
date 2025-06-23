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

export default function RequestCard({ open, onClose, warehouses, openItems }) {
  const { showAlert } = useAlert();
  const [warehouse, setWarehouse] = useState(0);
  const [body, setBody] = useState(""); 

  const handleAddRequest = async () => {
    try {
      let id = await requestUseCase.saveRequest(null, warehouse, body)
      showAlert("Adicionado com sucesso");
      onClose();
      openItems(id);
      return true;
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Nova Requisição
        <Button
          onClick={handleAddRequest}
          variant="contained"
          sx={{ float: "right" }}
        >
          Adicionar
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Armazém"
              select
              fullWidth
              onChange={(e) => setWarehouse(e.target.value)}
            >
              {warehouses.map((warehouse) => (
                <MenuItem key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Justificativa"
              fullWidth
              multiline
              rows={3}
              onChange={(e) => setBody(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
