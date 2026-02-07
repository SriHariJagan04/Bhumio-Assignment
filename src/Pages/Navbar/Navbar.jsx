import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Bhumio Assignment</div>

      <div className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <a href="/">Eventually Consistent Form</a>
        <a href="/OutOfOrderEvents">Out Of Order Events</a>
        <a href="/ValidationThatLies">Validation That Lies</a>
      </div>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
