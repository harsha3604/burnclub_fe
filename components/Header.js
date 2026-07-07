"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Forge Athletic Club home">
          <span className={styles.logoMark} aria-hidden="true" />
          FORGE<span className={styles.logoSub}>ATHLETIC CLUB</span>
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.menuBtn}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.bun} ${open ? styles.bunOpenTop : ""}`} />
          <span className={`${styles.bun} ${open ? styles.bunOpenMid : ""}`} />
          <span className={`${styles.bun} ${open ? styles.bunOpenBot : ""}`} />
        </button>
      </div>

      <nav
        className={`${styles.navMobile} ${open ? styles.navMobileOpen : ""}`}
        aria-label="Primary mobile"
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navMobileLink}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className={styles.navMobileIndex}>0{i + 1}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
