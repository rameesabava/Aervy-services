import React, { useEffect, useRef } from 'react'
import { CiStar } from "react-icons/ci";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {

  const statsRef = useRef(null);

  const proRef = useRef(null);
  const customerRef = useRef(null);
  const areaRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {

    const counters = [
      { ref: proRef, value: 800, suffix: "+" },
      { ref: customerRef, value: 15000, suffix: "+" },
      { ref: areaRef, value: 12, suffix: "" },
      { ref: ratingRef, value: 4.8, suffix: "" }
    ];

    counters.forEach((counter) => {
      const obj = { value: 0 };

      gsap.to(obj, {
        value: counter.value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          once: true
        },
        onUpdate: () => {

          if (counter.value === 4.8) {
            counter.ref.current.textContent = obj.value.toFixed(1);
          }

          else if (counter.value === 15000) {
            counter.ref.current.textContent =
              Math.floor(obj.value).toLocaleString() + "+";
          }

          else {
            counter.ref.current.textContent =
              Math.floor(obj.value) + counter.suffix;
          }
        }
      });
    });

  }, []);

  return (
    <div className='flex flex-col items-center justify-center p-5 text-center bg-gray-200'>

      {/* Logo */}
      <section className='flex items-center justify-center text-lg md:text-3xl'>
        <img src="/icon.png" alt="icon" className='w-8' />
        <p className='text-amber-700'>AERVY SERVICES PLATFORM</p>
      </section>

      {/* Content */}
      <p className='text-green-900 text-sm my-3'>
        KOCHI'S TRUSTED LOCAL SERVICE PLATFORM
      </p>

      <div className='font-semibold text-3xl text-center my-4'>
        <p>From Fort Kochi to Kakkanad -</p>
        <p>services that come to you.</p>
      </div>

      <div className='text-gray-700'>
        <p>
          Aervy connects Kochi residents with verified local
          professionals for home services, repairs, beauty,
          wellness, and more — all bookable in minutes,
          right on your phone.
        </p>
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="grid md:grid-cols-4 mt-8 border border-gray-300 rounded-[30px] shadow-lg overflow-hidden bg-white w-full max-w-6xl"
      >

        {/* Verified Professionals */}
        <div className="py-10 text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2
            ref={proRef}
            className="text-5xl font-extrabold text-green-700"
          >
            0
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Verified Professionals
          </p>
        </div>

        {/* Happy Customers */}
        <div className="py-10 text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2
            ref={customerRef}
            className="text-5xl font-extrabold text-green-700"
          >
            0
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Happy Customers
          </p>
        </div>

        {/* Areas Covered */}
        <div className="py-10 text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2
            ref={areaRef}
            className="text-5xl font-extrabold text-green-700"
          >
            0
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Areas Covered
          </p>
        </div>

        {/* Rating */}
        <div className="py-10 text-center">
          <h2 className="text-5xl font-extrabold text-green-700 flex items-center justify-center gap-2">
            <span ref={ratingRef}>0</span>
            <CiStar className="text-yellow-500 text-3xl" />
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Avg. Rating
          </p>
        </div>

      </div>

    </div>
  )
}

export default About