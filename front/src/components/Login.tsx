import { Button, IconButton, Typography } from "@mui/material";
import { FC, FormEvent, useContext, useState } from "react";
import "../App.css";
import { AuthContext } from "../global/context/AuthContext";
import CustomTextField from "./CustomTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("students@douze.info");
  const [password, setPassword] = useState("students@douze.info");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const success = await login(email.toLowerCase(), password);
      if (!success) {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div className="container">
      <Typography variant="h1" className="title">
        Login
      </Typography>
      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleLogin}>
        <CustomTextField
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          icon={
            <IconButton
              color="primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </form>

      <Button variant="outlined" onClick={handleLogin}>
        se connecter
      </Button>
    </div>
  );
};

export default Login;
