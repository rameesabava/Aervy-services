import React, { useContext, useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaLock,
  FaArrowRight,
  FaSearch,
  FaBriefcase,
  FaUserCircle,
  FaCalendarCheck,
  FaShieldAlt,
  FaTools,
  FaRegSadTear,
  FaSyncAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { getApprovedProvidersAPI } from "../services/allAPI";
import { toast } from "react-hot-toast";
import { searchContext } from "../context API/ShareContext";

function Services() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const providersPerPage = 6;

  const { searchKey } = useContext(searchContext);

  // Get logged-in user
  let user = null;

  try {
    user = JSON.parse(sessionStorage.getItem("user"));
  } catch {
    user = null;
  }

  const token = sessionStorage.getItem("token");

  // Fetch approved providers
  const getApprovedProviders = async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await getApprovedProvidersAPI();

      if (result.status === 200) {
        const providerList = Array.isArray(result.data)
          ? result.data
          : result.data?.providers || [];

        setProviders(providerList);
      } else {
        setProviders([]);
      }
    } catch (err) {
      console.error("Error fetching providers:", err);
      setError(true);
      toast.error("Unable to load service providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovedProviders();
  }, []);

  // Search providers
  const searchTerms = [searchKey, localSearch]
    .filter(Boolean)
    .join(" ")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const filteredProviders = providers.filter((provider) => {
    const searchableText = [
      provider.username,
      provider.service,
      provider.location,
      provider.description,
      provider.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredProviders.length / providersPerPage
  );

  const startIndex = (currentPage - 1) * providersPerPage;

  const currentProviders = filteredProviders.slice(
    startIndex,
    startIndex + providersPerPage
  );

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKey, localSearch]);

  // Keep page valid if the provider list changes
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-red-600 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-red-500/50" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold">
              <FaShieldAlt />
              Your local service partner
            </div>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Find the right professional for every need.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-red-50 sm:text-lg">
              Discover local service providers for plumbing, electrical
              work, cleaning, beauty, tutoring, and more with CSP 24 × 7.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-white/95">
              <span className="flex items-center gap-2">
                <FaShieldAlt />
                Approved providers
              </span>

              <span className="flex items-center gap-2">
                <FaTools />
                Multiple services
              </span>

              <span className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Local professionals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Heading and Search */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Explore services
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Find your service provider
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Search by service, provider name, or location.
            </p>
          </div>

          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search plumbers, electricians..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                    <div className="mt-3 h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>

                <div className="mt-6 h-3 w-full rounded bg-gray-100" />
                <div className="mt-3 h-3 w-4/5 rounded bg-gray-100" />
                <div className="mt-6 h-10 rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center shadow-sm">
            <FaRegSadTear className="mx-auto text-4xl text-red-500" />

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load services
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Please check your connection and try again.
            </p>

            <button
              onClick={getApprovedProviders}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <FaSyncAlt />
              Try again
            </button>
          </div>
        )}

        {/* Provider Cards */}
        {!loading && !error && filteredProviders.length > 0 && (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {startIndex + 1}–
                  {Math.min(
                    startIndex + providersPerPage,
                    filteredProviders.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-900">
                  {filteredProviders.length}
                </span>{" "}
                providers
              </p>

              <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                {filteredProviders.length} results
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProviders.map((provider) => (
                <article
                  key={provider._id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-4 border-b border-gray-100 p-5 sm:p-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                      <FaUserCircle className="text-3xl" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-lg font-bold text-gray-900">
                        {provider.username || "Service Provider"}
                      </h3>

                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-red-600">
                        <FaBriefcase className="shrink-0" />
                        <span className="break-words">
                          {provider.service || "General Services"}
                        </span>
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <FaMapMarkerAlt className="shrink-0 text-red-500" />
                        <span className="break-words">
                          {provider.location || "Location not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
                      {provider.description ||
                        "Contact this service provider to learn more about their services."}
                    </p>

                    {provider.ratePerHour !== undefined &&
                      provider.ratePerHour !== null &&
                      provider.ratePerHour !== "" && (
                        <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                          <span className="text-sm text-gray-500">
                            Rate per hour
                          </span>

                          <span className="font-extrabold text-gray-900">
                            ₹{provider.ratePerHour}
                          </span>
                        </div>
                      )}

                    <div className="mt-auto">
                      {!token ? (
                        <Link
                          to="/login"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                          <FaLock />
                          Login to book
                          <FaArrowRight />
                        </Link>
                      ) : user?.role === "provider" ? (
                        <Link
                          to={`/provider/view/${provider._id}`}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                        >
                          View details
                          <FaArrowRight />
                        </Link>
                      ) : user?.role === "admin" ? (
                        <div className="rounded-xl bg-gray-100 px-4 py-3 text-center text-sm font-semibold text-gray-600">
                          Admin account
                        </div>
                      ) : (
                        <Link
                          to={`/user-bookings/${user?._id}`}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                          <FaCalendarCheck />
                          My Bookings
                          <FaArrowRight />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                aria-label="Service provider pagination"
              >
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) =>
                      Math.max(previous - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={
                      currentPage === page ? "page" : undefined
                    }
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${
                      currentPage === page
                        ? "bg-red-600 text-white shadow-md"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) =>
                      Math.min(previous + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  <span>Next</span>
                  <FaChevronRight />
                </button>
              </nav>
            )}

            {totalPages > 1 && (
              <p className="mt-4 text-center text-xs text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProviders.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FaSearch className="text-2xl" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No service providers found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try another service name, provider name, or location.
            </p>

            {(localSearch || searchKey) && (
              <button
                onClick={() => setLocalSearch("")}
                className="mt-5 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Become a Provider */}
        {!loading && (
          <div className="mt-12 overflow-hidden rounded-2xl bg-gray-900 p-6 text-white sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                Join CSP 24 × 7
              </p>

              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Are you a service professional?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
                Register your service, submit your details for approval,
                and connect with people looking for your expertise.
              </p>
            </div>

            <Link
              to="/provider"
              className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 lg:mt-0"
            >
              Register as Provider
              <FaArrowRight />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Services