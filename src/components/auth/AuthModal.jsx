import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog, DialogContent, Box, Typography, Button, Tab, Tabs,
  IconButton, InputAdornment, Alert, CircularProgress,
  OutlinedInput, InputLabel, FormControl, Checkbox,
  FormControlLabel, Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavbar } from '../../context/NavbarContext';

/* ─── Inline SVG icons ───────────────────────────────────────── */
const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="17" height="17">
    <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" />
    <path d="M2.5 6l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="17" height="17">
    <rect x="3" y="9" width="14" height="9" rx="2" />
    <path d="M7 9V6a3 3 0 016 0v3" strokeLinecap="round" />
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="17" height="17">
    <circle cx="10" cy="7" r="3" />
    <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" strokeLinecap="round" />
  </svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

/* ─── Shared field style ─────────────────────────────────────── */
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#F8FAFC',
    fontSize: '0.88rem',
    '& fieldset': { borderColor: '#E5E7EB' },
    '&:hover fieldset': { borderColor: '#2563EB' },
    '&.Mui-focused fieldset': { borderColor: '#0B1F5B', borderWidth: '1.5px' },
    '&.Mui-focused': { backgroundColor: '#fff' },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.82rem', color: '#64748B',
    '&.Mui-focused': { color: '#0B1F5B' },
  },
  '& .MuiInputAdornment-root svg': { color: '#94A3B8' },
};

const btnSx = {
  py: 1.5, borderRadius: '10px', bgcolor: '#0B1F5B',
  fontWeight: 600, fontSize: '0.92rem', textTransform: 'none', boxShadow: 'none',
  '&:hover': { bgcolor: '#18317A', boxShadow: '0 4px 16px rgba(26,43,75,0.22)', transform: 'translateY(-1px)' },
  '&:active': { transform: 'translateY(0)' },
  '&:disabled': { bgcolor: '#0B1F5B', opacity: 0.6 },
  transition: 'all 0.2s ease',
};

const socialBtnSx = {
  py: 1.25, borderRadius: '10px', borderColor: '#E5E7EB',
  color: '#1E293B', fontWeight: 500, fontSize: '0.88rem', textTransform: 'none',
  '&:hover': { borderColor: '#2563EB', bgcolor: '#f9fafb', transform: 'translateY(-1px)' },
  '&:active': { transform: 'translateY(0)' },
  transition: 'all 0.2s ease',
};

