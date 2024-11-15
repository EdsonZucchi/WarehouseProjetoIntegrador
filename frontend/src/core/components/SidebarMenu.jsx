import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const SidebarMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'User', icon: <PersonIcon />, path: '/users' }
  ];

  return (
    <>
      {!open && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        open={open}
        onClose={toggleDrawer}
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#f4f4f4",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
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
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem
              button
              onClick={() => {
                navigate('/login');
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
      </Drawer>
    </>
  );
};
