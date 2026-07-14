import styles from "./about.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VALUES = [
  {
    title: "Strength for everyone",
    copy: "Whatever your starting point, our programming scales to meet you there — no gatekeeping, no ego.",
  },
  {
    title: "Coached, not just supervised",
    copy: "Every session has a coach actively cueing form, not just checking people in at the door.",
  },
  {
    title: "Community over competition",
    copy: "We push each other to hit new numbers, but we're cheering for the person next to us just as loud.",
  },
];

const COACHES = [
  {
    name: "Coach Dana Reyes",
    role: "Head Coach & Founder",
    bio: "Started Forge in a converted warehouse in 2018. USAW-certified, background in collegiate track and field.",
  },
  {
    name: "Coach Marcus Webb",
    role: "Strength & Conditioning",
    bio: "Focuses on powerlifting technique and injury-resilient programming for lifters of all levels.",
  },
  {
    name: "Coach Priya Nair",
    role: "Mobility & Recovery",
    bio: "Runs our recovery workshops and works one-on-one with members carrying nagging tightness or old injuries.",
  },
];

export default function AboutClient() {
  return (
    <>
      <Header />

      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <span className="eyebrow">Our story</span>
          <h1 className={styles.h1}>About Forge Athletic Club</h1>
          <p>
            Forge started because our founder was tired of gyms that were either
            intimidating powerlifting clubs or crowded, coach-less floors. We
            wanted a place where a first-time lifter and a competitive athlete
            could train in the same room, get real coaching, and actually enjoy
            showing up.
          </p>
        </div>
      </section>

      <section className={styles.list}>
        <div className={`container ${styles.listInner}`}>
          <h2 className={styles.sectionTitle}>What we stand for</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <article key={v.title} className={styles.card}>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{v.title}</h3>
                  <p className={styles.cardCopy}>{v.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.list}>
        <div className={`container ${styles.listInner}`}>
          <h2 className={styles.sectionTitle}>Meet the coaches</h2>
          <div className={styles.valuesGrid}>
            {COACHES.map((c) => (
              <article key={c.name} className={styles.card}>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{c.name}</h3>
                  <p className={styles.cardRole}>{c.role}</p>
                  <p className={styles.cardCopy}>{c.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
