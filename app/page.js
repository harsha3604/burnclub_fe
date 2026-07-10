import Link from "next/link";
import styles from "./page.module.css";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";

const FEATURES = [
  {
    title: "Strength Training",
    copy: "Barbell, plates, and racks — programmed for beginners through competitive lifters.",
  },
  {
    title: "Group Classes",
    copy: "HIIT, conditioning, and mobility sessions run daily, no class ever capped under 8 people.",
  },
  {
    title: "Nutrition Coaching",
    copy: "One-on-one check-ins that work around your schedule, not a meal plan pulled off a shelf.",
  },
  {
    title: "Open Gym Access",
    copy: "Extended hours, seven days a week, for members who'd rather train on their own clock.",
  },
];

const STATS = [
  { value: "12", unit: "YRS", label: "On the gym floor" },
  { value: "40+", unit: "WK", label: "Classes running weekly" },
  { value: "1,200", unit: "MEM", label: "Active members" },
  { value: "5", unit: "CO", label: "Certified coaches" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">Forge Athletic Club</span>
            <h1 className={styles.h1}>
              Strength is built,
              <br />
              not born.
            </h1>
            <p className={styles.lead}>
              Forge is a no-frills training club for people who show up on the
              hard days. We run a full barbell floor, daily group classes, and a
              coaching staff that actually knows your name — whether you walked
              in yesterday or five years ago.
            </p>
            <div className={styles.heroActions}>
              <Link href="/events" className="btn btn-primary">
                See Upcoming Events
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get In Touch
              </Link>
            </div>
          </div>

          <div className={styles.heroGraphic} aria-hidden="true">
            <div className={styles.plate}>
              <div className={styles.plateHole} />
            </div>
            <div className={styles.plateSmall}>
              <div className={styles.plateHole} />
            </div>
          </div>
        </div>
        <div className="stripe-divider" />
      </section>

      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statUnit}>{s.unit}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <div className={`container ${styles.aboutInner}`}>
          <div className={styles.aboutHead}>
            <span className="eyebrow">What we run</span>
            <h2 className={styles.h2}>Four ways to train here</h2>
          </div>

          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIndex}>0{i + 1}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureCopy}>{f.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaHeading}>
            First class is on us. <br />
            Come find out if Forge fits.
          </h2>
          <Link href="/events" className="btn btn-outline--light">
            Browse Events &amp; Register
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
