import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ModelViewer from './ModelViewer';
import LightPillar from './LightPillar';

const Hero = ({ isDark }) => {
  const container = useRef();
  const [selectedAnim, setSelectedAnim] = useState('slideUp');

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset state
    gsap.set('.hero-text-char', { clearProps: 'all' });
    gsap.set('.hero-sub', { clearProps: 'all' });

    let animConfig = {};

    switch (selectedAnim) {
      case 'slideUp':
        animConfig = { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out', stagger: 0.05 };
        break;
      case 'fadeIn':
        animConfig = { opacity: 0, scale: 0.5, duration: 1.5, ease: 'power2.out', stagger: 0.05 };
        break;
      case 'blurReveal':
        animConfig = { opacity: 0, filter: 'blur(20px)', duration: 1.5, ease: 'power2.out', stagger: 0.05 };
        break;
      case 'elastic':
        animConfig = { y: -150, opacity: 0, duration: 2, ease: 'elastic.out(1, 0.3)', stagger: 0.05 };
        break;
      case 'rotateIn':
        animConfig = { rotateX: -90, opacity: 0, duration: 1.5, ease: 'back.out(1.7)', stagger: 0.05, transformOrigin: "50% 50% -50" };
        break;
      case 'zoomOut':
        animConfig = { scale: 3, opacity: 0, duration: 1.5, ease: 'power3.out', stagger: 0.05 };
        break;
      case 'flipX':
        animConfig = { rotateX: 90, opacity: 0, duration: 1.5, ease: 'power4.out', stagger: 0.05 };
        break;
      case 'cyberGlitch':
        animConfig = {
          x: () => Math.random() * 100 - 50,
          opacity: 0,
          duration: 0.5,
          ease: 'steps(5)',
          stagger: { amount: 0.5, from: "random" }
        };
        break;
      default:
        animConfig = { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out', stagger: 0.05 };
    }

    tl.from('.hero-text-char', animConfig)
      .from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: -1
      });

  }, { scope: container, dependencies: [selectedAnim] });

  return (
    <div ref={container} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">

      {/* Light Pillar Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#5227FF" // Initial color, will cycle
          bottomColor="#7D7D7D" // 125, 125, 125
          intensity={0.8}
          pillarWidth={2.5}
          pillarHeight={0.3}
          glowAmount={0.005}
          noiseIntensity={0.15}
          rotationSpeed={0.2}
          pillarRotation={0}
          mixBlendMode="screen"
          cycleTopColor={true}
        />
      </div>

      {/* Animation Selector (Temporary) */}
      <div className="absolute top-24 right-8 z-50 flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-black dark:text-white">Text Animation</label>
        <select
          value={selectedAnim}
          onChange={(e) => setSelectedAnim(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-black dark:text-white text-xs p-2 rounded outline-none cursor-pointer"
        >
          <option value="slideUp" className="text-black">Slide Up</option>
          <option value="fadeIn" className="text-black">Fade Scale</option>
          <option value="blurReveal" className="text-black">Blur Reveal</option>
          <option value="elastic" className="text-black">Elastic Drop</option>
          <option value="rotateIn" className="text-black">Rotate In</option>
          <option value="zoomOut" className="text-black">Zoom Out</option>
          <option value="flipX" className="text-black">Flip X</option>
          <option value="cyberGlitch" className="text-black">Cyber Glitch</option>
        </select>
      </div>

      {/* Model Layer - z-40: Topmost layer for interaction */}
      <ModelViewer className="z-40" />

      <div className="text-center w-full flex flex-col items-center justify-center text-black dark:text-white z-30 pointer-events-none">

        {/* Top Text - z-30 */}
        <h1 className="relative z-30 flex justify-center text-[10vw] md:text-[11vw] leading-[0.85] font-bold font-oswald uppercase tracking-tighter overflow-hidden">
          {"HI ! I'M KRISH".split('').map((char, i) => (
            <span key={i} className="hero-text-char inline-block whitespace-pre">{char}</span>
          ))}
        </h1>

        {/* Middle Section with descriptions */}
        <div className="relative z-30 flex flex-col md:flex-row justify-between items-center w-full max-w-[90vw] md:max-w-[80vw] my-8 md:my-4 px-4 gap-4">
          <p className="hero-sub text-xs md:text-sm max-w-[200px] text-center md:text-left font-sans font-light opacity-80">
            I've worked with some of the most ambitious brands such as Google, Apple, SpaceX, Amazon, and many more.
          </p>

          {/* Spacer for the model in the middle */}
          <div className="flex-grow h-20 md:h-0"></div>

          <p className="hero-sub text-xs md:text-sm max-w-[200px] text-center md:text-right font-sans font-light opacity-80">
            I've been in the design industry since +15 years. I craft digital products that are useful & enjoyable for the final users.
          </p>
        </div>

        {/* Bottom Text - z-10 */}
        <h1 className="relative z-10 flex justify-center whitespace-nowrap text-[8vw] md:text-[10vw] leading-[0.85] font-bold font-oswald uppercase tracking-tighter overflow-hidden">
          {"SOFTWARE DEVELOPER".split('').map((char, i) => (
            <span key={i} className="hero-text-char inline-block whitespace-pre">{char}</span>
          ))}
        </h1>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center hero-sub text-black dark:text-white z-30 pointer-events-none">
        <p className="text-xs uppercase tracking-widest mb-2">See my work</p>
        <div className="w-[1px] h-12 bg-black dark:bg-white mx-auto"></div>
      </div>
    </div>
  );
};

export default Hero;
