import { SidebarMenu } from "./SidebarMenu";
import { Box } from "@mui/material";

export const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          minHeight: "91vh",
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
