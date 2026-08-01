import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";

function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Couldn't create your account. Please try again.";
  }
}

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setStatus("error");
      setError("Please fill in every field.");
      return;
    }
    if (form.password.length < 6) {
      setStatus("error");
      setError("Password should be at least 6 characters.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      router.push("/");
    } catch (err) {
      setStatus("error");
      setError(friendlyError(err.code));
    }
  }

  return (
    <>
      <Head>
        <title>Create account — SyaFest</title>
      </Head>

      <section className={`wrap ${styles.section}`}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>Get started</span>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.sub}>
            Save events, keep track of RSVPs, and check out faster next time.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className={styles.submit} disabled={status === "submitting"}>
              {status === "submitting" ? "Creating account…" : "Create account"}
            </button>

            {status === "error" && <p className={styles.errorMsg}>{error}</p>}
          </form>

          <p className={styles.switch}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </section>
    </>
  );
}
