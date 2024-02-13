import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import HeartModel from './HeartModel';
import CameraControls from './CameraControls';
import YesButton from './YesButton';

const HeartScene = () => {
  const heartRef = useRef();
  const [explode, setExplode] = useState(false);

  return (
    <Canvas style={{ background: '#0f161a' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <EffectComposer>
        <HeartModel heartRef={heartRef} explode={explode} />
        <CameraControls />
        <Bloom
          luminanceThreshold={0.7}
          luminanceSmoothing={0.4}
          intensity={2.5}
        />
        <YesButton onClick={() => setExplode(true)} />
      </EffectComposer>
    </Canvas>
  );
};

export default HeartScene;
