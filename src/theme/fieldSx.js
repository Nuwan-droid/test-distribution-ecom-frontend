/**
 * Shared MUI OutlinedInput field styling — OneRoutes brand palette
 * Import this into any page that uses FormControl + OutlinedInput
 */
export const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#F8FAFC",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#2563EB" },
    "&.Mui-focused fieldset": { borderColor: "#2563EB", borderWidth: "1.5px" },
    "&.Mui-focused": { backgroundColor: "#FFFFFF" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.82rem",
    color: "#64748B",
    "&.Mui-focused": { color: "#2563EB" },
  },
  "& .MuiInputAdornment-root svg": { color: "#94A3B8" },
};

/** Deep Navy button sx — primary action buttons */
export const navyBtnSx = {
  py: 1.6,
  borderRadius: "10px",
  bgcolor: "#0B1F5B",
  fontWeight: 600,
  fontSize: "0.95rem",
  textTransform: "none",
  boxShadow: "none",
  color: "#FFFFFF",
  "&:hover": {
    bgcolor: "#18317A",
    boxShadow: "0 4px 16px rgba(11,31,91,0.25)",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  "&:disabled": { bgcolor: "#0B1F5B", opacity: 0.6 },
  transition: "all 0.2s ease",
};

/** Outlined social / secondary button sx */
export const outlinedBtnSx = {
  py: 1.4,
  borderRadius: "10px",
  borderColor: "#E5E7EB",
  color: "#1E293B",
  fontWeight: 500,
  fontSize: "0.9rem",
  textTransform: "none",
  "&:hover": {
    borderColor: "#2563EB",
    bgcolor: "#EAF2FF",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  transition: "all 0.2s ease",
};

/** Close icon button sx */
export const closeIconBtnSx = {
  position: "absolute",
  top: 14,
  right: 14,
  color: "#94A3B8",
  bgcolor: "#F8FAFC",
  border: "1px solid #E5E7EB",
  "&:hover": { bgcolor: "#EAF2FF", color: "#1E293B" },
  transition: "all 0.15s ease",
};
