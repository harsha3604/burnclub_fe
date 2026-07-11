"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/context"; // adjust path if different
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventModal from "../components/EventModal";

const API_BASE = process.env.NEXT_PUBLIC_FRONTEND_URL || "";

// Helper function to fetch data from the API
async function apiFetch(path, options = {}) {
  console.log(`${API_BASE}${path}`);

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  console.log(data);

  if (!res.ok) {
    throw new Error(
      data.message || data.error || `Request failed (${res.status})`,
    );
  }

  return data;
}

//spit the date into day, month, and time for display
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
  //routing and user
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  //state variables for events and pagination
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // state variables (read, update, delete, register modals)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "view" | "edit" | "delete"
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  //load events from the API
  const loadEvents = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`api/events?page=${page}`);
      setEvents(data.events || []);
      setTotalPages(data.totalPages || 1);
      setTotalEvents(data.totalEvents || 0);
      setCurrentPage(data.currentPage || page);
      data.events.forEach((e) => console.log(e.title, e.isRegistered));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait for auth to resolve first since /events requires verifyLogin
    if (!authLoading) {
      console.log("About to load events");
      loadEvents(1);
    }
  }, [authLoading, loadEvents]);

  //pagination handler
  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    loadEvents(page);
  }

  //close and open modal handlers
  const openModal = (mode, event) => {
    setModalMode(mode);
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedEvent(null);
  };

  // Update Event
  async function updateEvent(eventId, eventData) {
    try {
      const res = await fetch(`${API_BASE}api/events/${eventId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await res.json().catch(() => ({}));
      console.log("Status:", res.status);
      console.log("Data:", data);

      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Request failed (${res.status})`,
        );
      }

      return data;
    } catch (err) {
      console.error("Failed to update event:", err);
      throw err;
    }
  }

  // Delete Event
  async function deleteEvent(eventId) {
    try {
      const res = await fetch(`${API_BASE}api/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Request failed (${res.status})`,
        );
      }

      return data;
    } catch (err) {
      console.error("Failed to delete event:", err);
      throw err;
    }
  }

  //Register Event
  async function registerEvent(eventId) {
    try {
      const res = await fetch(
        `${API_BASE}api/events/${eventId}/registrations`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Request failed (${res.status})`,
        );
      }

      return data;
    } catch (err) {
      console.error("Failed to register for event:", err);
      throw err;
    }
  }

  //deRegister event
  async function deRegisterEvent(eventId) {
    try {
      const res = await fetch(
        `${API_BASE}api/events/${eventId}/registrations`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Request failed (${res.status})`,
        );
      }

      return data;
    } catch (err) {
      console.error("Failed to register for event:", err);
      throw err;
    }
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
              const { day, month, time } = splitDate(ev.date);
              return (
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
                      <Link
                        href={ev.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          <u>{ev.location}</u>
                        </span>
                      </Link>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span>
                        {ev.registeredCount}/{ev.capacity} registered
                      </span>
                      {/* <span>Slots: {ev.capacity}</span>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span>Remaining: {ev.seatsLeft}</span> */}
                    </div>
                    {/* {ev.description && (
                      <p className={styles.cardCopy}>{ev.description}</p>
                    )} */}
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal("view", ev)}
                    >
                      View
                    </button>
                    {user?.role === "founder" && (
                      <>
                        <button
                          className="btn btn-secondary"
                          onClick={() => openModal("edit", ev)}
                        >
                          Update
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => openModal("delete", ev)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {user?.role !== "founder" &&
                      (ev.isRegistered ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => openModal("deregister", ev)}
                        >
                          DeRegister
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => openModal("register", ev)}
                        >
                          Register
                        </button>
                      ))}
                  </div>
                </article>
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
              {/* <span>
                Page {currentPage} of {totalPages} ({totalEvents} events)
              </span> */}
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
      <EventModal
        mode={modalMode}
        event={selectedEvent}
        onClose={closeModal}
        onSave={async (form) => {
          try {
            await updateEvent(selectedEvent.id, form);
            closeModal();
            loadEvents(currentPage);
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
        }}
        onDelete={async (id) => {
          try {
            await deleteEvent(id);
            closeModal();
            await loadEvents(currentPage);
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
        }}
        onRegister={async (id) => {
          try {
            await registerEvent(id);
            closeModal();
            await loadEvents(currentPage);
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
        }}
        onDeRegister={async (id) => {
          try {
            await deRegisterEvent(id);
            closeModal();
            await loadEvents(currentPage);
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
        }}
      />
      <Footer />
    </>
  );
}
