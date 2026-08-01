import { useEffect, useState } from "react";
import Head from "next/head";
import EventCard from "@/components/EventCard";
import { Loading, ErrorNotice, EmptyNotice } from "@/components/StateNotice";
import styles from "@/styles/Events.module.css";

const CATEGORIES = [
  "All",
  "Music",
  "Business",
  "Workshop",
  "Technology",
  "Festival",
  "Community",
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [activeCategory, setActiveCategory] = useState("All");

  async function loadEvents(category) {
    setStatus("loading");
    try {
      const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
      const res = await fetch(`/api/events${query}`);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setEvents(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    loadEvents(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <>
      <Head>
        <title>All events — SyaFest</title>
      </Head>

      <section className={`wrap ${styles.header}`}>
        <span className={styles.eyebrow}>Full listing</span>
        <h1 className={styles.title}>Everything happening in Malang &amp; Batu</h1>

        <div className={styles.filters} role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.results}`}>
        {status === "loading" && <Loading />}
        {status === "error" && (
          <ErrorNotice
            message="Couldn't load events right now."
            onRetry={() => loadEvents(activeCategory)}
          />
        )}
        {status === "success" && events.length === 0 && (
          <EmptyNotice message={`No events found in "${activeCategory}" right now.`} />
        )}
        {status === "success" && events.length > 0 && (
          <div className={styles.grid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
