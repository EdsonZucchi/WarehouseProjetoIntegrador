import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WarehouseCard = ({ warehouse, onClose, onClick }) => {
  const defaultImage = "https://static.thenounproject.com/png/4595376-200.png";

  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        border: "2px solid black",
        borderRadius: 2,
        boxShadow: 3,
        mb: 2, // Espaço entre os cards
      }}
      onClick={onClick}
    >
      {/* {!warehouse.disable ? ( */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "black",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      {/* ) : null} */}

      <CardMedia
        component="img"
        image={warehouse.image || defaultImage}
        alt="warehouse image"
        sx={{ width: 150, height: "100%", objectFit: "cover" }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {warehouse.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          {/* {!warehouse.disable && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Ativo: <strong>Sim</strong>
            </Typography>
          )} */}
          <Typography variant="body2" color="text.secondary">
            Quantidade de itens: <strong>{warehouse.itemCount}</strong>
          </Typography>
        </CardContent>
      </Box>

      {/* Faixa vermelha menor com texto */}
      {warehouse.disable && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20px",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            Desativado
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default WarehouseCard;
