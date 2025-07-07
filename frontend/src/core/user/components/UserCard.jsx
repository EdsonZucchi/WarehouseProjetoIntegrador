import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useAlert } from "../../components/AlertProvider";
import { useEffect } from "react";
import { userUseCase } from "../usecase/UserUseCase";
import { useConfirm } from "../../components/ConfirmDialogContext";

export default function UserCard({ open, onClose, roles, idUser }) {
  const { showAlert } = useAlert();
  const confirm = useConfirm();

  const [displayName, setDisplayName] = useState("");

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    birthday: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!open) return;

      if (idUser != null) {
        try {
          const response = await userUseCase.getUser(idUser);
          setUser({
            id: response.id,
            name: response.name,
            email: response.email,
            birthday: response.birthday,
            role: response.role,
          });
          setDisplayName("Atualizar");
        } catch (error) {
          showAlert(error.message || "Erro ao buscar usuário", "error");
        }
      } else {
        setUser({
          id: null,
          name: "",
          email: "",
          birthday: "",
          role: "",
        });
        setDisplayName("Adicionar");
      }
    };

    fetchUser();
  }, [open, idUser]);

  const handleUserChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddUser = async () => {
    try {
      await userUseCase.createUser(
        user.id,
        user.email,
        user.name,
        user.birthday,
        user.role
      );
      if (user.id == null) {
        showAlert("Adicionado com sucesso");
      } else {
        showAlert("Atualizado com sucesso");
      }
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
    }
  };

  const handleResetUser = async () => {
    if (idUser == null) {
      return;
    }
    try {
      const confirmed = await confirm({
        title: "Resetar a senha?",
        message: "Tem certeza que deseja resetar a senha?",
      });

      if (!confirmed) return;

      await userUseCase.resetPassword(idUser);
      showAlert("Senha resetada");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Usuário
        <Box sx={{ float: "right", display: "flex", gap: "5px" }}>
          {idUser != null ? (
            <>
              <Button
                onClick={handleResetUser}
                variant="contained"
                color="warning"
              >
                Resetar senha
              </Button>
            </>
          ) : (
            <></>
          )}
          <Button onClick={handleAddUser} variant="contained">
            {displayName}
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome do usuário"
              fullWidth
              value={user.name}
              onChange={(e) => handleUserChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nível"
              select
              fullWidth
              value={user.role}
              onChange={(e) => handleUserChange("role", e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="E-mail"
              fullWidth
              value={user.email}
              disabled={idUser != null}
              onChange={(e) => handleUserChange("email", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Aniversário"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={user.birthday}
              onChange={(e) => handleUserChange("birthday", e.target.value)}
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
