import Link from "next/link";
import styles from "@/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={styles.brand}>SyaFest</p>
          <p className={styles.tagline}>
            Community events across Malang &amp; Batu, one stub at a time.
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Explore</p>
          <Link href="/events">All events</Link>
          <Link href="/about">About SyaFest</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>For organizers</p>
          <a href="mailto:hello@syafest.events">hello@syafest.events</a>
          <span>Malang, East Java</span>
        </div>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} SyaFest. Built as a course project.</span>
      </div>
    </footer>
  );
}
