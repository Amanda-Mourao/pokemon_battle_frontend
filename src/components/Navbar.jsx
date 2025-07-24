import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isOnHome = location.pathname === "/";
  const handleChange = (e) => {
    const query = e.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="h-auto p-2 shadow-lg bg-gradient-to-r from-green-900 to-green-700 relative">
      <nav className="text-white flex flex-col lg:flex-row lg:justify-between font-bold px-16 lg:px-16 py-4 lg:py-0">
        <div className="flex justify-between items-start lg:justify-start lg:items-start">
          <img src="/pokemon_logo.png" className="w-25 lg:w-30" />

          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-15 space-y-1 mt-4"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {isOnHome && (
          <div className="hidden lg:block relative top-9">
            <input
              type="text"
              placeholder="Search..."
              value={searchParams.get("search") || ""}
              onChange={handleChange}
              className="w-full md:w-64 px-4 py-2 rounded-xl bg-white text-black font-semibold border-1 border-black placeholder-green-700/50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            />
          </div>
        )}

        <div className="hidden lg:flex flex-wrap gap-16 text-lg relative items-center">
          <Link
            to="/"
            className="text-white hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            Home
          </Link>
          <Link
            to="/battle"
            className="text-white hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            Battle
          </Link>
          <Link
            to="/leaderboard"
            className="text-white hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            Leaderboard
          </Link>
          <Link
            to="/roster"
            className="text-white hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            My Roster
          </Link>
        </div>
      </nav>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-gradient-to-r from-green-900 to-green-700 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-4 pointer-events-none"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col space-y-4 p-6">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white text-lg font-bold hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            Home
          </Link>
          <Link
            to="/battle"
            onClick={closeMenu}
            className="text-white text-lg font-bold hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
              -1px -1px 0 #000,  
              1px -1px 0 #000,
              -1px 1px 0 #000,
              1px 1px 0 #000
              `,
            }}
          >
            Battle
          </Link>
          <Link
            to="/leaderboard"
            onClick={closeMenu}
            className="text-white text-lg font-bold hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            Leaderboard
          </Link>
          <Link
            to="/roster"
            onClick={closeMenu}
            className="text-white text-lg font-bold hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
            }}
          >
            My Roster
          </Link>

          {isOnHome && (
            <div className="pt-4 border-t border-white/20">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchParams.get("search") || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white text-black font-semibold placeholder-green-700/50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
