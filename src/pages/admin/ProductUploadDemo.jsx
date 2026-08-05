import React, { useState } from 'react';
import { Box, Button, Typography, Container, CircularProgress, Card, Alert } from '@mui/material';
import { CloudUpload, AutoFixHigh } from '@mui/icons-material';
import { removeBackground } from '@imgly/background-removal';

export default function ProductUploadDemo() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setProcessedImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
    setProgress(0);
  };

  const processImage = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    
    try {
      const blob = await removeBackground(originalImage, {
        // Progress can be tracked here for model downloading
        progress: (_key, current, total) => {
          if (!total) return;
          setProgress(Math.round((current / total) * 100));
        },
      });
      
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error('Error removing background:', err);
      setError('Failed to process image. Make sure you are connected to the internet to download the AI models on first run.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, mt: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Product AI Background Removal
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Upload any image to test the in-browser WebAssembly AI model.
        </Typography>
      </Box>

      <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        
        {/* Upload Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mb: 4 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            Select Product Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          {error && <Alert severity="error">{error}</Alert>}
        </Box>

        {/* Results Section */}
        {originalImage && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
            
            {/* Original */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight={700} textAlign="center">Original Upload</Typography>
              <Box sx={{ 
                height: 400, 
                bgcolor: '#f1f1f1', 
                borderRadius: 4, 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img src={originalImage} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={processImage}
                disabled={isProcessing || processedImage}
                startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <AutoFixHigh />}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {isProcessing ? `Processing AI Model... ${progress ? progress + '%' : ''}` : 'Remove Background'}
              </Button>
            </Box>

            {/* Processed */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight={700} textAlign="center">Processed Result</Typography>
              <Box sx={{ 
                height: 400, 
                // Using the exact cream gradient from ProductCard.jsx
                background: 'linear-gradient(135deg, #faf9f7 0%, #f5f3f0 50%, #faf9f7 100%)',
                borderRadius: 4, 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                {processedImage ? (
                  <img src={processedImage} alt="Processed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '12px' }} />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {isProcessing ? 'Removing background (this takes a few seconds on first run)...' : 'Awaiting processing...'}
                  </Typography>
                )}
              </Box>

              {processedImage && (
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  Successfully removed background! The image is now a transparent PNG sitting perfectly on the product card gradient.
                </Alert>
              )}
            </Box>

          </Box>
        )}
      </Card>
      
      <Box sx={{ mt: 4 }}>
        <Alert severity="info">
          <strong>Note on Production Use:</strong> This demo downloads a ~40MB AI model to your browser. In a real-world scenario, this is perfect for an Admin Panel where an employee uploads images. For the public-facing storefront, it is better to process images on the server-side to save bandwidth for mobile shoppers.
        </Alert>
      </Box>

    </Container>
  );
}
