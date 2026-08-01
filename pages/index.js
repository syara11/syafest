import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import EventCard from "@/components/EventCard";
import { Loading, ErrorNotice } from "@/components/StateNotice";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  async function loadEvents() {
    setStatus("loading");
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setEvents(data.slice(0, 3));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
      <Head>
        <title>SyaFest — Find things happening near you</title>
      </Head>

      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <span className={styles.eyebrow}>Malang &amp; Batu · community events</span>
          <h1 className={styles.heroTitle}>
            Every good week
            <br />
            starts with a stub in your pocket.
          </h1>
          <p className={styles.heroSub}>
            SyaFest collects the concerts, workshops, markets, and meetups worth
            showing up for — one ticket stub at a time, no scrolling through
            five different group chats.
          </p>
          <Link href="/events" className={styles.cta}>
            Browse all events
          </Link>
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>Coming up soon</h2>
          <Link href="/events" className={styles.seeAll}>
            See all →
          </Link>
        </div>

        {status === "loading" && <Loading label="Fetching upcoming events…" />}
        {status === "error" && (
          <ErrorNotice
            message="Couldn't load upcoming events."
            onRetry={loadEvents}
          />
        )}
        {status === "success" && (
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
