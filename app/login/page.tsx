"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/context";
import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleStay = () => {
    setShowModal(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !pass) {
        setMessage("Empty Credentials");
        setShowModal(true);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // include cookies
            body: JSON.stringify({ email, password: pass }),
          },
        );

        console.log(response.ok);

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          router.push("/");
        } else {
          throw new Error("Incorrect Creds");
        }
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setShowModal(true);
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.heading}>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-black">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordHeader}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>

                  <Link href="#" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>

                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "password" : "text"}
                    autoComplete="current-password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                    className={styles.input}
                  />

                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.eyeButton}
                  >
                    {/* SVG */}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                onClick={handleLogin}
                className={styles.signInButton}
              >
                Sign In
              </Button>
            </form>

            <p className={styles.signUpPrompt}>
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-semibold text-indigo-500 hover:text-indigo-400"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {showModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h3 className={styles.modalTitle}>Notice</h3>

                <p className={styles.modalMessage}>{message}</p>

                <div className={styles.modalActions}>
                  <button onClick={handleStay} className={styles.modalButton}>
                    Stay Here
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
