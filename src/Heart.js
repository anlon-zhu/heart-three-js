import React, { useRef, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import YesButton from './YesButton';

extend({ OrbitControls });

const HeartModel = ({ heartRef, textureCube }) => {
  const { scene } = useThree();

  useEffect(() => {
    const objLoader = new OBJLoader();
    objLoader.load('/Love.obj', (obj) => {
      const material = new THREE.MeshBasicMaterial(
        {
            color: 0xffffff,
            envMap: textureCube,
            transparent: true, 
            refractionRatio: 0.9,
            reflectivity: 0.9,
            blending: THREE.AdditiveBlending,
        });

      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      obj.rotation.y = Math.PI; // Rotate the heart if needed
      heartRef.current = obj;
      scene.add(obj);
    });
  }, [scene, heartRef, textureCube]);

  useFrame(() => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.005; // Adjust rotation speed as needed
    }
  });

  return null;
};

const CameraControls = () => {
  const { camera, gl: { domElement }, scene } = useThree();
  const controls = useRef();
  useFrame(() => controls.current && controls.current.update());

  // Set camera position and controls target to center the heart
  useEffect(() => {
    camera.position.set(0, 40, 150); // Adjust as needed
    controls.current.target.set(0, 30, 0); // Adjust as needed
    controls.current.update();
  }, [camera, scene]);

  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const HeartScene = () => {
  const heartRef = useRef();
  const textureCube = new CubeTextureLoader().load([
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
  ]);

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log('Yes button clicked!');
  };

  return (
    <Canvas style={{ background: '#0f161a' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      {/* Wrap the scene and effects within EffectComposer */}
      <EffectComposer>
        <HeartModel heartRef={heartRef} textureCube={textureCube} />
        <CameraControls />
        {/* Configure the Bloom effect */}
        <Bloom
          luminanceThreshold={0.7}
          luminanceSmoothing={0.4}
          intensity={2.5}
        />
        {/* Add the Yes button */}
        <YesButton onClick={handleButtonClick} />
      </EffectComposer>
    </Canvas>
  );
};

export default HeartScene;
