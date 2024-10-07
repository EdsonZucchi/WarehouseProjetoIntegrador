import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { userUseCase } from '../usecase/UserUseCase';

export const Users = () => {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userUseCase.getUsers(); 
        setRows(users); 
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setRows([]); 
      }
    };
    fetchUsers();
  }, []);

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
        >
          Novo usuário
        </Button>
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
