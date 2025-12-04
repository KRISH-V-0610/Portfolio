import React from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = ({ isDark, setIsDark }) => {
  useGSAP(() => {
    gsap.from('nav', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-8 z-50 mix-blend-difference text-white">
      <div className="text-2xl font-bold tracking-tighter uppercase font-oswald">
        KRISH
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        <Menu className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" />
      </div>
    </nav>
  );
};

export default Navbar;
