import { Box, Button } from "@mui/material";
import { PasswordField } from "../../../shared/components/PasswordField";
import { useForm } from "react-hook-form";
import { userUseCase } from "../usecase/UserUseCase";
import { EmailField } from "../../../shared/components/EmailField";
import { setToken } from "../../../shared/utils/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const form = useForm();

  const { handleSubmit, setValue } = form;

  const navigate = useNavigate();

  const login = (data) => {
    userUseCase.login(data?.email, data?.password).then((response) => {
      try {
        if (response === "") {
          console.log(response);
        } else {
          setToken(response);
          navigate("/users");
        }
      } catch (error) {
        console.log(response);
      }
    });
  };

  // Estilos globais para remover o scroll e ajustar o layout.
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('https://img.freepik.com/free-vector/warehouse-interior-with-cardboard-boxes_107791-3324.jpg?semt=ais_hybrid')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(login)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          flexDirection: "column",
          gap: 3,
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          Warehouse
        </span>
        <EmailField
          label="E-mail"
          name="email"
          form={form}
          required="Informe o e-mail"
          size="small"
          sx={{ width: "100%" }}
        />
        <PasswordField
          size="small"
          label="Password"
          name="password"
          form={form}
          required="Informe a senha"
          sx={{ width: "100%" }}
        />
        <Button variant="contained" type="submit" sx={{ width: "100%" }}>
          Logar
        </Button>
      </Box>
    </Box>
  );
};
