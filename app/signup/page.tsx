// app/signup/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@headlessui/react";
import styles from "./page.module.css";

//random comment

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleStay = () => {
    setShowModal(false);
  };

  const handleGoBack = () => {
    router.push("/login");
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateDetails = {
      userName: userName,
      email: email,
      password: password,
    };

    if (
      !updateDetails.userName ||
      !updateDetails.email ||
      !updateDetails.password
    ) {
      setMessage("One of the fields is empty");
      setShowModal(true);
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/users/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateDetails),
          },
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
        setShowModal(true);
        return;

        console.log(data);

        // Optionally show success message
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong. Please try again.");
        setShowModal(true);
        return;
      }
    }
  };
  return (
    <>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <div className={styles.heading}>
            <h2>Sign up with us</h2>
          </div>

          <form onSubmit={signup} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>

              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "password" : "text"}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={styles.input}
                />

                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.eyeButton}
                ></Button>
              </div>
            </div>

            <Button type="submit" className={styles.signUpButton}>
              Sign Up
            </Button>
          </form>

          <p className={styles.backPrompt}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Sign In
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

                <button onClick={handleGoBack} className={styles.modalButton}>
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
