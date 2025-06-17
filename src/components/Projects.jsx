
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

// import React from 'react';

// const projectDataRow1 = [
//   { src: '/images/projects/p1.png', name: 'Tilo Skin Pro', country: 'USA' },
//   { src: '/images/projects/p2.png', name: 'Flowblower Dryer', country: 'California, USA' },
//   { src: '/images/projects/p3.png', name: 'Audi Sport Quattro', country: 'Germany' },
//   { src: '/images/projects/p4.png', name: 'RetroPC', country: 'Japan' },
//   { src: '/images/projects/p5.png', name: 'Sunset Waves', country: 'Spain' },
// ];

// const projectDataRow2 = [
//   { src: '/images/projects/p6.png', name: 'Mercedes G-Wagon', country: 'Germany' },
//   { src: '/images/projects/p7.png', name: 'Nothing Phone', country: 'United Kingdom' },
//   { src: '/images/projects/p8.png', name: 'Marshall Sound Box', country: 'Berlin, Germany' },
//   { src: '/images/projects/p9.png', name: 'Airpods Max', country: 'USA' },
//   { src: '/images/projects/p10.png', name: 'Pink Form', country: 'France' },
// ];


// const extendedRow1 = [...projectDataRow1, ...projectDataRow1];
// const extendedRow2 = [...projectDataRow2, ...projectDataRow2];

// const Projects = () => {
//   return (
//     <section id="projects" className="py-20  overflow-x-hidden">
      
//       {/* Row 1: Scrolls Right to Left, image moves UP on hover */}
      // <div className="w-full inline-flex flex-nowrap mb-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      //   <div className="flex items-center justify-start space-x-8 animate-scroll-left pause-animation-on-hover">
      //     {extendedRow1.map((project, index) => (
      //       <div key={`r1-${index}`} className="group flex-shrink-0 w-[265px] h-[265px] rounded-2xl overflow-hidden">
      //         {/* This inner div moves up on hover */}
      //         <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:-translate-y-[60px]">
      //           <img src={project.src} alt={project.name} className="w-full h-[265px] object-cover" />
      //           {/* Text content positioned below the image, revealed on hover */}
      //           <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
      //             <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
      //             <p className="text-sm text-gray-500">{project.country}</p>
      //           </div>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </div>

//       {/* Row 2: Scrolls Left to Right, image moves DOWN on hover */}
//       <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
//         <div className="flex items-center justify-start space-x-8 animate-scroll-right pause-animation-on-hover">
//           {extendedRow2.map((project, index) => (
//             <div key={`r2-${index}`} className="group flex-shrink-0 w-[265px] h-[265px] rounded-2xl overflow-hidden">
//               {/* This inner div is positioned up and moves down on hover */}
//               <div className="relative w-full h-[calc(265px_+_60px)] top-[-60px] transition-transform duration-500 ease-in-out group-hover:translate-y-[60px]">
//                 {/* Text content positioned above the image, revealed on hover */}
//                 <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
//                   <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
//                   <p className="text-sm text-gray-500">{project.country}</p>
//                 </div>
//                 <img src={project.src} alt={project.name} className="w-full h-[265px] object-cover" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Projects;

// src/components/Projects.jsx
import React from 'react';

// ... (projectDataRow1 and projectDataRow2 data remains the same) ...
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


const extendedRow1 = [...projectDataRow1, ...projectDataRow1];
const extendedRow2 = [...projectDataRow2, ...projectDataRow2];

const Projects = () => {
  return (
    // <section id="projects" className="py-16 md:py-20 overflow-x-hidden">
    //   <div className="w-full inline-flex flex-nowrap mb-6 md:mb-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
    //     <div className="flex items-center justify-start space-x-6 md:space-x-8 animate-scroll-left pause-animation-on-hover">
    //       {extendedRow1.map((project, index) => (
    //         <div key={`r1-${index}`} className="group flex-shrink-0 w-[220px] h-[220px] md:w-[265px] md:h-[265px] rounded-2xl overflow-hidden">
    //           <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:-translate-y-[60px]">
    //             <img src={project.src} alt={project.name} className="w-full h-full object-cover" />
    //             <div className="absolute bottom-0 w-full h-[60px] bg-white flex flex-col items-center justify-center">
    //               <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
    //               <p className="text-sm text-gray-500">{project.country}</p>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
    //     <div className="flex items-center justify-start space-x-6 md:space-x-8 animate-scroll-right pause-animation-on-hover">
    //       {extendedRow2.map((project, index) => (
    //         <div key={`r2-${index}`} className="group flex-shrink-0 w-[220px] h-[220px] md:w-[265px] md:h-[265px] rounded-2xl overflow-hidden">
    //           <div className="relative w-full h-[calc(100%_+_60px)] top-[-60px] transition-transform duration-500 ease-in-out group-hover:translate-y-[60px]">
    //             <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
    //               <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
    //               <p className="text-sm text-gray-500">{project.country}</p>
    //             </div>
    //             <img src={project.src} alt={project.name} className="w-full h-full object-cover" />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section id="projects" className="py-16 md:py-20 overflow-x-hidden">
  {/* Row 1 — Scroll Left — Hover reveals text underneath */}
  <div className="w-full inline-flex flex-nowrap mb-6 md:mb-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
  <div className="flex items-center justify-start space-x-6 md:space-x-8 animate-scroll-left pause-animation-on-hover">
    {extendedRow1.map((project, index) => (
      <div
        key={`r1-${index}`}
        className="group flex-shrink-0 w-[220px] h-[220px] md:w-[265px] md:h-[265px] rounded-2xl overflow-hidden"
      >
        <div className="relative w-full h-[calc(100%_+_60px)] transition-transform duration-500 ease-in-out group-hover:-translate-y-[60px]">
          {/* Text shown below, image above */}
          <div className="absolute bottom-0 w-full h-[60px] bg-white flex flex-col items-center justify-center z-10">
            <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.country}</p>
          </div>
          <img src={project.src} alt={project.name} className="w-full h-full object-cover" />
        </div>
      </div>
    ))}
  </div>
</div>


  {/* Row 2 — Scroll Right — Same hover effect */}
  <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
    <div className="flex items-center justify-start space-x-6 md:space-x-8 animate-scroll-right pause-animation-on-hover">
      {extendedRow2.map((project, index) => (
        <div key={`r2-${index}`} className="group flex-shrink-0 w-[220px] h-[220px] md:w-[265px] md:h-[265px] rounded-2xl overflow-hidden">
          <div className="relative w-full h-[calc(100%_+_60px)] top-[-60px] transition-transform duration-500 ease-in-out group-hover:translate-y-[60px]">
            <div className="w-full h-[60px] bg-white flex flex-col items-center justify-center">
              <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.country}</p>
            </div>
            <img src={project.src} alt={project.name} className="w-full h-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Projects;