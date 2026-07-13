import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Visibility, VisibilityOff, Close, CheckCircle } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <rect x="3" y="9" width="14" height="9" rx="2" />
    <path d="M7 9V6a3 3 0 016 0v3" strokeLinecap="round" />
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

/* Strength indicator */
function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#E5E7EB", "#EF4444", "#F59E0B", "#10B981", "#0B1F5B"];

  if (!password) return null;
  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "flex", gap: 0.5, mb: 0.5 }}>
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 4,
              borderRadius: 4,
              bgcolor: i <= score ? colors[score] : "#E5E7EB",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" sx={{ color: colors[score], fontWeight: 600 }}>
        {labels[score]}
      </Typography>
    </Box>
  );
}

export default function ResetPassword() {
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || "";

  const passwordMismatch = Boolean(confirm && password !== confirm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password) { setError("Please enter a new password."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    // Simulate API call — replace with real call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
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

          <AnimatePresence mode="wait">
            {success ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <CheckCircle sx={{ fontSize: 64, color: "#10B981", mb: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#1E293B", letterSpacing: "-0.3px", mb: 1 }}
                  >
                    Password Reset!
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.6, mb: 3.5 }}>
                    Your password has been successfully reset. You can now log in with your new password.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate("/login")}
                    id="go-to-login-btn"
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
                      transition: "all 0.2s ease",
                    }}
                  >
                    Back to Login
                  </Button>
                </Box>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <Box sx={{ mb: 3.5 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#1E293B", letterSpacing: "-0.3px", mb: 0.75 }}
                  >
                    Reset Password
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.6 }}>
                    Create a strong new password for{" "}
                    {email && (
                      <Box component="span" sx={{ color: "#0B1F5B", fontWeight: 600 }}>
                        {email}
                      </Box>
                    )}
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
                  sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}
                >
                  {/* New password */}
                  <Box>
                    <FormControl fullWidth variant="outlined" sx={fieldSx}>
                      <InputLabel htmlFor="reset-password">New Password</InputLabel>
                      <OutlinedInput
                        id="reset-password"
                        type={showPwd ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="New Password"
                        autoComplete="new-password"
                        startAdornment={
                          <InputAdornment position="start"><LockIcon /></InputAdornment>
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
                    <PasswordStrength password={password} />
                  </Box>

                  {/* Confirm password */}
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
                    <InputLabel htmlFor="reset-confirm">Confirm New Password</InputLabel>
                    <OutlinedInput
                      id="reset-confirm"
                      type={showConfirm ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      label="Confirm New Password"
                      autoComplete="new-password"
                      startAdornment={
                        <InputAdornment position="start"><LockIcon /></InputAdornment>
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

                  {/* Submit */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    id="reset-password-btn"
                    sx={{
                      mt: 0.5,
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
                      : "Reset Password"}
                  </Button>
                </Box>

                {/* Back to login link */}
                <Typography variant="body2" sx={{ textAlign: "center", color: "#64748B", mt: 3, fontSize: "0.85rem" }}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => navigate("/login")}
                    sx={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#0B1F5B",
                      fontWeight: 700,
                      p: 0,
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    ← Back to Login
                  </Box>
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  );
}
