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

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const product = await productUsecase.listProducts();
      setProducts(product)
    } catch (error) {
      console.log(error)
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
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
          <Button variant="contained">Novo Produto</Button>
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
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default ProductPage;
