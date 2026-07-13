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
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

/* ── Inline SVG icons ────────────────────────────────────────── */
const PersonIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <circle cx="10" cy="7" r="3" />
    <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" strokeLinecap="round" />
  </svg>
);

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

/* ── Component ───────────────────────────────────────────────── */
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [error, setError]           = useState("");
  const { register, loading }       = useAuth();
  const navigate                    = useNavigate();

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
    if (!agreed) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }
    const result = await register(form);
    if (result.success) navigate("/");
    else setError("Registration failed. Please try again.");
  };

  const passwordMismatch = Boolean(form.confirm && form.password !== form.confirm);

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
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              Start your journey to financial clarity today.
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}
          >
            {/* Full Name */}
            <FormControl fullWidth variant="outlined" sx={fieldSx}>
              <InputLabel htmlFor="register-name">Full Name</InputLabel>
              <OutlinedInput
                id="register-name"
                value={form.name}
                onChange={handleChange("name")}
                label="Full Name"
                autoComplete="name"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* Email */}
            <FormControl fullWidth variant="outlined" sx={fieldSx}>
              <InputLabel htmlFor="register-email">Email Address</InputLabel>
              <OutlinedInput
                id="register-email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
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
            <FormControl fullWidth variant="outlined" sx={fieldSx}>
              <InputLabel htmlFor="register-password">Password</InputLabel>
              <OutlinedInput
                id="register-password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                label="Password"
                autoComplete="new-password"
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

            {/* Confirm Password */}
            <FormControl
              fullWidth
              variant="outlined"
              error={passwordMismatch}
              sx={{
                ...fieldSx,
                ...(passwordMismatch && {
                  "& .MuiOutlinedInput-root": {
                    ...fieldSx["& .MuiOutlinedInput-root"],
                    "& fieldset": { borderColor: "#EF4444" },
                    "&:hover fieldset": { borderColor: "#EF4444" },
                  },
                }),
              }}
            >
              <InputLabel htmlFor="register-confirm">Confirm Password</InputLabel>
              <OutlinedInput
                id="register-confirm"
                type={showConfirm ? "text" : "password"}
                value={form.confirm}
                onChange={handleChange("confirm")}
                label="Confirm Password"
                autoComplete="new-password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      edge="end"
                      size="small"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                      sx={{ color: "#94A3B8", "&:hover": { color: "#64748B" } }}
                    >
                      {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordMismatch && (
                <Typography variant="caption" sx={{ color: "#EF4444", mt: 0.5, ml: 1.75 }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>

            {/* Terms checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  id="register-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  size="small"
                  sx={{
                    color: "#2563EB",
                    "&.Mui-checked": { color: "#0B1F5B" },
                    p: "4px 8px 4px 4px",
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.83rem" }}>
                  I agree to the{" "}
                  <Box
                    component="span"
                    sx={{ color: "#0B1F5B", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  >
                    Terms and Conditions
                  </Box>{" "}
                  and{" "}
                  <Box
                    component="span"
                    sx={{ color: "#0B1F5B", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  >
                    Privacy Policy
                  </Box>
                  .
                </Typography>
              }
              sx={{ mx: 0, alignItems: "flex-start" }}
            />

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              id="register-submit-btn"
              sx={{
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
                "Create Account"
              )}
            </Button>
          </Box>

          {/* ── Sign in link ── */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#64748B", mt: 3, fontSize: "0.85rem" }}
          >
            Already have an account?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{
                color: "#0B1F5B",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign In
            </Box>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}