import Link from "next/link";
import styles from "@/components/EventCard.module.css";

function formatDate(iso) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

export default function EventCard({ event }) {
  const { day, month } = formatDate(event.date);
  const lowSeats = event.seatsLeft <= event.seats * 0.1;

  return (
    <Link href={`/events/${event.id}`} className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <span className={styles.category}>{event.category}</span>
      </div>

      <div className={styles.stub}>
        <div className={styles.dateBlock}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
        </div>

        <div className={styles.perforation} aria-hidden="true" />

        <div className={styles.info}>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.location}>{event.location}</p>
          <div className={styles.meta}>
            <span className={styles.price}>{event.price}</span>
            <span className={lowSeats ? styles.seatsLow : styles.seats}>
              {event.seatsLeft} seats left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
