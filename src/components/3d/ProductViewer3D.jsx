import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Bounds } from '@react-three/drei';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ViewInAr } from '@mui/icons-material';

// Point drei's GLTF loader at the Draco decoder files in /public/draco/
// This enables Draco-compressed GLBs (up to 10× smaller) to load correctly.
useGLTF.setDecoderPath('/draco/');

/**
 * Preload a GLB file in the background so it is already in browser cache
 * by the time the user clicks the 3D thumbnail.
 */
export function preloadModel(url) {
  if (url) useGLTF.preload(url);
}

/* ─── Model loader ────────────────────────────────────────────────────────── */
// Lives inside <Bounds> so drei can measure its bounding box and fit the camera.
// NOTE: We do NOT rotate the model via useFrame here — that would shift the
// bounding box every frame and cause Bounds to re-fit constantly.
// Camera orbit (OrbitControls autoRotate) achieves the same visual effect
// without touching the model transform.
function ModelWithNotify({ url, onLoaded }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    onLoaded?.();
  }, [url, scene, onLoaded]);

  return <primitive object={scene} />;
}

/* ─── Scene contents (inside Canvas) ─────────────────────────────────────── */
// Separated so it can use @react-three/fiber hooks (useThree, etc.)
function SceneContents({ modelUrl, autoRotate, onLoaded }) {
  const orbitRef = useRef();

  return (
    <>
      {/* Lighting — replaces Stage so we control it independently */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 4]}  intensity={1.4} castShadow />
      <directionalLight position={[-4, -2, -4]} intensity={0.25} />
      <directionalLight position={[0, -4, 0]}  intensity={0.1} />

      {/* Image-based lighting for realistic reflections */}
      <Environment preset="city" />

      {/*
        Bounds — the key component for auto-fit:
        • fit   : repositions camera so the model fills the view on mount
        • clip  : sets camera near/far to the model's actual depth range
        • observe: re-fits if the model's bounding box changes (e.g. animation)
        • margin: padding factor — 1.2 = 20% air around the model
      */}
      <Bounds fit clip observe margin={1.2}>
        <Suspense fallback={null}>
          <ModelWithNotify url={modelUrl} onLoaded={onLoaded} />
        </Suspense>
      </Bounds>

      {/*
        OrbitControls with autoRotate — orbits the CAMERA, not the model,
        so the bounding box stays stable and Bounds doesn't re-fit constantly.
        minDistance/maxDistance are relative to the fitted camera distance.
      */}
      <OrbitControls
        ref={orbitRef}
        autoRotate={autoRotate}
        autoRotateSpeed={1.4}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        zoomSpeed={0.8}
        // No fixed minDistance/maxDistance — Bounds sets the right scale
      />
    </>
  );
}

/* ─── Loading overlay ─────────────────────────────────────────────────────── */
function CanvasFallback() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        bgcolor: 'rgba(245,247,250,0.9)',
        backdropFilter: 'blur(6px)',
        borderRadius: 'inherit',
        zIndex: 2,
      }}
    >
      <CircularProgress size={36} thickness={3} sx={{ color: '#111' }} />
      <Typography variant="caption" sx={{ color: '#555', fontWeight: 600, letterSpacing: 1 }}>
        Loading 3D model…
      </Typography>
    </Box>
  );
}

/* ─── Error state ─────────────────────────────────────────────────────────── */
function ModelError() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        bgcolor: '#fafafa',
        borderRadius: 'inherit',
        color: '#888',
      }}
    >
      <ViewInAr sx={{ fontSize: 40, opacity: 0.35 }} />
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        3D preview unavailable
      </Typography>
    </Box>
  );
}



/* ─── Main exported component ─────────────────────────────────────────────── */
/**
 * ProductViewer3D
 * @param {string}  modelUrl   - path to .glb  (e.g. "/models/headphones.glb")
 * @param {any}     height     - canvas height — px number or MUI responsive object
 * @param {boolean} autoRotate - whether camera auto-orbits when idle (default true)
 */
export default function ProductViewer3D({ modelUrl, height = 420, autoRotate = true }) {
  const [modelReady, setModelReady] = useState(false);

  if (!modelUrl) return <ModelError />;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 2,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 30%, #e8edf5 0%, #f5f7fa 100%)',
      }}
    >
      {/*
        Canvas — no fixed camera position here.
        Bounds inside SceneContents will move the camera to fit the model.
        fov: 45 is standard; Bounds adjusts distance, not fov.
      */}
      <Canvas
        camera={{ fov: 45, near: 0.01, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
        style={{ width: '100%', height: '100%' }}
        onCreated={() => setModelReady(false)}
      >
        <SceneContents
          modelUrl={modelUrl}
          autoRotate={autoRotate}
          onLoaded={() => setModelReady(true)}
        />
      </Canvas>

      {/* Loading overlay */}
      {!modelReady && <CanvasFallback />}
    </Box>
  );
}
