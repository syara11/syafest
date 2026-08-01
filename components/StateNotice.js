import styles from "@/components/StateNotice.module.css";

export function Loading({ label = "Loading events…" }) {
  return (
    <div className={styles.notice} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorNotice({ message, onRetry }) {
  return (
    <div className={`${styles.notice} ${styles.error}`} role="alert">
      <p>{message || "Something went wrong while loading events."}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyNotice({ message }) {
  return (
    <div className={styles.notice}>
      <p>{message || "Nothing to show here yet."}</p>
    </div>
  );
}
