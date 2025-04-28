import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ProductDialog = ({ open, onClose, onSave, units }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  const handleSave = async () => {
    let response = await onSave(name, description, unit);

    if (response) {
      onClose();

      setName("");
      setDescription("");
      setUnit("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Adicionar Novo Produto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Unidade de Medida</InputLabel>
          <Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            label="Unidade de Medida"
          >
            {units.map((unitMap) => (
              <MenuItem key={unitMap.acronym} value={unitMap.acronym}>{unitMap.name} ({unitMap.acronym})</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!name || !unit}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
