import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { NameField } from "../../../shared/components/NameField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WarehouseDialog = ({ open, onClose, form, save, warehouse }) => {
  const isNew = warehouse == null;

  React.useEffect(() => {}, []);

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
        {isNew ? "Novo armazém" : "Editar armazém"}
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
            name="nameField"
            form={form}
            required="Informe o nome"
            size="small"
            sx={{ width: "90%" }}
          />

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

export default WarehouseDialog;
