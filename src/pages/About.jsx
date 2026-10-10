import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaTools,
  FaMapMarkerAlt,
  FaHandshake,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-reveal",
          start: "top 90%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Trusted Professionals",
      description:
        "We aim to connect customers with service providers who meet our platform's verification requirements.",
    },
    {
      icon: <FaClock />,
      title: "Convenient Booking",
      description:
        "Find the services you need and submit booking requests through a simple, convenient process.",
    },
    {
      icon: <FaHandshake />,
      title: "Connecting Communities",
      description:
        "We help customers find local professionals while giving service providers opportunities to reach new customers.",
    },
  ];

  const values = [
    "A convenient way to discover local services",
    "A simple booking experience",
    "A platform for local service providers",
    "Customer-focused service discovery",
  ];

  return (
    <main
      ref={pageRef}
      className="w-full overflow-x-clip bg-white text-gray-800"
    >
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-red-50">
        <div
          className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-red-100/80 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
          {/* Hero Content */}
          <div className="about-reveal min-w-0">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600 sm:text-base">
              About CSP 24 × 7
            </p>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Local services,
              <span className="block text-red-600">
                made simple.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              From Fort Kochi to Kakkanad, CSP 24 × 7 aims to make it easier
              to discover local service professionals for your everyday
              needs.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Whether you need help at home or want to grow your service
              business, our platform brings customers and local providers
              together in one convenient place.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-base"
              >
                Explore Services
                <FaArrowRight />
              </Link>

              <Link
                to="/provider"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-base"
              >
                Become a Provider
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="about-reveal relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-3 rounded-3xl bg-red-200/50 blur-xl" />

            <div className="relative overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-2xl text-white sm:h-16 sm:w-16 sm:text-3xl">
                  <FaTools />
                </div>

                <div className="min-w-0">
                  <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                    CSP <span className="text-red-600">24 × 7</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Services at your doorstep
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-gray-100 sm:my-8" />

              <div className="space-y-4">
                {[
                  "Electrical repairs",
                  "Plumbing services",
                  "Home maintenance",
                  "And much more",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 sm:p-4"
                  >
                    <FaCheckCircle className="shrink-0 text-lg text-red-600" />
                    <span className="text-sm font-semibold text-gray-700 sm:text-base">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-gray-500 sm:mt-6 sm:text-sm">
                Discover services that suit your needs and connect with
                local professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="about-reveal">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600">
              Who We Are
            </p>

            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Connecting people with the right local services
            </h2>

            <div className="mt-5 h-1 w-20 rounded-full bg-red-600" />

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              CSP 24 × 7 is a local services platform designed to help
              customers discover service providers and request the help
              they need.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              We want to make finding everyday services more convenient
              while helping local professionals build connections with
              potential customers.
            </p>
          </div>

          <div className="about-reveal rounded-2xl border border-red-100 bg-red-50/70 p-5 sm:rounded-3xl sm:p-8">
            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              What matters to us
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              We focus on making the service discovery and booking
              experience straightforward for everyone using our platform.
            </p>

            <ul className="mt-6 space-y-4">
              {values.map((value) => (
                <li
                  key={value}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-lg text-red-600" />

                  <span className="text-sm leading-6 text-gray-700 sm:text-base">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-950 px-4 py-12 text-white sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="about-reveal mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
            <FaUsers />
          </div>

          <p className="about-reveal mt-5 text-sm font-bold uppercase tracking-widest text-red-400">
            Our Mission
          </p>

          <h2 className="about-reveal mt-3 text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Making local services easier to find and access
          </h2>

          <p className="about-reveal mx-auto mt-5 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8 md:text-lg">
            Our goal is to provide a convenient platform where customers
            can discover local professionals and service providers can
            connect with people looking for their skills.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="about-reveal mx-auto mb-9 max-w-2xl text-center sm:mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600">
              Why CSP 24 × 7
            </p>

            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Designed around your needs
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              We want to make connecting with local service professionals
              simpler and more convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="about-reveal group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl sm:rounded-3xl sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600 transition group-hover:bg-red-600 group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-gray-900 sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-red-50 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10">
        <div className="about-reveal mx-auto flex max-w-5xl flex-col items-center gap-5 text-center sm:gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-600 shadow-sm sm:h-16 sm:w-16 sm:text-3xl">
            <FaMapMarkerAlt />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Proud to serve Kochi
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              From Fort Kochi to Kakkanad, our platform aims to help
              people find services in their local communities.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="about-reveal mx-auto max-w-5xl rounded-2xl bg-red-600 px-5 py-9 text-center shadow-xl sm:rounded-3xl sm:px-8 sm:py-12 md:px-12 md:py-14">
          <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-50 sm:text-base sm:leading-8">
            Find a professional for your next task or join CSP 24 × 7
            as a service provider.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 sm:text-base"
            >
              Find Services
              <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/70 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About