import React from "react";
import { SidebarMenu } from "./SidebarMenu";
import { Box } from "@mui/material";
import { AlertProvider } from "./AlertProvider";

export const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          minHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
