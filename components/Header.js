import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/components/Header.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const { user, authLoading, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>S</span>
          <span>SyaFest</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? router.pathname === "/"
                : router.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${active ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.authArea}>
          {authLoading ? null : user ? (
            <>
              <span className={styles.userName}>
                {user.displayName || user.email}
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginLink}>
                Log in
              </Link>
              <Link href="/register" className={styles.registerBtn}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
