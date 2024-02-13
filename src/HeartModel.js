import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';

const textureCube = new CubeTextureLoader().load([
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
    'crystal.jpg',
  ]);

const HeartModel = ({ heartRef, explode }) => {
  const {scene } = useThree();

  // Load the heart model and its texture
  useEffect(() => {
    const objLoader = new OBJLoader();
    objLoader.load('/Love.obj', (obj) => {
      const material = new THREE.MeshBasicMaterial({
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
  }, [scene, heartRef]);

  // Rotate the heart
  useFrame(() => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.005;
    }
  });


// Shrink and spin animation when explode prop is true
useEffect(() => {
    let rotationSpeed = 0.1;
    const maxRotationSpeed = 0.7; // Maximum rotation speed
    const acceleration = 0.005;
    
    if (explode && heartRef.current) {
      const accelerateSpin = () => {
        if (rotationSpeed < maxRotationSpeed) {
          rotationSpeed += acceleration;
          heartRef.current.rotation.y += rotationSpeed;
          requestAnimationFrame(accelerateSpin);
        } else {
          // Start the shrinking animation after max rotation speed
          startShrinkAnimation();
        }
      };
  
      const startShrinkAnimation = () => {
        const shrinkAndSpin = () => {
          if (heartRef.current.scale.x > 0) {
            heartRef.current.scale.subScalar(0.02); // Reduce scale gradually
            heartRef.current.rotation.y += rotationSpeed; // Maintain spin speed
            requestAnimationFrame(shrinkAndSpin);
          } else {
            // Remove the heart after shrinking animation
            scene.remove(heartRef.current);
          }
        };
  
        // Start the shrinking animation
        shrinkAndSpin();
      };
  
      // Start accelerating the spinning animation
      accelerateSpin();
    }
  }, [explode, scene, heartRef]);
  
  

  return null;
};

export default HeartModel;
