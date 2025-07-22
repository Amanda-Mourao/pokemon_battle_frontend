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
    <div className="h-auto lg:h-36 shadow-lg bg-gradient-to-r from-emerald-900 to-green-800 relative">
      <nav className="text-white flex flex-col lg:flex-row lg:justify-between font-bold px-4 lg:px-16 py-4 lg:py-0">
        <div className="flex justify-between items-start lg:justify-start lg:items-start">
          <div className="flex flex-col items-center justify-start">
            <img src="/pokemon.webp" className="w-20 lg:w-30 -mt-2" />
            <img src="/pokeball.webp" className="w-8 lg:w-15 -mt-3" />
            <h1
              className="text-sm lg:text-lg font-extrabold text-white tracking-wide whitespace-nowrap mt-1"
              style={{
                textShadow: `
              -2px -2px 0 #000,  
              2px -2px 0 #000,
              -2px 2px 0 #000,
              2px 2px 0 #000
              `,
              }}
            >
              Battle Game
            </h1>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 mt-4"
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
          <div className="hidden lg:block relative top-14">
            <input
              type="text"
              placeholder="Search..."
              value={searchParams.get("search") || ""}
              onChange={handleChange}
              className="w-full md:w-64 px-4 py-2 rounded-xl bg-white text-black border-1 border-black placeholder-green-900/40 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            />
          </div>
        )}

        <div className="hidden lg:flex flex-wrap gap-16 text-lg relative top-16">
          <Link
            to="/"
            className="text-white hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
            }}
          >
            My Roster
          </Link>
        </div>
      </nav>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-gradient-to-r from-emerald-900 to-green-800 shadow-lg transition-all duration-300 ease-in-out ${
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
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
                className="w-full px-4 py-2 rounded-xl bg-white text-black placeholder-green-900/40 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
