import { TextField } from "@mui/material";


export const LoginPage = () => {
    return (
        <div>
            <div>
                Login
            </div>
            <div 
                id="inputs"
            >
                <TextField 
                    id="input-email" 
                    label="E-mail" 
                    variant="outlined"
                    type="email" 
                />
                <TextField 
                    id="input-password" 
                    label="Password" 
                    variant="outlined"
                    type="password" 
                />
            </div>
        </div>
        
    );
}