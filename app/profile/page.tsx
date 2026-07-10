"use client";

import styles from "../profile/page.module.css";
import { useAuth } from "../context/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className={styles.profile}>
        <div className="container">
          <p className={styles.loading}>Loading profile...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className={styles.profile}>
        <div className="container">
          <div className={styles.card}>
            <h1 className={styles.title}>Profile</h1>
            <p className={styles.message}>You are not logged in.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className={styles.profile}>
        <div className="container">
          <div className={styles.card}>
            <h1 className={styles.title}>Profile</h1>

            <div className={styles.info}>
              <div className={styles.row}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.userName}</span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{user.email}</span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Role</span>
                <span className={styles.value}>{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
