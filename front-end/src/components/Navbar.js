import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { nav } from "../data";
import { useAuthContext } from "../context/auth-context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logoutUser } = useAuthContext();

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
      <nav className="navbar">
        <div>
          <Link to="/">Clurr's.Studio</Link>
        </div>
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
        {user ? (
          <button
            className="log-button"
            onClick={() => {
              logoutUser();
            }}
          >
            logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
