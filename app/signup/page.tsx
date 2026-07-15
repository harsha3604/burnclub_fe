// app/signup/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@headlessui/react";
import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setMessage("One of the fields is empty");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("age", age);
    formData.append("gender", gender);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/users/create`,
        {
          method: "POST",
          // No Content-Type header — the browser sets the correct
          // multipart/form-data boundary automatically for FormData.
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <>
      <Header />
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

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age" className={styles.label}>
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gender" className={styles.label}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                Profile Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={handleImageChange}
                className={styles.input}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: "0.5rem",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
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
      <Footer />
    </>
  );
}
