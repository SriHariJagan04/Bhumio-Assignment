import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Bhumio Assignment</div>

      <div className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Eventually Consistent Form
        </Link>

        <Link to="/OutOfOrderEvents" onClick={() => setIsOpen(false)}>
          Out Of Order Events
        </Link>

        <Link to="/ValidationThatLies" onClick={() => setIsOpen(false)}>
          Validation That Lies
        </Link>
      </div>

      <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
