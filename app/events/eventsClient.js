"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/context"; // adjust path if different

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}/api/events/`, {
    ...options,
    credentials: "include", // send the auth cookie, matches AuthContext
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data.message || data.error || `Request failed (${res.status})`,
    );
  }
  return data;
}

function splitDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return { day, month, time };
}

export default function EventsClient() {
  const { user, loading: authLoading } = useAuth();

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`/api/events?page=${page}`);
      setEvents(data.events || []);
      setTotalPages(data.totalPages || 1);
      setTotalEvents(data.totalEvents || 0);
      setCurrentPage(data.currentPage || page);
      console.log("loaded", events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait for auth to resolve first since /events requires verifyLogin
    if (!authLoading) {
      loadEvents(1);
    }
  }, [authLoading, loadEvents]);

  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    loadEvents(page);
  }
  return (
    <>
      <Header />
      <section className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <span className="eyebrow">What's on</span>
          <h1 className={styles.h1}>Upcoming Events</h1>
          <p className={styles.lead}>
            Everything happening at Forge Athletic Club, straight from the
            calendar.
          </p>
        </div>
        <div className="stripe-divider" />
      </section>
      <section className={styles.list}>
        <div className={`container ${styles.listInner}`}>
          {(authLoading || loading) && <p>Loading events…</p>}
          {!authLoading && !loading && error && (
            <p style={{ color: "crimson" }}>Couldn't load events: {error}</p>
          )}
          {!authLoading && !loading && !error && events.length === 0 && (
            <p>No events scheduled right now — check back soon.</p>
          )}
          {!authLoading &&
            !loading &&
            !error &&
            events.map((ev) => {
              return (
                <>
                  <article key={ev.id} className={styles.card}>
                    <div className={styles.dateChip}>
                      <span className={styles.dateDay}>{day}</span>
                      <span className={styles.dateMonth}>{month}</span>
                    </div>

                    <div className={styles.cardBody}>
                      <h2 className={styles.cardTitle}>{ev.title}</h2>
                      <div className={styles.metaRow}>
                        <span>{time}</span>
                        <span className={styles.metaDot} aria-hidden="true" />
                        <span>{ev.location}</span>
                        <span className={styles.metaDot} aria-hidden="true" />
                        <span>Capacity: {ev.capacity}</span>
                      </div>
                      {ev.description && (
                        <p className={styles.cardCopy}>{ev.description}</p>
                      )}
                    </div>
                    {ev.locationLink && (
                      <div
                        className={styles.cardAction}
                        href={ev.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <a>Map</a>
                      </div>
                    )}
                  </article>
                </>
              );
            })}
          {!authLoading && !loading && !error && totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                ← Prev
              </button>
              <span>
                Page {currentPage} of {totalPages} ({totalEvents} events)
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
