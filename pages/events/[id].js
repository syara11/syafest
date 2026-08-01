import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Loading, ErrorNotice } from "@/components/StateNotice";
import styles from "@/styles/EventDetail.module.css";

function formatFullDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error | notfound

  async function loadEvent(eventId) {
    setStatus("loading");
    try {
      const res = await fetch(`/api/events?id=${encodeURIComponent(eventId)}`);
      if (res.status === 404) {
        setStatus("notfound");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setEvent(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (!id) return;
    loadEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Head>
        <title>{event ? `${event.title} — SyaFest` : "SyaFest"}</title>
      </Head>

      <div className={`wrap ${styles.back}`}>
        <Link href="/events">← Back to all events</Link>
      </div>

      {status === "loading" && <Loading label="Fetching event details…" />}

      {status === "error" && (
        <div className="wrap">
          <ErrorNotice
            message="Couldn't load this event."
            onRetry={() => loadEvent(id)}
          />
        </div>
      )}

      {status === "notfound" && (
        <div className={`wrap ${styles.notFound}`}>
          <h1>Event not found</h1>
          <p>This ticket stub doesn&apos;t match anything in our listing.</p>
          <Link href="/events" className={styles.backCta}>
            Browse all events
          </Link>
        </div>
      )}

      {status === "success" && event && (
        <article className={`wrap ${styles.article}`}>
          <div
            className={styles.hero}
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <span className={styles.category}>{event.category}</span>
          </div>

          <div className={styles.layout}>
            <div className={styles.main}>
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.summary}>{event.summary}</p>
              <p className={styles.description}>{event.description}</p>
            </div>

            <aside className={styles.ticket}>
              <div className={styles.ticketRow}>
                <span>Date</span>
                <strong>{formatFullDate(event.date)}</strong>
              </div>
              <div className={styles.ticketRow}>
                <span>Time</span>
                <strong>{event.time} WIB</strong>
              </div>
              <div className={styles.ticketRow}>
                <span>Location</span>
                <strong>{event.location}</strong>
              </div>
              <div className={styles.perforation} aria-hidden="true" />
              <div className={styles.ticketRow}>
                <span>Price</span>
                <strong className={styles.price}>{event.price}</strong>
              </div>
              <div className={styles.ticketRow}>
                <span>Seats left</span>
                <strong>
                  {event.seatsLeft} / {event.seats}
                </strong>
              </div>
              <button className={styles.reserve} type="button">
                Reserve a spot
              </button>
            </aside>
          </div>
        </article>
      )}
    </>
  );
}
