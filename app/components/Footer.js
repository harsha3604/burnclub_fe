import Link from "next/link";
import styles from "./Footer.module.css";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/yourhandle" },
  { label: "Facebook", href: "https://facebook.com/yourpage" },
  { label: "YouTube", href: "https://youtube.com/@yourchannel" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="stripe-divider" aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true" />
            FORGE
          </div>
          <p className={styles.tagline}>
            Strength is built, not born. A gym floor for lifters, runners, and
            everyone still figuring out where they fit in.
          </p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Quick links</span>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/events" className={styles.link}>Events</Link>
          <Link href="/contact" className={styles.link}>Contact Us</Link>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Follow along</span>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} Forge Athletic Club. All rights reserved.</span>
        <span className={styles.mono}>BUILT ON THE GYM FLOOR</span>
      </div>
    </footer>
  );
}
