import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { NameField } from "../../../shared/components/NameField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ open, onClose, form, save, product, warehouses }) => {
  const isNew = product == null;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {isNew ? "Novo produto" : "Editar produto"}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <NameField
            label="Nome"
            name="name"
            form={form}
            required="Informe o nome"
            size="small"
            sx={{ width: "90%" }}
          />

          <TextField
            label="Quantidade"
            name="quantity"
            type="number"
            size="small"
            required
            sx={{ width: "90%" }}
            value={form.values.quantity || ""}
            onChange={form.handleChange}
          />

          <Select
            name="warehouse"
            value={form.values.warehouse || ""}
            onChange={form.handleChange}
            displayEmpty
            fullWidth
            size="small"
            sx={{ width: "90%" }}
          >
            <MenuItem value="" disabled>
              Selecione um armazém
            </MenuItem>
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </MenuItem>
            ))}
          </Select>

          <DialogActions sx={{ width: "100%", justifyContent: "flex-end" }}>
            <Button
              onClick={onClose}
              variant="outlined"
              startIcon={<CloseIcon />}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" startIcon={<SendIcon />}>
              {isNew ? "Criar" : "Salvar"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
