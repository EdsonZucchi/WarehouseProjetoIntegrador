import * as React from "react";
import { useForm } from "react-hook-form";
import { MainLayout } from "../../components/MainLayout";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Slide } from "@mui/material";
import WarehouseCard from "../components/WarehouseCard";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Warehouse = () => {
  const [open, setOpen] = React.useState(false);

  const form = useForm();
  React.useEffect(() => {}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>Novo armazém</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
            </Box>
          </DialogContent>
          <Box sx={{ width: "95%" }}>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                startIcon={<CloseIcon />}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleClose}
              >
                Criar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <WarehouseCard
              image=""
              title="Warehouse 15"
              active={true}
              itemCount={15}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <WarehouseCard
              image=""
              title="Warehouse 16"
              active={false}
              itemCount={20}
            />
          </Grid2>
        </Grid2>
      </Box>
    </MainLayout>
  );
};
