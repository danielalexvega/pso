import { FC } from "react";
import { Link } from "react-router-dom";

const TopNavigation: FC = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 rounded-lg px-4 py-2 pr-10 w-64 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-azure"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Calendar Icon */}
      <Link to="/" className="text-white hover:text-gray-300 transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </Link>

      {/* Login Link */}
      <Link
        to="/"
        className="text-white hover:text-gray-300 transition-colors font-medium"
      >
        Login
      </Link>

      {/* Promo Code Link */}
      <Link
        to="/"
        className="text-white hover:text-gray-300 transition-colors font-medium"
      >
        Promo Code
      </Link>

      {/* Cart Button */}
      <Link
        to="/"
        className="bg-pct_purple hover:bg-opacity-80 rounded-lg px-4 py-2 flex items-center gap-2 text-white font-medium transition-colors"
      >
        <span>Cart</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
          />
        </svg>
      </Link>
    </div>
  );
};

export default TopNavigation;