/* ═══════════════════════════════════════════════════════════════
   LOGIN PANEL
═══════════════════════════════════════════════════════════════ */
function LoginPanel({ onSwitch, onClose }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const { login, loading }      = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill all fields.'); return; }
    const result = await login(email, password);
    if (result.success) { onClose(); navigate('/'); }
    else setError(result.error || 'Login failed. Please try again.');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E293B', letterSpacing: '-0.3px', mb: 0.5 }}>
          Welcome Back
        </Typography>
  
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.82rem' }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth variant="outlined" sx={fieldSx}>
          <InputLabel htmlFor="modal-login-email">Email Address</InputLabel>
          <OutlinedInput
            id="modal-login-email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} label="Email Address"
            autoComplete="email"
            startAdornment={<InputAdornment position="start"><EmailIcon /></InputAdornment>}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={fieldSx}>
          <InputLabel htmlFor="modal-login-password">Password</InputLabel>
          <OutlinedInput
            id="modal-login-password" type={showPwd ? 'text' : 'password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            label="Password" autoComplete="current-password"
            startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPwd(!showPwd)} edge="end" size="small"
                  sx={{ color: '#94A3B8', '&:hover': { color: '#64748B' } }}>
                  {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Forgot password */}
        <Box sx={{ textAlign: 'right', mt: -1 }}>
          <Typography component="button" type="button" onClick={() => { onClose(); navigate('/forgot-password'); }}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: '0.82rem', p: 0, '&:hover': { color: '#0B1F5B', textDecoration: 'underline' } }}>
            Forgot password?
          </Typography>
        </Box>

        <Button type="submit" fullWidth variant="contained" disabled={loading} id="modal-login-submit" sx={btnSx}>
          {loading ? <CircularProgress size={19} thickness={3} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : 'Sign In'}
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2.5 }}>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</Typography>
      </Divider>

      {/* Social */}
      <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} id="modal-google-login" sx={socialBtnSx}>
        Continue with Google
      </Button>

      {/* Switch */}
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748B', mt: 2, fontSize: '0.84rem' }}>
        Don't have an account?{' '}
        <Box component="span" onClick={onSwitch}
          sx={{ color: '#0B1F5B', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Create Account
        </Box>
      </Typography>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REGISTER PANEL
═══════════════════════════════════════════════════════════════ */
function RegisterPanel({ onSwitch, onClose }) {
  const [form, setForm]             = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [error, setError]           = useState('');
  const { register, loading }       = useAuth();
  const navigate                    = useNavigate();

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (!agreed) { setError('Please agree to the Terms and Conditions.'); return; }
    const result = await register(form);
    if (result.success) { onClose(); navigate('/'); }
    else setError('Registration failed. Please try again.');
  };

  const mismatch = Boolean(form.confirm && form.password !== form.confirm);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E293B', letterSpacing: '-0.3px', mb: 0.5 }}>
          Create Account
        </Typography>

      </Box>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.82rem' }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
        <FormControl fullWidth variant="outlined" sx={fieldSx}>
          <InputLabel htmlFor="modal-reg-name">Full Name</InputLabel>
          <OutlinedInput id="modal-reg-name" value={form.name} onChange={handleChange('name')} label="Full Name" autoComplete="name"
            startAdornment={<InputAdornment position="start"><PersonIcon /></InputAdornment>} />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={fieldSx}>
          <InputLabel htmlFor="modal-reg-email">Email Address</InputLabel>
          <OutlinedInput id="modal-reg-email" type="email" value={form.email} onChange={handleChange('email')} label="Email Address" autoComplete="email"
            startAdornment={<InputAdornment position="start"><EmailIcon /></InputAdornment>} />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={fieldSx}>
          <InputLabel htmlFor="modal-reg-password">Password</InputLabel>
          <OutlinedInput id="modal-reg-password" type={showPwd ? 'text' : 'password'} value={form.password}
            onChange={handleChange('password')} label="Password" autoComplete="new-password"
            startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPwd(!showPwd)} edge="end" size="small"
                  sx={{ color: '#94A3B8', '&:hover': { color: '#64748B' } }}>
                  {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            } />
        </FormControl>

        <FormControl fullWidth variant="outlined" error={mismatch} sx={{ ...fieldSx, ...(mismatch && { '& .MuiOutlinedInput-root': { ...fieldSx['& .MuiOutlinedInput-root'], '& fieldset': { borderColor: '#EF4444' } } }) }}>
          <InputLabel htmlFor="modal-reg-confirm">Confirm Password</InputLabel>
          <OutlinedInput id="modal-reg-confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm}
            onChange={handleChange('confirm')} label="Confirm Password" autoComplete="new-password"
            startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" size="small"
                  sx={{ color: '#94A3B8', '&:hover': { color: '#64748B' } }}>
                  {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            } />
          {mismatch && <Typography variant="caption" sx={{ color: '#EF4444', mt: 0.5, ml: 1.75 }}>Passwords do not match</Typography>}
        </FormControl>

        <FormControlLabel
          control={<Checkbox id="modal-reg-terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} size="small"
            sx={{ color: '#2563EB', '&.Mui-checked': { color: '#0B1F5B' }, p: '4px 8px 4px 4px' }} />}
          label={
            <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.82rem' }}>
              I agree to the{' '}
              <Box component="span" sx={{ color: '#0B1F5B', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Terms & Conditions</Box>
              {' '}and{' '}
              <Box component="span" sx={{ color: '#0B1F5B', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Box>.
            </Typography>
          }
          sx={{ mx: 0, alignItems: 'flex-start' }}
        />

        <Button type="submit" fullWidth variant="contained" disabled={loading} id="modal-register-submit" sx={btnSx}>
          {loading ? <CircularProgress size={19} thickness={3} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : 'Create Account'}
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2.5 }}>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</Typography>
      </Divider>

      {/* Google */}
      <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} id="modal-google-register" sx={socialBtnSx}>
        Sign up with Google
      </Button>

      {/* Switch */}
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748B', mt: 2, fontSize: '0.84rem' }}>
        Already have an account?{' '}
        <Box component="span" onClick={onSwitch}
          sx={{ color: '#0B1F5B', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Sign In
        </Box>
      </Typography>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AUTH MODAL  (main export)
═══════════════════════════════════════════════════════════════ */
export default function AuthModal() {
  const { authModalOpen, authModalTab, setAuthModalOpen, setAuthModalTab } = useNavbar();

  const handleClose = () => setAuthModalOpen(false);
  const switchToRegister = () => setAuthModalTab('register');
  const switchToLogin    = () => setAuthModalTab('login');

  return (
    <Dialog
      open={authModalOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
          border: '1px solid #E5E7EB',
          overflow: 'visible',
        },
      }}
      BackdropProps={{
        sx: { backdropFilter: 'blur(4px)', bgcolor: 'rgba(15,23,42,0.45)' },
      }}
    >
      <DialogContent sx={{ p: { xs: '28px 22px 24px', sm: '36px 36px 28px' }, position: 'relative' }}>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          size="small"
          aria-label="Close"
          sx={{
            position: 'absolute', top: 14, right: 14,
            color: '#94A3B8', bgcolor: '#F8FAFC', border: '1px solid #E5E7EB',
            '&:hover': { bgcolor: '#EAF2FF', color: '#64748B' },
            transition: 'all 0.15s ease',
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {/* Tabs */}
        <Tabs
          value={authModalTab}
          onChange={(_, v) => setAuthModalTab(v)}
          sx={{
            mb: 3,
            minHeight: 36,
            '& .MuiTabs-indicator': { bgcolor: '#0B1F5B', height: 2.5, borderRadius: 2 },
            '& .MuiTab-root': {
              textTransform: 'none', fontWeight: 600, fontSize: '0.88rem',
              minHeight: 36, px: 0, mr: 3, color: '#94A3B8',
              '&.Mui-selected': { color: '#0B1F5B' },
            },
          }}
        >
          <Tab label="Sign In" value="login" id="modal-tab-login" />
          <Tab label="Create Account" value="register" id="modal-tab-register" />
        </Tabs>

        {/* Animated panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={authModalTab}
            initial={{ opacity: 0, x: authModalTab === 'login' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: authModalTab === 'login' ? 16 : -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {authModalTab === 'login'
              ? <LoginPanel onSwitch={switchToRegister} onClose={handleClose} />
              : <RegisterPanel onSwitch={switchToLogin} onClose={handleClose} />
            }
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
