import {
  Box,
  Container,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MainLayout } from "../../components/MainLayout";
import { useEffect, useState } from "react";
import { useAlert } from "../../components/AlertProvider";
import { productUsecase } from "../usecase/ProductUseCase";
import { formatDateTime } from "../../../shared/utils/utils";
import { warehouseUsecase } from "../../warehouse/usecase/WarehouseUseCase";

const Movement = () => {
  const { showAlert } = useAlert();
  const [movements, setMovements] = useState([]);
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState("");
  const [warehouse, setWarehouse] = useState(0);
  const [warehouses, setWarehouses] = useState([]);

  const fetchMovements = async () => {
    try {
      const movements = await productUsecase.getMovements(filter, warehouse, user);
      setMovements(movements);
    } catch (error) {
      showAlert("Erro ao buscar", "error");
      setRequests([]);
    }
  };

  const fetchWarehouses = async () => {
    const warehouses = await warehouseUsecase.getWarehouses();
    setWarehouses(warehouses);
  };

  useEffect(() => {
    fetchMovements();
    fetchWarehouses();
  }, [filter, warehouse, user]);

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Movimentações</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <TextField
            label="Armazém"
            select
            fullWidth
            onChange={(e) => setWarehouse(e.target.value)}
          >
            <MenuItem key={0} value={0}>
              Todas
            </MenuItem>
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Filtro"
            fullWidth
            onChange={(e) => setFilter(e.target.value)}
            sx={{ marginBottom: "12px" }}
          />
          <TextField
            label="Usuário"
            fullWidth
            onChange={(e) => setUser(e.target.value)}
            sx={{ marginBottom: "12px" }}
          />
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
                <TableCell>Armazém</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Variante</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Data/Hora</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.warehouse}</TableCell>
                  <TableCell>{movement.product}</TableCell>
                  <TableCell>{movement.variant}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>{movement.user}</TableCell>
                  <TableCell>{formatDateTime(movement.time)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default Movement;
