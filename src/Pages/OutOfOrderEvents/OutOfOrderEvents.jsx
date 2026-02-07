import React, { useState } from "react";
import styles from "./OutOfOrderEvents.module.css";

const mockEvents = [
  { id: "1", timestamp: 1, type: "created" },
  { id: "2", timestamp: 2, type: "created" },
  { id: "1", timestamp: 3, type: "updated" },
  { id: "1", timestamp: 2, type: "updated" }, // late event (ignored)
  { id: "2", timestamp: 4, type: "deleted" },
  { id: "2", timestamp: 5, type: "updated" }, // should never reappear
];

const OutOfOrderEvents = () => {
  const [items, setItems] = useState({});
  const [lastTimestamps, setLastTimestamps] = useState({});
  const [eventIndex, setEventIndex] = useState(0);

  const processNextEvent = () => {
    if (eventIndex >= mockEvents.length) return;

    const event = mockEvents[eventIndex];

    setItems((prevItems) => {
      const lastTs = lastTimestamps[event.id] ?? -1;

      // Ignore late or duplicate events
      if (event.timestamp <= lastTs) return prevItems;

      const updatedItems = { ...prevItems };

      if (event.type === "deleted") {
        delete updatedItems[event.id];
      } else {
        updatedItems[event.id] = {
          id: event.id,
          status: event.type,
        };
      }

      return updatedItems;
    });

    setLastTimestamps((prev) => ({
      ...prev,
      [event.id]: event.timestamp,
    }));

    setEventIndex((i) => i + 1);
  };

  return (
    <div className={styles.container}>
      <h2>Out of Order Events</h2>

      <button onClick={processNextEvent} className={styles.button} disabled={eventIndex >= mockEvents.length}>
        {eventIndex < mockEvents.length ? "Process Next Event" : "All Events Processed"}
      </button>

      <div className={styles.events}>
        <h3>Active Items</h3>

        {Object.keys(items).length === 0 && (
          <p className={styles.empty}>No active items</p>
        )}

        <ul>
          {Object.values(items).map((item) => (
            <li key={item.id} className={styles.item}>
              Item {item.id} – {item.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OutOfOrderEvents;
