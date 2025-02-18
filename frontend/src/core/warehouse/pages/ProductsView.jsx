import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/MainLayout";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { warehouseUsecase } from "../usecase/WarehouseUseCase";

export const ProductsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await warehouseUsecase.getDetailsWarehouse(id);
        setWarehouse(data);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Erro ao buscar warehouse", error);
      }
    };

    fetchWarehouse();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          p: 2,
        }}
      >
        <Box sx={{display: "flex", gap: 2}}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ alignSelf: "flex-end" }}
          >
            Voltar
          </Button>
      
          <Button
            variant="contained"
            sx={{
              alignSelf: "flex-end",
            }}
          >
            Novo produto
          </Button>
        </Box>

        <Typography variant="h4" fontWeight="bold">
          {warehouse ? warehouse.name : "Carregando..."}
        </Typography>

        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Quantidade: {product.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">Nenhum produto encontrado.</Typography>
          )}
        </Grid>
      </Box>
    </MainLayout>
  );
};
