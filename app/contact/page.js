import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | Forge Athletic Club",
  description:
    "Reach Forge Athletic Club on social media, email, or in person.",
};

// Update the href values below with your real profile links.
const SOCIALS = [
  {
    label: "Instagram",
    handle: "@forgeathleticclub",
    href: "https://instagram.com/yourhandle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    handle: "+1 (555) 010-0199",
    href: "https://wa.me/15550100199",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 20l1.4-4.1A8 8 0 1 1 9 19.6Z" />
        <path d="M8.7 9.3c0 3.6 2.8 6.4 6.4 6.4" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "hello@forgeathleticclub.com",
    href: "mailto:hello@forgeathleticclub.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5 12 13l8.5-6.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <span className="eyebrow">Say hello</span>
          <h1 className={styles.h1}>Contact Us</h1>
          <p className={styles.lead}>
            Questions about membership, class schedules, or an upcoming event?
            Reach out through any of the channels below — we tend to reply
            fastest on Instagram and WhatsApp.
          </p>
        </div>
        <div className="stripe-divider" />
      </section>

      <section className={styles.body}>
        <div className={`container ${styles.grid}`}>
          <ul className={styles.socialList}>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRow}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <span className={styles.socialText}>
                    <span className={styles.socialLabel}>{s.label}</span>
                    <span className={styles.socialHandle}>{s.handle}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
