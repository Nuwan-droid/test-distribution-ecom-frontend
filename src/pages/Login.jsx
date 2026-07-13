import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

/* ── Inline SVG icons (no extra dep) ────────────────────────── */
const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" />
    <path d="M2.5 6l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <rect x="3" y="9" width="14" height="9" rx="2" />
    <path d="M7 9V6a3 3 0 016 0v3" strokeLinecap="round" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663.3 0 541.8c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
);

/* ── Shared field sx ─────────────────────────────────────────── */
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#F8FAFC",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#2563EB" },
    "&.Mui-focused fieldset": { borderColor: "#0B1F5B", borderWidth: "1.5px" },
    "&.Mui-focused": { backgroundColor: "#ffffff" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.82rem",
    color: "#64748B",
    "&.Mui-focused": { color: "#0B1F5B" },
  },
  "& .MuiInputAdornment-root svg": { color: "#94A3B8" },
};

export default function Login() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const { login, loading }      = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill all fields."); return; }
    const result = await login(email, password);
    if (result.success) navigate("/");
    else setError(result.error || "Login failed");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAFC",
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            p: { xs: "28px 22px", sm: "40px 36px 32px" },
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* ── Close button ── */}
          <IconButton
            onClick={() => navigate("/")}
            size="small"
            aria-label="Close"
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              color: "#94A3B8",
              bgcolor: "#F8FAFC",
              border: "1px solid #E5E7EB",
              "&:hover": { bgcolor: "#EAF2FF", color: "#64748B" },
              transition: "all 0.15s ease",
            }}
          >
            <Close fontSize="small" />
          </IconButton>
          {/* ── Header ── */}
          <Box sx={{ mb: 3.5 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1E293B", letterSpacing: "-0.3px", mb: 0.75 }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              Access your secure distribution dashboard
            </Typography>
          </Box>

          {/* ── Error ── */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2.5, borderRadius: "10px", fontSize: "0.82rem" }}
            >
              {error}
            </Alert>
          )}

          {/* ── Form ── */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2.25, ...fieldSx }}>
              <InputLabel htmlFor="login-email">Email Address</InputLabel>
              <OutlinedInput
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                autoComplete="email"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* Password */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 0.5, ...fieldSx }}>
              <InputLabel htmlFor="login-password">Password</InputLabel>
              <OutlinedInput
                id="login-password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                autoComplete="current-password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPwd(!showPwd)}
                      edge="end"
                      size="small"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      sx={{ color: "#94A3B8", "&:hover": { color: "#64748B" } }}
                    >
                      {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* Login button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              id="login-submit-btn"
              sx={{
                mt: 2.5,
                py: 1.6,
                borderRadius: "10px",
                bgcolor: "#0B1F5B",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#18317A",
                  boxShadow: "0 4px 16px rgba(26,43,75,0.25)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                "&:disabled": { bgcolor: "#0B1F5B", opacity: 0.6 },
                transition: "all 0.2s ease",
              }}
            >
              {loading ? (
                <CircularProgress size={20} thickness={3} sx={{ color: "rgba(255,255,255,0.8)" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          {/* ── Forgot password ── */}
          <Box sx={{ textAlign: "center", mt: 1.75 }}>
            <Typography
              component="button"
              type="button"
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748B",
                fontSize: "0.85rem",
                p: 0,
                "&:hover": { color: "#0B1F5B", textDecoration: "underline" },
                transition: "color 0.15s",
              }}
            >
              Forget password?
            </Typography>
          </Box>

          {/* ── Divider ── */}
          <Divider sx={{ my: 2.5 }}>
            <Typography
              variant="caption"
              sx={{ color: "#94A3B8", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              or
            </Typography>
          </Divider>

          {/* ── Social buttons ── */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              id="google-login-btn"
              sx={{
                py: 1.4,
                borderRadius: "10px",
                borderColor: "#E5E7EB",
                color: "#1E293B",
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#2563EB",
                  bgcolor: "#f9fafb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                transition: "all 0.2s ease",
              }}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<AppleIcon />}
              id="apple-login-btn"
              sx={{
                py: 1.4,
                borderRadius: "10px",
                borderColor: "#E5E7EB",
                color: "#1E293B",
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#2563EB",
                  bgcolor: "#f9fafb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                transition: "all 0.2s ease",
              }}
            >
              Continue with Apple
            </Button>
          </Box>

          {/* ── Register link ── */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#64748B", mt: 3, fontSize: "0.85rem" }}
          >
            Don't have an account?{" "}
            <Box
              component={Link}
              to="/register"
              sx={{
                color: "#0B1F5B",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Create Account
            </Box>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
