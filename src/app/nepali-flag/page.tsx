'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function NepalFlagTutorial() {
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
        id: 0,
        title: "Let's Begin",
        content: "Nepal's flag is the world's only non-rectangular national flag. Its design follows precise mathematical rules defined in Nepal's constitution. Ready to learn how it's constructed? Scroll down to start the journey!",
        image: "/intro.png"
      },
    {
      id: 1,
      title: "Start with the Base",
      content: "Begin by drawing a horizontal line (AB). This will be the base of the flag. Then draw a vertical line (AC) perpendicular to AB, where the height AC = AB + (1/3)AB. This ensures that the proportions of the flag remain consistent.",
      image: "/step-1.svg"
    },
    {
      id: 2,
      title: "Create the Two Triangles",
      content: "Draw line BD and set BE = AB to maintain proportions. Draw FG parallel to AB, ensuring FG = AB. Connect C to G to complete the structure of two stacked triangles which form the unique non-rectangular shape of Nepal's flag.",
      image: "/step-2.svg"
    },
    {
      id: 3,
      title: "Draw the Moon Symbol",
      content: "Mark point H, where AH = (1/4)AB. Draw a parallel line HI, intersecting CG at point I. Create curved arcs that form the moon's crescent shape. Define 8 triangular points within the crescent area to complete the moon symbol in the upper triangle.",
      image: "/step-3.svg"
    },
    {
      id: 4,
      title: "Draw the Sun Symbol",
      content: "Find the midpoint of AF (point U) and construct a vertical line UV. The sun's center (W) is where HI and UV intersect. Draw two circles with precise radii. Add 12 triangular rays positioned inside the outer circle to complete the sun symbol in the lower triangle.",
      image: "/step-4.svg"
    },
    {
      id: 5,
      title: "Add the Border",
      content: "Set a border width to maintain uniformity around the entire flag. Ensure the angles of the inner and outer borders are equal. The border is crimson red, matching the interior of the flag, while the edges are outlined in blue.",
      image: "/step-5.svg"
    },
    {
      id: 6,
      title: "The Complete Flag",
      content: "Nepal's flag is now complete. The final dimensions follow specific constitutional guidelines, creating a flag with an irrational height-to-width ratio. The sun and moon symbols represent perseverance, peace, and longevity, making this mathematically precise flag one of the most unique national symbols in the world.",
      image: "/nepal-flag.png"
    }
  ];

  // Logic to detect which step is currently in view with Intersection Observer
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observerOptions = {
      root: contentRef.current,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.6
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.id.replace('step-', ''));
          if (stepId !== activeStep) {
            setActiveStep(stepId);
          }
        }
      });
    }, observerOptions);
    
    // Observe all step sections
    document.querySelectorAll('[id^="step-"]').forEach(section => {
      sectionObserver.observe(section);
    });
    
    return () => {
      sectionObserver.disconnect();
    };
  }, [activeStep]);

  return (
    <>
      <Head>
        <title>The Geometric Construction of Nepal's Flag</title>
        <meta name="description" content="Learn the mathematical algorithm behind Nepal's unique national flag" />
      </Head>

      <main className="flex h-screen w-full bg-white">
       
       {/* Left side - Scrollable content with full-height sections */}
       <div 
    ref={contentRef}
    className="w-1/2 h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent"
    style={{ scrollSnapType: 'y mandatory' }}
  >

{steps.map((step) => (
  <section 
    key={step.id} 
    className="min-h-screen flex flex-col justify-center px-16 py-1 scroll-mt-0" 
    id={`step-${step.id}`}
    style={{ scrollSnapAlign: 'start' }}
  >
    {step.id === 0 ? (
      <>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          The Geometrical Algorithm Behind Nepal's Flag
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{step.title}</h2>
        <div className="text-lg leading-relaxed text-gray-700 max-w-lg">
          Nepal's flag is the world's only non-rectangular national flag. Its design follows precise mathematical rules defined in Nepal's constitution. Ready to learn how it's constructed? Scroll down to start the journey!
        </div>
      </>
    ) : (
      <>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step {step.id}: {step.title}</h2>
        <p className="text-lg leading-relaxed text-gray-700 max-w-lg">{step.content}</p>
      </>
    )}
              
              {/* Mobile-only image (visible on small screens) */}
              <div className="md:hidden mt-8">
                <div className="relative w-full h-72">
                  <Image 
                    src={step.image} 
                    alt={step.id === 0 ? step.title : `Step ${step.id}: ${step.title}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex justify-between mt-8 pt-4">
                {step.id > 0 && (
                  <button 
                    onClick={() => {
                      const prevElement = document.getElementById(`step-${step.id - 1}`);
                      prevElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <span className="mr-2">←</span> Previous
                  </button>
                )}
                <div className="flex-grow"></div>
                {step.id < steps.length - 1 && (
                  <button 
                    onClick={() => {
                      const nextElement = document.getElementById(`step-${step.id + 1}`);
                      nextElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                )}
              </div>
            </section>
          ))}

          <section className="min-h-screen flex flex-col justify-center p-16 scroll-mt-0" style={{ scrollSnapAlign: 'start' }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">interesting facts</h2>
            <ul className="space-y-4 text-lg leading-relaxed text-gray-700 max-w-lg list-none">
  <li className="flex items-start">
    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
    <span className="lowercase">the sun and moon symbols are not just decorative; they symbolize perseverance, peace, and longevity.</span>
  </li>
  <li className="flex items-start">
    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
    <span className="lowercase">the flag's construction is so precise that certain lines and circles are considered "imaginary" in the constitution.</span>
  </li>
  <li className="flex items-start">
    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
    <span className="lowercase">the overall height-to-width ratio is an irrational number, meaning it cannot be expressed as a simple fraction.</span>
  </li>
</ul>

            
            <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">conclusion</h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-lg">
              Nepal's flag is more than just a national symbol—it is a mathematical masterpiece. 
              Every line, shape, and symbol follows a strict geometric algorithm based on constitutional law. 
              This level of precision makes Nepal's flag one of the most unique and scientifically significant in the world.
            </p>
          </section>
        </div>

        {/* Right side - Fixed image display with improved styling */}
        <div className="w-1/2 h-full bg-gray-50 flex items-center justify-center relative md:flex">
          <div className="relative w-4/5 h-4/5">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeStep === step.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image 
                  src={step.image} 
                  alt={step.id === 0 ? step.title : `Step ${step.id}: ${step.title}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority={step.id <= 1}
                  className="p-4"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}  