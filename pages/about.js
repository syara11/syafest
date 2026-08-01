import Head from "next/head";
import styles from "@/styles/About.module.css";

const VALUES = [
  {
    title: "Local first",
    body: "We only list events happening within Malang and Batu. No livestreams, no far-off cities — just what's actually reachable this weekend.",
  },
  {
    title: "Real seat counts",
    body: "Every listing shows how many seats are actually left, pulled from the organizer's own headcount, not a marketing estimate.",
  },
  {
    title: "Built for organizers too",
    body: "Small studios, campus clubs, and independent vendors can list an event without a sales call or a monthly fee.",
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — SyaFest</title>
      </Head>

      <section className={`wrap ${styles.intro}`}>
        <span className={styles.eyebrow}>About SyaFest</span>
        <h1 className={styles.title}>
          A smaller, more honest way to find out what&apos;s happening.
        </h1>
        <p className={styles.lede}>
          SyaFest started in 2025 as a shared spreadsheet between three friends
          tired of missing good events buried in Instagram stories. It's now
          a small, independent listing site covering Malang and Batu — still
          run by people who go to the events themselves.
        </p>
      </section>

      <section className={`wrap ${styles.values}`}>
        {VALUES.map((value) => (
          <div key={value.title} className={styles.valueCard}>
            <h3>{value.title}</h3>
            <p>{value.body}</p>
          </div>
        ))}
      </section>

      <section className={`wrap ${styles.stats}`}>
        <div>
          <span className={styles.statNumber}>180+</span>
          <span className={styles.statLabel}>events listed since launch</span>
        </div>
        <div>
          <span className={styles.statNumber}>2</span>
          <span className={styles.statLabel}>cities covered</span>
        </div>
        <div>
          <span className={styles.statNumber}>0</span>
          <span className={styles.statLabel}>listing fees charged</span>
        </div>
      </section>
    </>
  );
}
