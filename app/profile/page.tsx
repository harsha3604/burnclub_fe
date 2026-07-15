"use client";

import { useState } from "react";
import styles from "../profile/page.module.css";
import { useAuth } from "../context/context";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_FRONTEND_URL || "";

export default function Profile() {
  const { user, loading } = useAuth();
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <>
        <Header />
        <section className={styles.profile}>
          <div className="container">
            <p className={styles.loading}>Loading profile...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <section className={styles.profile}>
          <div className="container">
            <div className={styles.card}>
              <h1 className={styles.title}>Profile</h1>
              <p className={styles.message}>You are not logged in.</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const imageSrc = user.image
    ? `${API_BASE}${user.image.replace(/^\//, "")}`
    : null;

  return (
    <>
      <Header />
      <section className={styles.profile}>
        <div className="container">
          <div className={styles.card}>
            <h1 className={styles.title}>Profile</h1>

            <div className={styles.layout}>
              <div className={styles.imageCol}>
                {imageSrc ? (
                  <button
                    type="button"
                    className={styles.avatarButton}
                    onClick={() => setExpanded(true)}
                    aria-label="View larger profile image"
                  >
                    <img
                      src={imageSrc}
                      alt={user.userName}
                      className={styles.avatar}
                    />
                  </button>
                ) : (
                  <div className={styles.avatarFallback}>
                    {user.userName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>

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

                <div className={styles.row}>
                  <span className={styles.label}>Phone Number</span>
                  <span className={styles.value}>
                    {user.phoneNumber || "Not provided"}
                  </span>
                </div>

                <div className={styles.row}>
                  <span className={styles.label}>Age</span>
                  <span className={styles.value}>
                    {user.age ?? "Not provided"}
                  </span>
                </div>

                <div className={styles.row}>
                  <span className={styles.label}>Gender</span>
                  <span className={styles.value}>
                    {user.gender
                      ? user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)
                      : "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {expanded && imageSrc && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setExpanded(false)}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setExpanded(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={imageSrc}
            alt={user.userName}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )} */}

      <Footer />
    </>
  );
}
