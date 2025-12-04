import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import FuzzyText from './FuzzyText';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from('nav', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Certificates', path: '/#certificates' },
    { name: 'Resume', path: '/#resume' },
    { name: 'About Me', path: '/#about-me' },
    { name: 'Contact', path: '/#contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-6 z-50 text-white bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
          <Link to="/">
            <FuzzyText
              baseIntensity={0.05}
              fontSize="2rem"
              fontWeight={700}
              fontFamily="Oswald"
              color="#e9e9e9ff"
              enableHover={true}
            >
              KRI$H
            </FuzzyText>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.name} className="relative group cursor-pointer">
              {link.path.startsWith('/') && !link.path.includes('#') ? (
                <Link to={link.path} className="text-sm uppercase tracking-widest font-light opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.name}
                </Link>
              ) : (
                <a href={link.path} className="text-sm uppercase tracking-widest font-light opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.name}
                </a>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-8 text-white p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <ul className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <li key={link.name} className="cursor-pointer">
                {link.path.startsWith('/') && !link.path.includes('#') ? (
                  <Link
                    to={link.path}
                    className="text-2xl uppercase tracking-widest font-oswald font-light text-white hover:text-purple-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.path}
                    className="text-2xl uppercase tracking-widest font-oswald font-light text-white hover:text-purple-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
