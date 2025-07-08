import { Box, Button } from "@mui/material";
import { PasswordField } from "../../../shared/components/PasswordField";
import { useForm } from "react-hook-form";
import { userUseCase } from "../usecase/UserUseCase";
import { EmailField } from "../../../shared/components/EmailField";
import { setToken, setUser } from "../../../shared/utils/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "../../components/AlertProvider";

export const Login = () => {
  const form = useForm();
  const { showAlert } = useAlert();

  const { handleSubmit, setValue } = form;

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      let response = await userUseCase.login(data?.email, data?.password)
      setToken(response);

      userUseCase.getMe().then((user) => {
        try {
          if (user == null) {
            showAlert("Erro ao buscar o usuário");
            return;
          }

          setUser(user);

          if (user.role == "REQUESTER") {
            navigate("/request");
          } else {
            navigate("/home");
          }

        } catch (error) {
          showAlert(error.message || "Erro ao buscar usuário", "error");
        }
      });
    } catch (error) {
      showAlert(error.message || "Erro ao logar", "error");
    }
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
        backgroundImage:
          "url('https://img.freepik.com/free-vector/warehouse-interior-with-cardboard-boxes_107791-3324.jpg?semt=ais_hybrid')",
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
