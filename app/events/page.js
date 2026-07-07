import styles from "./page.module.css";

export const metadata = {
  title: "Events | Forge Athletic Club",
  description: "Upcoming classes, meets, and workshops at Forge Athletic Club.",
};

// Replace each `formLink` below with your own Google Form URL
// (Google Form → Send → Link icon → copy link).
const EVENTS = [
  {
    day: "12",
    month: "JUL",
    title: "Community Bootcamp",
    time: "7:00 AM – 8:15 AM",
    location: "Main Floor",
    copy: "A partner-based conditioning session open to all fitness levels. Bring a friend — teams of two work best.",
    formLink: "https://forms.google.com/your-bootcamp-form",
  },
  {
    day: "19",
    month: "JUL",
    title: "Forge Powerlifting Meet",
    time: "9:00 AM – 4:00 PM",
    location: "Competition Platform",
    copy: "Squat, bench, and deadlift — raw, single-ply optional. Open and novice divisions, spectators welcome all day.",
    formLink: "https://forms.google.com/your-powerlifting-form",
  },
  {
    day: "26",
    month: "JUL",
    title: "Yoga & Recovery Workshop",
    time: "6:30 PM – 8:00 PM",
    location: "Studio B",
    copy: "A slower-paced session on mobility, breathwork, and recovery for lifters carrying nagging tightness.",
    formLink: "https://forms.google.com/your-yoga-form",
  },
  {
    day: "02",
    month: "AUG",
    title: "Nutrition Fundamentals Seminar",
    time: "6:00 PM – 7:30 PM",
    location: "Lounge",
    copy: "Our head coach breaks down macros, meal timing, and how to eat for the way you actually train.",
    formLink: "https://forms.google.com/your-nutrition-form",
  },
  {
    day: "16",
    month: "AUG",
    title: "Forge 5K Fun Run",
    time: "8:00 AM – 10:00 AM",
    location: "Riverside Park",
    copy: "A timed, non-competitive 5K for members and their families. Entry fees go to our community youth fund.",
    formLink: "https://forms.google.com/your-funrun-form",
  },
  {
    day: "30",
    month: "AUG",
    title: "Open House & New Member Day",
    time: "10:00 AM – 2:00 PM",
    location: "Whole Facility",
    copy: "Tour the floor, meet the coaching staff, and try a free class. First-time visitors get a free week pass.",
    formLink: "https://forms.google.com/your-openhouse-form",
  },
];

export default function EventsPage() {
  return (
    <>
      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <span className="eyebrow">What's on</span>
          <h1 className={styles.h1}>Upcoming Events</h1>
          <p className={styles.lead}>
            Every event below registers through a quick Google Form. Tap
            register, fill it out, and you'll get a confirmation by email.
          </p>
        </div>
        <div className="stripe-divider" />
      </section>

      <section className={styles.list}>
        <div className={`container ${styles.listInner}`}>
          {EVENTS.map((ev) => (
            <article key={ev.title} className={styles.card}>
              <div className={styles.dateChip}>
                <span className={styles.dateDay}>{ev.day}</span>
                <span className={styles.dateMonth}>{ev.month}</span>
              </div>

              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{ev.title}</h2>
                <div className={styles.metaRow}>
                  <span>{ev.time}</span>
                  <span className={styles.metaDot} aria-hidden="true" />
                  <span>{ev.location}</span>
                </div>
                <p className={styles.cardCopy}>{ev.copy}</p>
              </div>

              <div className={styles.cardAction}>
                <a
                  href={ev.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Register
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
