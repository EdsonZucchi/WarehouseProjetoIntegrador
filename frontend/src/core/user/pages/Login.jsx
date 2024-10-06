import { Box, Button } from "@mui/material";
import { PasswordField } from "../../../shared/components/PasswordField";
import { useForm } from "react-hook-form";
import { userUseCase } from "../usecase/UserUseCase";
import { EmailField } from "../../../shared/components/EmailField";

export const Login = () => {
  const form = useForm();

  const { handleSubmit, setValue } = form;

  const login = (data) => {
    userUseCase.login(data?.email, data?.password).then((response) => {
      console.log(response)
    })
  };

  return (
    <Box
      sx={{
        width:"95vw",
        height:"95vh", 
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(login)}
        sx={{ display: "flex", 
              alignItems:"center",
              justifyContent:"center",
              p: 2, 
              flexDirection: "column", 
              gap: 5, 
              border: "1px solid rgba(0, 0, 0, 0.87)", 
              borderRadius: "4px" ,
              width:"40%",
            }}
      >
        <span>Warehouse</span>
        <EmailField
          label="E-mail"
          name="email"
          form={form}
          required="Informe o e-mail"
          size="small"
          sx={{
            width:"90%"
          }}
        />
        <PasswordField
          size="small"
          label="Password"
          name="password"
          form={form}
          required="Informe a senha"
          sx={{
            width:"90%"
          }}
        />
        <Button 
          variant="outlined" 
          type="submit"
          sx={{
            width:"90%"
          }}
        >
          Logar
        </Button>
      </Box>
    </Box>
  );
};
