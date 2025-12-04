import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, useAnimations, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ setAnimNames, selectedAnim, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Krish_Model_2.glb');
  const { actions, names, mixer } = useAnimations(animations, group);

  // State for falling entry
  const [isFallingEntry, setIsFallingEntry] = useState(true);
  const targetY = -2.5;
  const startY = 10;

  // Expose animation names to parent
  useEffect(() => {
    if (setAnimNames) setAnimNames(names);
  }, [names, setAnimNames]);

  // Handle manual animation selection
  useEffect(() => {
    if (selectedAnim && actions[selectedAnim]) {
      console.log('Playing selected animation:', selectedAnim);
      setIsFallingEntry(false); // Disable falling entry if manual selection
      mixer.stopAllAction();
      const action = actions[selectedAnim];
      action.reset().fadeIn(0.2).play();
      action.setLoop(THREE.LoopRepeat);

      // Reset position if manual selection
      if (group.current) group.current.position.y = targetY;
    }
  }, [selectedAnim, actions, mixer]);

  // Falling Entry Logic
  useFrame((state, delta) => {
    if (isFallingEntry && !selectedAnim && group.current) {
      // Move down
      group.current.position.y -= delta * 8; // Adjust speed here

      // Check if landed
      if (group.current.position.y <= targetY) {
        group.current.position.y = targetY;
        setIsFallingEntry(false);

        // Just keep falling animation playing (hovering effect)
      }
    }
  });

  // Initial Setup for Falling Entry
  useEffect(() => {
    if (selectedAnim) return;

    // Prioritize specific "Falling" animation
    const fallAnim = names.find(n => n === 'Falling') || names.find(n => n.toLowerCase().includes('fall')) || names[0];
    const fallAction = actions[fallAnim];

    if (fallAction) {
      // Start with falling animation
      mixer.stopAllAction();
      fallAction.reset().play();
      fallAction.setLoop(THREE.LoopRepeat);

      // Set initial position
      if (group.current) group.current.position.y = startY;
    }
  }, [actions, names, mixer, selectedAnim]);

  return <primitive object={scene} ref={group} {...props} />;
};

const ModelViewer = ({ className }) => {
  const [animNames, setAnimNames] = useState([]);
  const [selectedAnim, setSelectedAnim] = useState(null);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [-3.88, 0, 7.00], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={4} />
        <Environment preset="city" />
        <Model
          scale={2.2}
          position={[0, -2.5, 0]}
          setAnimNames={setAnimNames}
          selectedAnim={selectedAnim}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>


    </div>
  );
};

export default ModelViewer;
