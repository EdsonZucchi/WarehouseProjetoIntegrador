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
  Typography,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { MainLayout } from "../../components/MainLayout";
import ProductDialog from "../components/ProductDialog";
import { useAlert } from "../../components/AlertProvider";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { showAlert } = useAlert();

  const fetchProducts = async () => {
    try {
      const product = await productUsecase.listProducts();
      setProducts(product);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  const fetchUnits = async () => {
    const unit = await productUsecase.getUms();
    console.log("aqui = " + unit);
    setUnits(unit);
  };

  const handleAddProduct = async (name, description, um) => {
    try {
      await productUsecase.saveNewProduct(name, description, um);
      showAlert("Adicionado com sucesso");
      fetchProducts();
      return true;
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUnits();
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
          <Typography variant="h4">Produtos</Typography>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Novo Produto
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Media</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Unidade de Medida</TableCell>
                <TableCell>Quantidade em Estoque</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Inventory2Icon />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ProductDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSave={handleAddProduct}
            units={units}
          />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default ProductPage;
