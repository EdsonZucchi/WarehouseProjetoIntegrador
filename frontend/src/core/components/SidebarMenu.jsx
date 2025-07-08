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
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getUser, removeToken, removeUser } from "../../shared/utils/utils";
import { useState } from "react";
import TimelineIcon from '@mui/icons-material/Timeline';
import ResetPassword from "../user/components/ResetPassword";
import { User } from "../user/model/User";

export const SidebarMenu = () => {
  const navigate = useNavigate();

  var user = getUser();
  if (user == null) {
    user = new User()
  }

  const [open, setOpenDialog] = useState(false);

  const closeDialog = async () => {
    setOpenDialog(false)
  }

  const menuItems = [];

  if (user.role === "ADMIN" || user.role === "MANAGER") {
    menuItems.push(
      { text: "Início", icon: <HomeIcon />, path: "/home" },
    )
  }

  menuItems.push(
    { text: "Requisições", icon: <ArticleIcon />, path: "/request" },
    { text: "Produtos", icon: <CategoryIcon />, path: "/product" },
  )

  if (user.role === "ADMIN" || user.role === "MANAGER") {
    menuItems.push(
      { text: "Inventário", icon: <InventoryIcon />, path: "/inventory" },
      { text: "Movimentações", icon: <TimelineIcon />, path: "/movement" },
      { text: "Armazéns", icon: <WarehouseIcon />, path: "/warehouse" },
    );
  }

  if (user.role === "ADMIN") {
    menuItems.push({ text: "Usuários", icon: <PersonIcon />, path: "/users" });
  }

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
                setOpenDialog(true)
              }}
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#c20000" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Alterar senha" sx={{color:"#c20000"}} />
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/login");
                removeToken();
                removeUser();
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
          <ResetPassword
            open={open}
            onClose={closeDialog}
          />
        </Box>
      </Box>
    </>
  );
};
