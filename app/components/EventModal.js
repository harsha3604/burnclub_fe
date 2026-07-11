"use client";

import { useEffect, useState } from "react";
import styles from "./EventModal.module.css";

export default function EventModal({ mode, event, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    locationLink: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    if (!event) return;

    setForm({
      title: event.title || "",
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      location: event.location || "",
      locationLink: event.locationLink || "",
      capacity: event.capacity || "",
      description: event.description || "",
    });
  }, [event]);

  if (!event) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        {/* VIEW */}

        {mode === "view" && (
          <>
            <h2>{event.title}</h2>

            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              <a href={event.locationLink} target="_blank" rel="noreferrer">
                {event.location}
              </a>
            </p>

            <p>
              <strong>Capacity:</strong> {event.capacity}
            </p>

            <p>{event.description}</p>

            <div className={styles.actions}>
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {/* EDIT */}

        {mode === "edit" && (
          <>
            <h2>Update Event</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />

            <input
              name="locationLink"
              value={form.locationLink}
              onChange={handleChange}
              placeholder="Location Link"
            />

            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <div className={styles.actions}>
              <button className="btn btn-primary" onClick={() => onSave(form)}>
                Save
              </button>

              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {/* DELETE */}

        {mode === "delete" && (
          <>
            <h2>Delete Event</h2>

            <p>
              Are you sure you want to delete
              <strong> "{event.title}"</strong>?
            </p>

            <p>This action cannot be undone.</p>

            <div className={styles.actions}>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </button>

              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
