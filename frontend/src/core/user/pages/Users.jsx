import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { userUseCase } from '../usecase/UserUseCase';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { EmailField } from '../../../shared/components/EmailField';
import { NameField } from '../../../shared/components/NameField';
import { PasswordField } from '../../../shared/components/PasswordField';
import { DateField } from '../../../shared/components/DateField';
import { SelectField } from '../../../shared/components/SelectField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Users = () => {

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const form = useForm();

  const { handleSubmit, reset } = form;

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleResetInputs = () => {
    reset();
  }

  const fetchUsers = async () => {
    try {
      const users = await userUseCase.getUsers(); 
      setRows(users); 
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setRows([]); 
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = (data) => {
    userUseCase.createUser(data?.email, 
                           data?.nameField,
                           data?.password,
                           data?.birthday,
                           data?.role).then((response) => {
      try {
        console.log(response)
        fetchUsers();
        handleResetInputs();
        handleClose();
      }catch (error) {
        console.log(response)
        console.log(error)
      }
    })
  };


  return (
    <Box
    sx={{
        display: 'flex',
        p: 2, 
        flexDirection: "column", 
        gap: 5, 
    }}
    >
        <Button 
          variant="outlined" 
          sx={{
            width:"100%"
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
          fullWidth={true}
          maxWidth={`sm`}
        >
          <DialogTitle>{"Novo usuário"}</DialogTitle>
          <DialogContent>
            <Box 
              component="form"
              onSubmit={handleSubmit(createUser)}
              sx={{ display: "flex", 
                    alignItems:"center",
                    justifyContent:"center", 
                    flexDirection: "column", 
                    gap: 1, 
                    width:"100%",
                  }}
            >
              <EmailField
                label="E-mail"
                name="email"
                form={form}
                required="Informe o e-mail"
                size="small"
                sx={{
                  width:"95%"
                }}
              />
              <Box
                sx={{
                  width:"95%",
                  display:"flex",
                  gap:1
                }}
              >
                <NameField
                  label="Nome"
                  name="nameField"
                  form={form}
                  required="Informe o nome"
                  size="small"
                  sx={{
                    width:"50%"
                  }}
                />
                <PasswordField
                  size="small"
                  label="Senha"
                  name="password"
                  form={form}
                  required="Informe a senha"
                  sx={{
                    width:"50%"
                  }}
                />
              </Box>
              <Box
                sx={{
                  width:"95%",
                  display:"flex",
                  gap:1
                }}
              >
                <DateField
                  size="small"
                  label="Data de nascimento"
                  name="birthday"
                  form={form}
                  required="Informe a data"
                  sx={{
                    width:"50%"
                  }}
                />
                <SelectField
                  size="small"
                  label="Permissão"
                  name="role"
                  form={form}
                  required="Informe a permissão"
                  sx={{
                    width:"50%"
                  }}
                  options={[
                    { value: '', label: '' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'requester', label: 'Requester' },
                  ]}
                />
              </Box>
            </Box>
          </DialogContent>
          <Box sx={{width:"95%"}}>
            <DialogActions>
              <Button onClick={handleClose}
                variant='outlined'
                startIcon={<CloseIcon/>}
              >
                Cancelar
              </Button>
              <Button type="submit"
                variant='contained'
                startIcon={<SendIcon/>}
                onClick={handleSubmit(createUser)}
              >
                Criar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">E-mail</TableCell>
                    <TableCell align="left">Data de nascimento</TableCell>
                    <TableCell align="left">Nível</TableCell>
                    <TableCell align="center">Inativar</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                      <TableRow
                      key={row.email}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.birthday}</TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="center">
                          <IconButton aria-label="delete">
                              <DeleteIcon />
                          </IconButton>
                      </TableCell>
                      </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}
