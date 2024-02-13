import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const YesButton = ({ onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const hoverCounterRef = useRef(0);
  const hoverAmplitude = 0.7;
  const hoverFrequency = 0.75;
  const initialPosition = [0, 35, 80];
  const textureCube = new CubeTextureLoader().load([
    // Consider using a high-quality cube map here
    'metal.png', 'metal.png', 'metal.png', 
    'metal.png', 'metal.png', 'metal.png',
  ]);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      if (hovered) {
        const yPos = Math.sin(hoverCounterRef.current) * hoverAmplitude;
        meshRef.current.position.y = yPos + initialPosition[1];
        hoverCounterRef.current += hoverFrequency;
      } else {
        meshRef.current.position.y = initialPosition[1];
        hoverCounterRef.current = 0;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <primitive object={createButtonGeometry()} />
      <meshStandardMaterial
        metalness={1} // Full metallic effect
        roughness={0.2} // Low roughness for shininess
        envMap={textureCube}
      />
      <Text
        position={[0, 0, 2]}
        fontSize={20}
        color={hovered ? '#ffdbf9' : '#171717'}
      >
        Yes
      </Text>
    </mesh>
  );
};

const createButtonGeometry = () => {
  const roundedRectShape = new THREE.Shape();

  const width = 80; // Adjust the width of the rectangle
  const height = 30; // Adjust the height of the rectangle
  const radius = 5; // Adjust the radius of the corners

  roundedRectShape.moveTo(-width / 2 + radius, -height / 2);
  roundedRectShape.lineTo(width / 2 - radius, -height / 2);
  roundedRectShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  roundedRectShape.lineTo(width / 2, height / 2 - radius);
  roundedRectShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  roundedRectShape.lineTo(-width / 2 + radius, height / 2);
  roundedRectShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
  roundedRectShape.lineTo(-width / 2, -height / 2 + radius);
  roundedRectShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

  const extrudeSettings = {
    depth: 5, // Adjust the depth of extrusion
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };

  const geometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  geometry.rotateY(Math.PI); // Flip the geometry to face the camera

  return geometry;
};

export default YesButton;
