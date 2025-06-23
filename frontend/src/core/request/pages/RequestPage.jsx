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
import { MainLayout } from "../../components/MainLayout";
import { useEffect, useState } from "react";
import { requestUseCase } from "../usecase/RequestUseCase";
import { useAlert } from "../../components/AlertProvider";
import { warehouseUsecase } from "../../warehouse/usecase/WarehouseUseCase";
import RequestItemCard from "../components/RequestItemCard";
import RequestCard from "../components/RequestCard";

const RequestPage = () => {
  const { showAlert } = useAlert();
  const [requests, setRequests] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectRequest, setSelectRequest] = useState(0);
  const [openDialogItem, setDialogItem] = useState(false);

  const fetchRequest = async () => {
    try {
      const request = await requestUseCase.listRequest();
      setRequests(request);
    } catch (error) {
      showAlert("Erro ao buscar", "error");
      setRequests([]);
    }
  };

  const handleRequest = () => {
    setOpenDialog(true);
  };

  const fetchWarehouses = async () => {
    const warehouses = await warehouseUsecase.getWarehouses();
    setWarehouses(warehouses);
  };

  const closeDialog = async () => {
    setOpenDialog(false);
    fetchRequest();
  };

  const handleDialogItem = async (idRequest) => {
    setSelectRequest(idRequest);
    setDialogItem(true);
  }

  const closeDialogItem = async () => {
    setDialogItem(false);
    fetchRequest();
  };

  useEffect(() => {
    fetchRequest();
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
          <Typography variant="h4">Requisições</Typography>
          <Button variant="contained" onClick={() => handleRequest()}>Nova requisição</Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Requisição</TableCell>
                <TableCell>Solicitante</TableCell>
                <TableCell>Armazém</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} sx={{cursor: "pointer"}} onClick={() => handleDialogItem(request.id)}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.requestName}</TableCell>
                  <TableCell>{request.warehouseName}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RequestCard
           open={openDialog}
           onClose={closeDialog}
           warehouses={warehouses}
          />
          <RequestItemCard
            open={openDialogItem}
            onClose={closeDialogItem}
            idRequest={selectRequest}
          />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default RequestPage;
