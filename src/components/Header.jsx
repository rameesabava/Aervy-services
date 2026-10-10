import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaTools,
} from "react-icons/fa";
import { routeContext } from "../context API/RouteGuardContext";
import toast from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {
    authorisedUser,
    setAuthorisedUser,
    role,
    setRole,
    searchContext,
  } = useContext(routeContext);

  const storedUser = JSON.parse(
    sessionStorage.getItem("user") || "null"
  );

  const currentRole = role || storedUser?.role;
  const isLoggedIn =
    authorisedUser || Boolean(sessionStorage.getItem("token"));

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setAuthorisedUser(false);
    setRole("");

    setMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      toast.error("Please enter a service to search");
      return;
    }

    if (searchContext?.setSearchKey) {
      searchContext.setSearchKey(searchText.trim());
    }

    closeMenu();
    navigate("/services");
  };

  const navLinkClass =
    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-red-50 hover:text-red-600";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <img
              src="/icon.png"
              alt="CSP 24 × 7 logo"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            />

            <div className="leading-tight">
              <h1 className="text-lg font-extrabold tracking-tight text-red-500 sm:text-xl">
                CSP 24 × 7
              </h1>
              <p className="hidden text-[10px] font-medium text-gray-500 sm:block sm:text-xs">
                Services at your doorstep
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link to="/" className={navLinkClass}>
              <FaHome />
              Home
            </Link>

            <Link to="/about" className={navLinkClass}>
              <FaInfoCircle />
              About
            </Link>

            <Link to="/contact" className={navLinkClass}>
              <FaPhoneAlt />
              Contact
            </Link>

            {isLoggedIn && currentRole !== "admin" && (
              <Link to="/services" className={navLinkClass}>
                <FaTools />
                Services
              </Link>
            )}

            {currentRole === "admin" && (
              <Link to="/admin" className={navLinkClass}>
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop search */}
          {isLoggedIn && currentRole !== "admin" && (
            <form
              onSubmit={handleSearch}
              className="hidden min-w-0 max-w-xs flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 md:flex lg:max-w-[220px] xl:max-w-xs"
            >
              <FaSearch className="shrink-0 text-gray-400" />

              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search services..."
                aria-label="Search services"
                className="w-full min-w-0 bg-transparent px-2 text-sm outline-none"
              />

              <button
                type="submit"
                aria-label="Submit search"
                className="shrink-0 text-sm font-bold text-red-600 hover:text-red-800"
              >
                Go
              </button>
            </form>
          )}

          {/* Desktop authentication */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                <span className="hidden items-center gap-2 text-sm font-medium text-gray-600 xl:flex">
                  <FaUserCircle className="text-lg text-red-600" />
                  {storedUser?.username || storedUser?.name || "Welcome"}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-100 text-xl text-red-600 transition hover:bg-red-50 md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <div
        className={`overflow-hidden border-t border-red-100 bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[650px] opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">

          {/* Mobile search */}
          {isLoggedIn && currentRole !== "admin" && (
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <FaSearch className="shrink-0 text-gray-400" />

              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search services..."
                aria-label="Search services"
                className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none"
              />

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Search
              </button>
            </form>
          )}

          <Link to="/" onClick={closeMenu} className={navLinkClass}>
            <FaHome className="text-red-500" />
            Home
          </Link>

          <Link to="/about" onClick={closeMenu} className={navLinkClass}>
            <FaInfoCircle className="text-red-500" />
            About
          </Link>

          <Link to="/contact" onClick={closeMenu} className={navLinkClass}>
            <FaPhoneAlt className="text-red-500" />
            Contact
          </Link>

          {isLoggedIn && currentRole !== "admin" && (
            <Link
              to="/services"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FaTools className="text-red-500" />
              Services
            </Link>
          )}

          {currentRole === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Dashboard
            </Link>
          )}

          <div className="border-t border-gray-100 pt-3">
            {isLoggedIn ? (
              <div className="space-y-3">
                <p className="flex items-center gap-2 px-3 text-sm font-medium text-gray-600">
                  <FaUserCircle className="text-xl text-red-600" />
                  {storedUser?.username || storedUser?.name || "Welcome"}
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-red-600 px-4 py-3 text-center font-bold text-red-600 transition hover:bg-red-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-red-600 px-4 py-3 text-center font-bold text-white transition hover:bg-red-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header