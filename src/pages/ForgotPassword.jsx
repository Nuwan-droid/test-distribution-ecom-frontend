import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";

const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" />
    <path d="M2.5 6l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    // Simulate API call — replace with real call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    // Pass email forward so OTP page can display it
    navigate("/verify-otp", { state: { email } });
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
          {/* Close */}
          <IconButton
            onClick={() => navigate("/login")}
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

          {/* Header */}
          <Box sx={{ mb: 3.5 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1E293B", letterSpacing: "-0.3px", mb: 1 }}
            >
              Forgot Password?
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.6 }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px", fontSize: "0.82rem" }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl fullWidth variant="outlined" sx={fieldSx}>
              <InputLabel htmlFor="forgot-email">Email Address</InputLabel>
              <OutlinedInput
                id="forgot-email"
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

            {/* Send Reset Link */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              id="send-reset-link-btn"
              sx={{
                py: 1.6,
                borderRadius: "10px",
                bgcolor: "#0B1F5B",
                fontWeight: 600,
                fontSize: "0.95rem",
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
              {loading
                ? <CircularProgress size={20} thickness={3} sx={{ color: "rgba(255,255,255,0.8)" }} />
                : "Send OTP"}
            </Button>

            {/* Back to login */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/login")}
              id="back-to-login-btn"
              sx={{
                py: 1.5,
                borderRadius: "10px",
                borderColor: "#E5E7EB",
                color: "#64748B",
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "none",
                "&:hover": { borderColor: "#2563EB", bgcolor: "#f9fafb" },
                transition: "all 0.2s ease",
              }}
            >
              Back to login
            </Button>
          </Box>

          {/* Help box */}
          <Box
            sx={{
              mt: 3.5,
              p: "16px 20px",
              borderRadius: "12px",
              bgcolor: "#fff0f3",
              border: "1px solid #fecdd3",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#1E293B", mb: 0.5 }}>
              Need more help?
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.82rem", lineHeight: 1.6 }}>
              If you no longer have access to this email, please contact our{" "}
              <Box
                component="span"
                sx={{
                  color: "#e11d48",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Support Team
              </Box>{" "}
              for manual identity verification.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
