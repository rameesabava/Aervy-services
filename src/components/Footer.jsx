import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTools,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Electrical Services",
    "Plumbing",
    "Cleaning",
    "Painting",
    "AC Repair",
    "Home Maintenance",
  ];

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/icon.png"
                alt="CSP 24 × 7 logo"
                className="h-12 w-12 rounded-xl bg-white object-contain p-1"
              />

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-red-500 sm:text-2xl">
                  CSP <span className="text-white">24 × 7</span>
                </h2>
                <p className="text-xs text-gray-400">
                  Services at your doorstep
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Find trusted service professionals for your everyday needs.
              From home repairs to maintenance, CSP 24 × 7 helps connect you
              with service providers conveniently.
            </p>

            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">
                Follow Us
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Browse Services", path: "/services" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-red-400"
                  >
                    <FaArrowRight className="text-xs text-red-500 transition-transform group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Our Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group flex items-start gap-2 text-sm text-gray-400 transition hover:text-red-400"
                  >
                    <FaTools className="mt-1 shrink-0 text-xs text-red-500" />
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Get In Touch
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                  <FaMapMarkerAlt />
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Our Location
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Kothamangalam, Kerala, India
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                  <FaEnvelope />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Email Us
                  </p>
                  <a
                    href="mailto:hello@aervy.com"
                    className="mt-1 block break-all text-sm text-gray-400 transition hover:text-red-400"
                  >
                    info.csp24x7@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                  <FaPhoneAlt />
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Call Us
                  </p>
                  <a
                    href="tel:+918281732890"
                    className="mt-1 block text-sm text-gray-400 transition hover:text-red-400"
                  >
                    +91 8281732890
                  </a>
                </div>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Contact Us
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-white">CSP 24 × 7</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            <Link
              to="/privacy"
              className="text-gray-400 transition hover:text-red-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 transition hover:text-red-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer