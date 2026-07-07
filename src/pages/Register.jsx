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
  Close,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  ArrowForward,
  Google,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = await register(form);
    if (result.success) navigate("/");
    else setError("Registration failed. Please try again.");
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
      <Container maxWidth="sm">
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
              Create Account{" "}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              {/* REPLACED GRID WITH A FLEXBOX COLUMN */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Full Name *"
                  value={form.name}
                  onChange={handleChange("name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ id: "register-name" }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ id: "register-email" }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ id: "register-phone" }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password *"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPwd(!showPwd)}
                          size="small"
                        >
                          {showPwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ id: "register-password" }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Confirm Password *"
                  type={showPwd ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  error={Boolean(form.confirm && form.password !== form.confirm)}
                  helperText={
                    form.confirm && form.password !== form.confirm
                      ? "Passwords do not match"
                      : ""
                  }
                  inputProps={{ id: "register-confirm" }}
                />
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
                id="register-submit-btn"
                sx={{ borderRadius: 2, mt: 3, mb: 2 }}
              >
                {loading ? "Creating Account..." : "Create Account"}
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
              id="google-register-btn"
            >
              Sign up with Google
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Box
                  component={Link}
                  to="/login"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign In
                </Box>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}