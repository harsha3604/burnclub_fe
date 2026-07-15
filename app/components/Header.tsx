"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { useAuth } from "../context/context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

const API_BASE = process.env.NEXT_PUBLIC_FRONTEND_URL || "";

function getImageSrc(image?: string | null) {
  if (!image) return null;
  return `${API_BASE}${image.replace(/^\//, "")}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const imageSrc = getImageSrc(user?.image);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Forge Athletic Club home"
        >
          <span className={styles.logoMark} aria-hidden="true" />
          BENGALURU BURN CLUB
          <span className={styles.logoSub}>ATHLETIC CLUB</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.navLinkActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!loading &&
            (user ? (
              <div className={styles.userMenu}>
                <button
                  className={`${styles.userButton} ${
                    dropdownOpen ? styles.userButtonActive : ""
                  }`}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={user.userName}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <span className={styles.userAvatarFallback}>
                      {user.userName?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      href="/profile"
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`${styles.navLink} ${
                  pathname === "/login" ? styles.navLinkActive : ""
                }`}
              >
                Login
              </Link>
            ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.bun} ${open ? styles.bunOpenTop : ""}`} />
          <span className={`${styles.bun} ${open ? styles.bunOpenMid : ""}`} />
          <span className={`${styles.bun} ${open ? styles.bunOpenBot : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
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
            <span className={styles.navMobileIndex}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {link.label}
          </Link>
        ))}

        {!loading &&
          (user ? (
            <>
              <Link href="/profile" className={styles.navMobileLink}>
                <span className={styles.navMobileIndex}>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={user.userName}
                      className={styles.navMobileAvatar}
                    />
                  ) : (
                    "04"
                  )}
                </span>
                Profile
              </Link>

              <button className={styles.navMobileLink} onClick={handleLogout}>
                <span className={styles.navMobileIndex}>05</span>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.navMobileLink}>
              <span className={styles.navMobileIndex}>04</span>
              Login
            </Link>
          ))}
      </nav>
    </header>
  );
}
