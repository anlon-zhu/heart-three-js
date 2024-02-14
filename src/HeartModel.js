import React, { useEffect, useState } from 'react';
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
  const { scene } = useThree();
  const [heartClones, setHeartClones] = useState([]);

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
    if (heartRef.current && heartClones.length > 0) {
      heartClones.forEach((clone) => {
        clone.position.x += clone.velocity.x;
        clone.position.y += clone.velocity.y;
        clone.position.z += clone.velocity.z;
        clone.rotation.x += 0.01;
        clone.rotation.y += 0.02;
        clone.rotation.z += 0.01;
      });
    } else if (heartRef.current) {
        heartRef.current.rotation.y += 0.005;
      }
  });

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
            createHeartClones();
          }
        };

        // Start the shrinking animation
        shrinkAndSpin();
      };

      const createHeartClones = () => {
        const numClones = 40; // Number of heart clones
        const newHeartClones = [];

        for (let i = 0; i < numClones; i++) {
          const clone = heartRef.current.clone();
          clone.scale.set(0.3, 0.3, 0.3); // Adjust the scale of the clones
          clone.velocity = {
            x: Math.random() * 0.5 + 0.25 * (Math.random() < 0.5 ? -1 : 1),
            y: Math.random() * 0.5 + 0.25 * (Math.random() < 0.5 ? -1 : 1), // Random Y velocity within a range
            z: Math.random() * 0.5 + 0.25 * (Math.random() < 0.5 ? -1 : 1), // Random Z velocity within a range
          };
          newHeartClones.push(clone);
          scene.add(clone);
        }
        setHeartClones(newHeartClones);
      };

      // Start accelerating the spinning animation
      accelerateSpin();
    }
  }, [explode, scene, heartRef]);

  return null;
};

export default HeartModel;
