import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const FallingLeaves = () => {
  useGSAP(() => {
    // Falling leaves animation
    gsap.to('.leaf', {
      y: '100vh',
      x: '+=50',
      rotation: 720,
      opacity: 0,
      duration: 'random(5, 10)',
      repeat: -1,
      stagger: {
        amount: 10,
        from: 'random'
      },
      ease: 'none',
      modifiers: {
        x: x => `${parseFloat(x) + Math.sin(parseFloat(x) / 50) * 20}px` // Add swaying motion
      }
    });
  });

  // Generate random leaves
  const leaves = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // Random horizontal position %
    y: Math.random() * -20, // Start above screen
    scale: Math.random() * 0.5 + 0.5,
    rotation: Math.random() * 360,
    color: Math.random() > 0.5 ? '#F8BBD0' : '#F48FB1' // Pink shades
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            transform: `scale(${leaf.scale}) rotate(${leaf.rotation}deg)`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C12 2 14 8 20 12C14 16 12 22 12 22C12 22 10 16 4 12C10 8 12 2 12 2Z"
              fill={leaf.color}
              className="opacity-60 dark:opacity-40"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
