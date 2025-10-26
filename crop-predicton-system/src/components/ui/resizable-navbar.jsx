import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Simple placeholder icons if you don't have @tabler/icons-react
const MenuIcon = () => <span className="text-2xl">☰</span>;
const CloseIcon = () => <span className="text-2xl">×</span>;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 50));

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Predict", link: "/predict" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Login/Register", link: "/login" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md shadow-md bg-white/80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CropPredict
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/90 shadow-md"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsOpen(false)} // close menu on click
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
