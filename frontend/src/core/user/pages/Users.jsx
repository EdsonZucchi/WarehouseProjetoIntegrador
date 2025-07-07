import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MainLayout } from "../../components/MainLayout";
import { useEffect, useState } from "react";
import { useAlert } from "../../components/AlertProvider";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";
import SyncIcon from "@mui/icons-material/Sync";
import { useConfirm } from "../../components/ConfirmDialogContext";
import { userUseCase } from "../usecase/UserUseCase";
import { formatDate, getUser } from "../../../shared/utils/utils";
import UserCard from "../components/UserCard";
import ListIcon from '@mui/icons-material/List';

const Users = () => {
  const { showAlert } = useAlert();
  const confirm = useConfirm();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpenDialog] = useState(false);
  const userActual = getUser();
  const [roles, setRoles] = useState([]);

  const handleUser = (id) => {
    setSelectedUser(id)
    setOpenDialog(true);
  };

  const fetchUsers = async () => {
    const response = await userUseCase.getUsers();
    setUsers(response);
  };

  const fetchRoles = async () => {
    const response = await userUseCase.getRoles();
    setRoles(response);
  }

  const handleStatusUser = async (id) => {
    try {
      const confirmed = await confirm({
        title: "Alterar status?",
        message: "Tem certeza que deseja alterar o status do usuário?",
      });

      if (!confirmed) return;

      await userUseCase.putStatusUser(id);
      showAlert("Alterado status com sucesso");
      fetchUsers();
    } catch (error) {
      showAlert(
        error.message || "Não foi possivel alterar o status do usuário",
        "error"
      );
    }
  };

  const closeDialog = async () => {
    setOpenDialog(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Usuários</Typography>
          <Button variant="contained" onClick={() => handleUser(null)}>
            Novo Usuário
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
            maxHeight: "60vh",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Situação</TableCell>
                <TableCell>Data de nascimento</TableCell>
                <TableCell>Nível</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status != 0 ? "Desativado" : "Ativo"}</TableCell>
                  <TableCell>{formatDate(user.birthday)}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="details"
                      color="default"
                      title="Detalhes"
                      onClick={() => handleUser(user.id)}
                    >
                      <ListIcon/> 
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color={user.status != 0 ? "success" : "error"}
                      disabled={userActual.id == user.id}
                      title={user.status != 0 ? "Ativar" : "Desativar"}
                      onClick={() => handleStatusUser(user.id)}
                    >
                      {user.status != 0 ? <SyncIcon /> : <SyncDisabledIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <UserCard
            open={open}
            onClose={closeDialog}
            roles={roles}
            idUser={selectedUser}
          />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default Users;
