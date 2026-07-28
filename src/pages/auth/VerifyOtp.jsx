import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";

const OTP_LENGTH = 4;

export default function VerifyOtp() {
  const [otp, setOtp]       = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef([]);
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || "your email";

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer === 0) return;
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;            // digits only
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { if (i < OTP_LENGTH) next[i] = ch; });
    setOtp(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < OTP_LENGTH) { setError("Please enter the complete OTP."); return; }
    setLoading(true);
    // Simulate API verification — replace with real call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate("/reset-password", { state: { email, otp: code } });
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(30);
    inputsRef.current[0]?.focus();
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
            p: { xs: "28px 22px", sm: "44px 36px 36px" },
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* Close */}
          <IconButton
            onClick={() => navigate("/forgot-password")}
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
          <Box sx={{ mb: 3.5, textAlign: "center" }}>
            {/* Mail icon illustration */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "16px",
                bgcolor: "#EAF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0B1F5B" strokeWidth="1.8" width="28" height="28">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1E293B", letterSpacing: "-0.3px", mb: 1 }}
            >
              Verify OTP
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.6 }}>
              Enter the 4-digit OTP sent to{" "}
              <Box component="span" sx={{ color: "#0B1F5B", fontWeight: 600 }}>
                {email}
              </Box>
              .<br />Please check your inbox.
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px", fontSize: "0.82rem" }}>
              {error}
            </Alert>
          )}

          {/* OTP input boxes */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1.5, sm: 2 },
                mb: 3.5,
              }}
              onPaste={handlePaste}
            >
              {otp.map((digit, idx) => (
                <Box
                  key={idx}
                  component="input"
                  id={`otp-input-${idx}`}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  sx={{
                    width: { xs: 56, sm: 64 },
                    height: { xs: 56, sm: 64 },
                    textAlign: "center",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#1E293B",
                    fontFamily: "Montserrat, sans-serif",
                    bgcolor: digit ? "#ffffff" : "#F8FAFC",
                    border: digit ? "2px solid #0B1F5B" : "1.5px solid #E5E7EB",
                    borderRadius: "12px",
                    outline: "none",
                    caretColor: "#0B1F5B",
                    transition: "all 0.15s ease",
                    "&:focus": {
                      border: "2px solid #0B1F5B",
                      bgcolor: "#ffffff",
                      boxShadow: "0 0 0 3px rgba(26,43,75,0.08)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Verify button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              id="verify-otp-btn"
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
                : "Verify OTP"}
            </Button>
          </Box>

          {/* Resend */}
          <Typography variant="body2" sx={{ textAlign: "center", color: "#64748B", mt: 2.5, fontSize: "0.85rem" }}>
            Didn't receive the code?{" "}
            {resendTimer > 0 ? (
              <Box component="span" sx={{ color: "#94A3B8", fontWeight: 500 }}>
                Resend in {resendTimer}s
              </Box>
            ) : (
              <Box
                component="button"
                type="button"
                onClick={handleResend}
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
                Resend OTP
              </Box>
            )}
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
