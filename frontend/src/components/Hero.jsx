import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import ModelViewer from './ModelViewer';
import LightPillar from './LightPillar';
import Shuffle from './Shuffle';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset state
    gsap.set('.hero-sub', { clearProps: 'all' });

    tl.from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5
    });

  }, { scope: container });

  const getCycleColor = () => {
    const t = performance.now() / 1000;
    const hue = (t * 0.12) % 1;
    return new THREE.Color().setHSL(hue, 1.0, 0.5).getStyle();
  };

  return (
    <div ref={container} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">

      {/* Light Pillar Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#5227FF" // Initial color, will cycle
          bottomColor="#7D7D7D" // 125, 125, 125
          intensity={0.5}
          pillarWidth={2.5}
          pillarHeight={0.3}
          glowAmount={0.003}
          noiseIntensity={0.15}
          rotationSpeed={0.2}
          pillarRotation={270}
          mixBlendMode="screen"
          cycleTopColor={true}
        />
      </div>

      {/* Model Layer - z-40: Topmost layer for interaction */}
      <ModelViewer className="z-40" />

      <div className="text-center w-full flex flex-col items-center justify-center text-black dark:text-white z-30 pointer-events-none">

        {/* Top Text - z-30 */}
        <div className="relative z-30 flex justify-center py-4 pointer-events-auto">
          <Shuffle
            text="HI! I'M KRISH"
            className="text-[clamp(3rem,11vw,10rem)] leading-[0.85] font-bold font-oswald uppercase tracking-tight"
            shuffleDirection="right"
            duration={1.5}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            colorFrom={getCycleColor}
            colorTo="#ffffff"
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="h1"
          />
        </div>

        {/* Middle Section with descriptions */}
        <div className="relative z-30 flex flex-col md:flex-row justify-between items-center w-full max-w-[90vw] md:max-w-[80vw] my-8 md:my-4 px-4 gap-4">
          <p className="hero-sub text-xs md:text-sm max-w-[200px] text-justify font-light opacity-80"
            style={{ fontFamily: 'Antonio' }}>
            A Full Stack Engineer with a passion for AI and Web3D, bridging the gap between intelligent backend logic and immersive, <span className='block text-center'>interactive user experiences.</span>
          </p>

          {/* Spacer for the model in the middle */}
          <div className="flex-grow h-20 md:h-0"></div>

          <p className="hero-sub text-xs md:text-sm max-w-[200px] text-justify font-light opacity-80" style={{ fontFamily: 'Antonio' }}>
            National Runner-up at ISRO’s Hackathon and a relentless problem solver. I thrive in high stakes, turning ambitious ideas into <span className='block text-center'>award-winning solutions.</span>
          </p>
        </div>

        {/* Bottom Text - z-10 */}
        <div className="relative z-10 flex justify-center py-4 pointer-events-auto">
          <Shuffle
            text="SOFTWARE    DEVELOPER"
            className="whitespace-normal md:whitespace-nowrap text-[clamp(1.5rem,10vw,9rem)] leading-[0.85] font-bold uppercase tracking-tight transition-all duration-300"
            style={{ fontFamily: 'Antonio' }}
            shuffleDirection="left"
            duration={1.5}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            colorFrom={getCycleColor}
            colorTo="#ffffff"
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="h1"
          />
        </div>
      </div>


    </div>
  );
};

export default Hero;
