import { useEffect, useState } from "react";
import { productUsecase } from "../usecase/ProductUseCase";
import {
  Box,
  Button,
  Container,
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
import ProductCard from "../components/ProductCard";
import { getUser } from "../../../shared/utils/utils";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filter, setFilter] = useState("");

  const user = getUser();

  const fetchProducts = async () => {
    try {
      const product = await productUsecase.listProducts(filter);
      setProducts(product);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  const handleProduct = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const fetchUnits = async () => {
    const unit = await productUsecase.getUms();
    console.log("aqui = " + unit);
    setUnits(unit);
  };

  const closeDialog = async () => {
    setOpenDialog(false);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchUnits();
  }, [filter]);

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Produtos</Typography>
          {user.role !== "REQUESTER" ? (
            <>
              <Button variant="contained" onClick={() => handleProduct(null)}>
                Novo Produto
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
        <TextField
          label="Filtro"
          fullWidth
          onChange={(e) => setFilter(e.target.value)}
          sx={{ marginBottom: "12px" }}
        />
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Unidade de Medida</TableCell>
                <TableCell>Quantidade em Estoque</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  onClick={() => handleProduct(product.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ProductCard
            open={openDialog}
            onClose={closeDialog}
            units={units}
            idProduct={selectedProductId}
          />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default ProductPage;
