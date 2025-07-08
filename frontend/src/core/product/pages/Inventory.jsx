import {
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Box,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useAlert } from "../../components/AlertProvider";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { warehouseUsecase } from "../../warehouse/usecase/WarehouseUseCase";
import { MainLayout } from "../../components/MainLayout";
import { productUsecase } from "../usecase/ProductUseCase";
import { ManOutlined } from "@mui/icons-material";

const Inventory = () => {
  const { showAlert } = useAlert();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [warehouse, setWarehouse] = useState(0);
  const [map, setMap] = useState(new Map());
  const [warehouses, setWarehouses] = useState([]);

  const parseIfNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  const setQuantity = (id, quantity) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, quantity);
      return newMap;
    });
  };

  const removeMap = (id) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const clearMap = async () => {
    setMap((prev) => {
      return new Map();
    });
  };

  const updateItems = async () => {
    try {
      let listDelete = [];
      for (const [key, value] of map) {
        try {
          await productUsecase.inventory(warehouse, key, value);
          listDelete.push(key);
        } catch (error) {
          showAlert(
            error.message || "Erro ao atualizar produto/variante",
            "error"
          );
        }
      }

      await fetchItems();

      showAlert("Atualizado com sucesso");

      setMap((prev) => {
        const newMap = new Map(prev);
        listDelete.forEach((key) => newMap.delete(key));
        return newMap;
      });
    } catch (error) {
      showAlert(error.message || "Erro ao atualizar", "error");
    }
  };

  const fetchItems = async () => {
    try {
      if (warehouse != 0) {
        var items = await productUsecase.listItems(warehouse, filter);
        setItems(items);
      }
    } catch (error) {
      showAlert(error.message || "Erro ao buscar itens", "error");
    }
  };

  const fetchWarehouses = async () => {
    const warehouses = await warehouseUsecase.getWarehouses();
    setWarehouses(warehouses);
  };

  useEffect(() => {
    fetchItems();
    fetchWarehouses();
  }, [filter, warehouse]);

  const getRowBackgroundColor = (item) => {
    if (map.has(item.variantId)) {
      return "#e6ffe6"; // Verde claro
    }

    return "inherit"; // Sem cor de fundo
  };

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Inventário</Typography>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Button
              onClick={updateItems}
              variant="contained"
              color="primary"
              disabled={!map.size > 0}
            >
              Atualizar
            </Button>
            <Button
              onClick={clearMap}
              variant="contained"
              color="warning"
              disabled={!map.size > 0}
            >
              Limpar campos
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <TextField
            label="Armazém"
            select
            fullWidth
            onChange={(e) => setWarehouse(e.target.value)}
          >
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
                <TableCell>Produto</TableCell>
                <TableCell>Variante</TableCell>
                <TableCell>Requisitado</TableCell>
                <TableCell>Estoque</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.variantId}
                  sx={{
                    backgroundColor: getRowBackgroundColor(item),
                  }}
                >
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>
                    {item.variantCode} - {item.variantName}
                  </TableCell>
                  {console.log(item.quantityPending)}
                  <TableCell>{item.quantityPending == 0 ? "-" : item.quantityPending}</TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      sx={{ width: "25ch" }}
                      size="small"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              {item.um}
                            </InputAdornment>
                          ),
                        },
                      }}
                      value={map.get(item.variantId) ?? item.quantityStock}
                      onChange={(e) =>
                        setQuantity(
                          item.variantId,
                          parseIfNumber(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      disabled={!map.has(item.variantId)}
                      onClick={() => removeMap(item.variantId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default Inventory;
