import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const WarehouseCard = ({ image, title, active, itemCount }) => {
  const defaultImage = "https://static.thenounproject.com/png/4595376-200.png";

  return (
    <Card
      sx={{
        display: "flex",
        border: "2px solid black",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={image || defaultImage}
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
            {title}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Ativo: <strong>{active ? "Sim" : "Não"}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantidade de itens: <strong>{itemCount}</strong>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default WarehouseCard;
