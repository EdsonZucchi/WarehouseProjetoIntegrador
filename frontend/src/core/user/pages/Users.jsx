import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { userUseCase } from "../usecase/UserUseCase";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { EmailField } from "../../../shared/components/EmailField";
import { NameField } from "../../../shared/components/NameField";
import { PasswordField } from "../../../shared/components/PasswordField";
import { DateField } from "../../../shared/components/DateField";
import { SelectField } from "../../../shared/components/SelectField";
import { MainLayout } from "../../components/MainLayout";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Users = () => {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const form = useForm();

  const { handleSubmit, setValue, reset } = form;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleResetInputs = () => {
    reset();
  };

  const fetchUsers = async () => {
    try {
      const users = await userUseCase.getUsers();
      setRows(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setRows([]);
    }
  };

  const fetchRoles = async () => {
    const roles = await userUseCase.getRoles();
    setOptions(roles);
  }

  React.useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const createUser = (data) => {
    userUseCase
      .createUser(
        data?.email,
        data?.nameField,
        data?.password,
        data?.birthday,
        data?.role
      )
      .then((response) => {
        try {
          fetchUsers();
          handleResetInputs();
          handleClose();
        } catch (error) {
          console.log(response);
          console.log(error);
        }
      });
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          p: 2,
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-end",
            mb: 2,
          }}
          onClick={handleClickOpen}
        >
          Novo usuário
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>Novo usuário</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(createUser)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <EmailField
                label="E-mail"
                name="email"
                form={form}
                required="Informe o e-mail"
                size="small"
                sx={{ width: "90%" }}
              />
              <Box sx={{ display: "flex", gap: 2, width: "90%" }}>
                <NameField
                  label="Nome"
                  name="nameField"
                  form={form}
                  required="Informe o nome"
                  size="small"
                  sx={{ width: "50%" }}
                />
                <PasswordField
                  size="small"
                  label="Senha"
                  name="password"
                  form={form}
                  required="Informe a senha"
                  sx={{ width: "50%" }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, width: "90%" }}>
                <DateField
                  size="small"
                  label="Data de nascimento"
                  name="birthday"
                  form={form}
                  required="Informe a data"
                  sx={{ width: "50%" }}
                />
                <SelectField
                  size="small"
                  label="Permissão"
                  name="role"
                  form={form}
                  required="Informe a permissão"
                  sx={{ width: "50%" }}
                  options={options}
                />
              </Box>
            </Box>
          </DialogContent>
          <Box sx={{ width: "95%" }}>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                startIcon={<CloseIcon />}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSubmit(createUser)}
              >
                Criar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                  Nome
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                  E-mail
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                  Data de nascimento
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                  Nível
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  Inativar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "rgba(245, 245, 245, 0.9)",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(235, 235, 235, 0.8)",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.birthday}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: "#888" }}>
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainLayout>
  );
};
