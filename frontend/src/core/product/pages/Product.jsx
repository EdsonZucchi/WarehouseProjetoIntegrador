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
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const product = await productUsecase.listProducts();
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
  }

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
          <Button variant="contained" onClick={() => handleProduct(null)}>
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
                <TableRow key={product.id} onClick={() => handleProduct(product.id)} sx={{ cursor: 'pointer' }}>
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
