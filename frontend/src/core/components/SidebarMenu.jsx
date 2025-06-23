import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";

export const SidebarMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Início", icon: <HomeIcon />, path: "/home" },
    { text: "Armazéns", icon: <WarehouseIcon />, path: "/warehouse" },
    { text: "Produtos", icon: <CategoryIcon />, path: "/product" },
    { text: "Requisições", icon: <ArticleIcon />, path: "/request" },
    { text: "Usuários", icon: <PersonIcon />, path: "/users" },
  ];

  return (
    <>
      <Box
        sx={{
          width: "13%",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#555" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#333" }} />
            </ListItem>
          ))}
        </List>
        <Box>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#555" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#333" }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};
