import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ElectricBorder from './ElectricBorder';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1. This is a detailed description of the first project, highlighting the key features and technologies used.",
    color: "#FF5733"
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2. A brief overview of the second project, focusing on the design challenges and solutions.",
    color: "#33FF57"
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of Project 3. An in-depth look at the third project, showcasing the performance optimizations and user experience enhancements.",
    color: "#3357FF"
  },
  {
    id: 4,
    title: "Project 4",
    description: "Description of Project 4. The final project in the portfolio, demonstrating full-stack development capabilities and system architecture.",
    color: "#F333FF"
  }
];

const Projects = () => {
  const container = useRef();

  useGSAP(() => {
    const items = gsap.utils.toArray('.project-item');

    items.forEach((item, i) => {
      gsap.from(item, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        }
      });
    });

  }, { scope: container });

  return (
    <div id="projects" ref={container} className="relative w-full min-h-screen py-20 px-4 md:px-10 overflow-hidden transition-colors duration-500">

      {/* Header */}
      <div className="flex justify-center mb-20">
        <h2 className="text-5xl md:text-7xl font-oswald font-bold uppercase text-black dark:text-white tracking-widest transition-colors duration-500">
          Projects
        </h2>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-20 md:gap-32 max-w-7xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-item flex flex-col md:flex-row items-center w-full gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >

            {/* Card Side */}
            <div className="w-full md:w-5/12 flex justify-center">
              <ElectricBorder
                color={project.color}
                speed={2}
                chaos={0.3}
                thickness={2}
                style={{ borderRadius: 0 }}
                className="w-full max-w-xs aspect-[4/5] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shadow-lg"
              >
                <div className="text-center p-4">
                  <p className="font-oswald uppercase text-lg text-black dark:text-white opacity-60">
                    Link {project.id} for {project.title}
                  </p>
                  <p className="text-xs text-black dark:text-white opacity-40 mt-2">
                    (Image Slideshow)
                  </p>
                </div>
              </ElectricBorder>
            </div>

            {/* Spacer (Empty now) */}
            <div className="w-0 md:w-2/12 hidden md:flex justify-center relative h-20 items-center">
            </div>

            {/* Text Side */}
            <div className={`w-full md:w-5/12 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              <h3 className="text-3xl md:text-5xl font-oswald font-bold uppercase mb-4 text-black dark:text-white transition-colors duration-500">
                {project.title}
              </h3>
              <div className={`h-[1px] bg-black/20 dark:bg-white/20 w-full mb-6 ${index % 2 === 0 ? 'origin-left' : 'origin-right ml-auto'}`}></div>
              <p className="font-sans font-light text-black/70 dark:text-white/70 leading-relaxed transition-colors duration-500">
                {project.description}
              </p>
              <div className={`h-[1px] bg-black/10 dark:bg-white/10 w-2/3 mt-6 ${index % 2 === 0 ? '' : 'ml-auto'}`}></div>
              <div className={`h-[1px] bg-black/10 dark:bg-white/10 w-1/3 mt-2 ${index % 2 === 0 ? '' : 'ml-auto'}`}></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
