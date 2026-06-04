import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <Helmet>
        <title>404 - Page Not Found | Dr. Ankush Garg</title>
        <meta name="description" content="The page you are looking for cannot be found." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-7xl font-bold text-[#8b43ba]">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>

      <p className="text-gray-600 mt-3 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 bg-[#8b43ba] text-white px-6 py-3 rounded-lg hover:bg-[#7335a0] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}