import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

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

export default CameraControls;
