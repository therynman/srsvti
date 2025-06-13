
// const projectImagesRow1 = Array.from({ length: 5 }, (_, i) => `/images/projects/p${i + 1}.png`);
// const projectImagesRow2 = Array.from({ length: 5 }, (_, i) => `/images/projects/p${i + 6}.png`);


// const extendedRow1 = [...projectImagesRow1, ...projectImagesRow1];
// const extendedRow2 = [...projectImagesRow2, ...projectImagesRow2];

// const Projects = () => {
//   return (
//     <section id="projects" className="py-20 bg-white overflow-x-hidden">
      
//       {/* Row 1: Scrolls Right to Left */}
//       <div className="w-full inline-flex flex-nowrap mb-8">
//         <div className="flex items-center justify-start space-x-8 animate-scroll-left pause-animation-on-hover">
//           {extendedRow1.map((src, index) => (
//             <div key={`r1-${index}`} className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-3">
//               <img src={src} alt={`Project work ${index + 1}`} className="w-full h-full object-cover" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Row 2: Scrolls Left to Right */}
//       <div className="w-full inline-flex flex-nowrap">
//         <div className="flex items-center justify-start space-x-8 animate-scroll-right pause-animation-on-hover">
//           {extendedRow2.map((src, index) => (
//             <div key={`r2-${index}`} className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:translate-y-3">
//               <img src={src} alt={`Project work ${index + 1}`} className="w-full h-full object-cover" />
//             </div>
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Projects;

import React from 'react';

// Data for the project cards, including image source, name, and country
const projectDataRow1 = [
  { src: '/images/projects/p1.png', name: 'Tilo Skin Pro', country: 'USA' },
  { src: '/images/projects/p2.png', name: 'Flowblower Dryer', country: 'California, USA' },
  { src: '/images/projects/p3.png', name: 'Audi Sport Quattro', country: 'Germany' },
  { src: '/images/projects/p4.png', name: 'RetroPC', country: 'Japan' },
  { src: '/images/projects/p5.png', name: 'Sunset Waves', country: 'Spain' },
];

const projectDataRow2 = [
  { src: '/images/projects/p6.png', name: 'Mercedes G-Wagon', country: 'Germany' },
  { src: '/images/projects/p7.png', name: 'Nothing Phone', country: 'United Kingdom' },
  { src: '/images/projects/p8.png', name: 'Marshall Sound Box', country: 'Berlin, Germany' },
  { src: '/images/projects/p9.png', name: 'Airpods Max', country: 'USA' },
  { src: '/images/projects/p10.png', name: 'Pink Form', country: 'France' },
];

// Duplicate the arrays for a seamless infinite scroll effect
const extendedRow1 = [...projectDataRow1, ...projectDataRow1];
const extendedRow2 = [...projectDataRow2, ...projectDataRow2];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white overflow-x-hidden">
      
      {/* Row 1: Scrolls Right to Left, image moves UP on hover */}
      <div className="w-full inline-flex flex-nowrap mb-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="flex items-center justify-start space-x-8 animate-scroll-left pause-animation-on-hover">
          {extendedRow1.map((project, index) => (
            <div key={`r1-${index}`} className="group flex-shrink-0 w-[265px] h-[265px] rounded-2xl overflow-hidden">
              {/* This inner div moves up on hover */}
              <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:-translate-y-[60px]">
                <img src={project.src} alt={project.name} className="w-full h-[265px] object-cover" />
                {/* Text content positioned below the image, revealed on hover */}
                <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
                  <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolls Left to Right, image moves DOWN on hover */}
      <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="flex items-center justify-start space-x-8 animate-scroll-right pause-animation-on-hover">
          {extendedRow2.map((project, index) => (
            <div key={`r2-${index}`} className="group flex-shrink-0 w-[265px] h-[265px] rounded-2xl overflow-hidden">
              {/* This inner div is positioned up and moves down on hover */}
              <div className="relative w-full h-[calc(265px_+_60px)] top-[-60px] transition-transform duration-500 ease-in-out group-hover:translate-y-[60px]">
                {/* Text content positioned above the image, revealed on hover */}
                <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
                  <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.country}</p>
                </div>
                <img src={project.src} alt={project.name} className="w-full h-[265px] object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;