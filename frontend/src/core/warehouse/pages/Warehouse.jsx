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
import { warehouseUsecase } from "../../warehouse/usecase/WarehouseUseCase";
import { useConfirm } from "../../components/ConfirmDialogContext";
import WarehouseDialog from "../components/WarehouseDialog";

const Warehouse = () => {
  const { showAlert } = useAlert();
  const confirm = useConfirm();
  const [warehouses, setWarehouses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleWarehouse = () => {
    setOpenDialog(true);
  };

  const fetchWarehouses = async () => {
    const warehouses = await warehouseUsecase.getWarehouses();
    setWarehouses(warehouses);
  };

  const handleStatusWarehouse = async (id) => {
    try {
      const confirmed = await confirm({
        title: "Alterar status?",
        message: "Tem certeza que deseja alterar o status do armazém?",
      });

      if (!confirmed) return;

      let response = await warehouseUsecase.disableWarehouse(id);
      if (response == null) {
        showAlert("Não foi possivel alterar o status do armazém", "error");
      } else {
        showAlert("Alterado status com sucesso");
      }

      fetchWarehouses();
    } catch (error) {
      showAlert("Não foi possivel alterar o status do armazém", "error");
    }
  };

  const closeDialog = async () => {
    setOpenDialog(false);
    fetchWarehouses();
  };

  useEffect(() => {
    fetchWarehouses();
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
          <Typography variant="h4">Armazéns</Typography>
          <Button variant="contained" onClick={() => handleWarehouse()}>
            Novo Armazém
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
                <TableCell>Situação</TableCell>
                <TableCell>Quantidade de itens</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>
                    {warehouse.disable ? "Desativado" : "Ativo"}
                  </TableCell>
                  <TableCell>{warehouse.itemCount}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color={warehouse.disable ? "success" : "error"}
                      disabled={warehouse.itemCount > 0}
                      title={warehouse.disable ? "Ativar" : "Desativar"}
                      onClick={() => handleStatusWarehouse(warehouse.id)}
                    >
                      {warehouse.disable ? <SyncIcon /> : <SyncDisabledIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <WarehouseDialog open={openDialog} onClose={closeDialog} />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default Warehouse;
