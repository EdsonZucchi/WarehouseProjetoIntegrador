import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useAlert } from "../../components/AlertProvider";
import { useState } from "react";
import { userUseCase } from "../usecase/UserUseCase";
import { getUser } from "../../../shared/utils/utils";

export default function ResetPassword({ open, onClose }) {
  const { showAlert } = useAlert();
  const user = getUser(); 
  const [oldPass, setOldPass] = useState(""); 
  const [newPass, setNewPass] = useState(""); 

  const handleResetPass = async () => {
    try {
      await userUseCase.changePassword(user.id, oldPass, newPass)
      showAlert("Alterado com sucesso");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao alterar senha", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        Alterar senha
        <Button
          onClick={handleResetPass}
          variant="contained"
          sx={{ float: "right", marginLeft: "20px" }}
        >
          Alterar
        </Button>
      </DialogTitle>
      <DialogContent dividers>
            <TextField
              label="Senha antiga"
              fullWidth
              type="password"
              onChange={(e) => setOldPass(e.target.value)}
            />
            <TextField
              label="Nova senha"
              fullWidth
              type="password"
              sx={{marginTop:"5px"}}
              onChange={(e) => setNewPass(e.target.value)}
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
