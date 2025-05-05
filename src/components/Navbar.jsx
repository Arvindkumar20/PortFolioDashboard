import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Skills", href: "/dashboard/skill" },
    { name: "Education", href: "/dashboard/education" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">MyPortfolio</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="hover:text-blue-600 transition duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-4 z-50">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
