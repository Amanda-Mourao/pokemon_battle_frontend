function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-700 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex space-x-6 text-sm">
          <a
            href="#"
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
            Legal Notice
          </a>
          <a
            href="#"
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
            Privacy Policy
          </a>
          <a
            href="#"
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
            Contact
          </a>
        </div>

        <div
          className="text-xs text-white text-center md:text-right"
          style={{
            textShadow: `
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
            `,
          }}
        >
          © {new Date().getFullYear()} Amanda's & Julia's Pokémon Battle Game
        </div>
      </div>
    </footer>
  );
}

export default Footer;
