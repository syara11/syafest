import Head from "next/head";
import ContactForm from "@/components/ContactForm";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — SyaFest</title>
      </Head>

      <section className={`wrap ${styles.section}`}>
        <div className={styles.grid}>
          <div>
            <span className={styles.eyebrow}>Get in touch</span>
            <h1 className={styles.title}>Questions, listings, or partnerships</h1>
            <p className={styles.body}>
              Whether you're organizing an event, spotted a mistake on a
              listing, or just want to say hi — send a message and someone
              from the SyaFest team will reply within two working days.
            </p>

            <dl className={styles.info}>
              <div>
                <dt>Email</dt>
                <dd>hello@syafest.events</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>Malang, East Java</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
