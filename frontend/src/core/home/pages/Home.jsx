import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import { useAlert } from "../../components/AlertProvider";
import { formatDateTime } from "../../../shared/utils/utils";
import { productUsecase } from "../../product/usecase/ProductUseCase"

const Home = () => {
  const { showAlert } = useAlert();
  const [criticalStock, setCriticalStock] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const fetchCriticalStock = async () => {
    try {
      const data = await productUsecase.getCritical();
      setCriticalStock(data);
    } catch (error) {
      showAlert("Erro ao buscar estoque crítico", "error");
    }
  };

  const fetchPendingRequests = async () => {
    try {
    //   const data = await requestUsecase.getPendingApproval(); // endpoint hipotético
    //   setPendingRequests(data);
    } catch (error) {
      showAlert("Erro ao buscar requisições", "error");
    }
  };

  useEffect(() => {
    fetchCriticalStock();
    fetchPendingRequests();
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Card: Estoque Crítico */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Produtos com Estoque Crítico
                </Typography>
                {criticalStock.length === 0 ? (
                  <Typography variant="body2">Nenhum item crítico</Typography>
                ) : (
                  <List dense>
                    {criticalStock.map((product, index) => (
                      <Box key={index}>
                        <ListItem disablePadding>
                          <ListItemText
                            primary={product.name}
                            secondary={`Quantidade: ${product.quantity} (${product.um})`}
                          />
                        </ListItem>
                        {index < criticalStock.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Card: Requisições Pendentes
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Requisições Aguardando Aprovação
                </Typography>
                {pendingRequests.length === 0 ? (
                  <Typography variant="body2">Nenhuma requisição pendente</Typography>
                ) : (
                  <List dense>
                    {pendingRequests.map((req, index) => (
                      <Box key={index}>
                        <ListItem disablePadding>
                          <ListItemText
                            primary={`#${req.number} - ${req.user}`}
                            secondary={formatDateTime(req.date)}
                          />
                        </ListItem>
                        {index < pendingRequests.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Home;
