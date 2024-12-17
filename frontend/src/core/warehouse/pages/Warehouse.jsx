import * as React from "react";
import { useForm } from "react-hook-form";
import { MainLayout } from "../../components/MainLayout";
import {
  Box,
  Button,
  Grid2,
  Slide,
} from "@mui/material";
import WarehouseCard from "../components/WarehouseCard";
import WarehouseDialog from "../components/WarehouseDialog";
import {Warehouse as WarehouseEntity} from "../model/Warehouse";

import { warehouseUsecase } from "../usecase/WarehouseUseCase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Warehouse = () => {
  const [open, setOpen] = React.useState(false);
  const [warehouses, setWarehouses] = React.useState([]);

  const form = useForm();

  const { handleSubmit, setValue, reset } = form;

  const fetchWarehouses = async () => {
    try {
      const warehouses = await warehouseUsecase.getWarehouses();
      setWarehouses(warehouses);
    } catch (error) {
      console.error(error);
      setWarehouses([]);
    }
  };

  React.useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleResetInputs = () => {
    reset();
  };

  const saveWarehouse = (data) => {
    console.log('Passei aqui')
    warehouseUsecase.saveWarehouse(
      new WarehouseEntity(null, data.nameField, null)
    ).then((response) => {
      try {
        fetchWarehouses();
        handleResetInputs();
        handleClose();
      } catch (error) {
        console.log(response);
        console.log(error);
      }
    });
  };

  const disableWarehouse = (id) => {
    let result = confirm('Você realmente desaja desabilitar o armazém?')
    if (result){
      warehouseUsecase.disableWarehouse(
        id
      ).then((response) => {
        try {
          fetchWarehouses();
        } catch (error) {
          console.log(response);
          console.log(error);
        }
      });
    }
  }

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          p: 2,
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-end",
            mb: 2,
          }}
          onClick={handleClickOpen}
        >
          Novo armazém
        </Button>
        <WarehouseDialog
          open={open}
          onClose={handleClose}
          form={form}
          save={handleSubmit(saveWarehouse)}
        />
        <Grid2 container spacing={2}>
          {warehouses.length > 0 ? (
            warehouses.map((warehouse, index) => (
              <Grid2 key={index} xs={12} sm={6}>
                <WarehouseCard warehouse={warehouse} onClose={() => disableWarehouse(warehouse.id)} />
              </Grid2>
            ))
          ) : (
            <></>
          )}
        </Grid2>
      </Box>
    </MainLayout>
  );
};
