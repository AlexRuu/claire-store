import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { nav } from "../data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setScrolled((scrolled) => {
        if (
          !scrolled &&
          (document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80)
        ) {
          return true;
        }
        if (
          scrolled &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return scrolled;
      });
    };
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <section className={`nav ${scrolled ? "scrolled" : ""}`}>
      <nav>
        <ul>
          {nav.map((link) => {
            const { id, name, url } = link;
            return (
              <li key={id}>
                <NavLink
                  to={url}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
