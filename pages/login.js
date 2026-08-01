import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";

function friendlyError(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Couldn't log you in. Please try again.";
  }
}

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setStatus("error");
      setError("Please fill in both fields.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      await login(form.email.trim(), form.password);
      router.push("/");
    } catch (err) {
      setStatus("error");
      setError(friendlyError(err.code));
    }
  }

  return (
    <>
      <Head>
        <title>Log in — SyaFest</title>
      </Head>

      <section className={`wrap ${styles.section}`}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>Welcome back</span>
          <h1 className={styles.title}>Log in to SyaFest</h1>
          <p className={styles.sub}>Pick up where you left off.</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                placeholder="Your password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className={styles.submit} disabled={status === "submitting"}>
              {status === "submitting" ? "Logging in…" : "Log in"}
            </button>

            {status === "error" && <p className={styles.errorMsg}>{error}</p>}
          </form>

          <p className={styles.switch}>
            Don&apos;t have an account? <Link href="/register">Create one</Link>
          </p>
        </div>
      </section>
    </>
  );
}
