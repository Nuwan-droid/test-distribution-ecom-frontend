import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Close,
  Lock,
  ArrowForward,
  Google,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    const result = await login(email, password);
    if (result.success) navigate("/");
    else setError(result.error || "Login failed");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F9FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        background: "linear-gradient(135deg, #FFF5F0 0%, #F8F9FA 60%)",
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem" }}
                >
                  U
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={800} color="text.primary">
                U
                <Box component="span" sx={{ color: "primary.main" }}>
                  Buy
                </Box>
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={6}
            sx={{
              position: "relative",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <IconButton
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              <Close />
            </IconButton>

            <Typography variant="h5" fontWeight={800} gutterBottom>
              Welcome back!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to continue shopping
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "text.secondary", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ id: "login-email" }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.secondary", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd(!showPwd)}
                        edge="end"
                        size="small"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ id: "login-password" }}
              />

              <Box
                sx={{ display: "flex", justifyContent: "flex-end", mb: 2.5 }}
              >
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{
                    cursor: "pointer",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <ArrowForward />
                  )
                }
                id="login-submit-btn"
                sx={{ borderRadius: 2, mb: 2 }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ borderRadius: 2, mb: 2 }}
              id="google-login-btn"
            >
              Continue with Google
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Box
                  component={Link}
                  to="/register"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Register here
                </Box>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
