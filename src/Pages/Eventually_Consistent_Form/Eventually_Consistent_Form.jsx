import React, { useState } from "react";
import styles from "./EventuallyConsistentForm.module.css";

const EventuallyConsistentForm = () => {
  const [email, setEmail] = useState(""); // for email
  const [amount, setAmount] = useState(""); // for amount
  const [error, setError] = useState(""); // for form validation errors
  const [status, setStatus] = useState(null); // 'pending', 'success', 'error'
  const [submissions, setSubmissions] = useState([]); // list of submitted items
  const [isSubmitting, setIsSubmitting] = useState(false); // prevent duplicate clicks

  // Mock API function to simulate different responses
  function mockApi({ email, amount }) {
    return new Promise((resolve, reject) => {
      const random = Math.random();

      if (random < 0.1) {
        setTimeout(
          () => resolve({ status: 200, data: { email, amount } }),
          500,
        );
      } else if (random < 0.8) {
        setTimeout(() => reject({ status: 503 }), 500);
      } else {
        setTimeout(
          () => resolve({ status: 200, data: { email, amount } }),
          5000 + Math.random() * 5000,
        );
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("pending");

    // Basic validation
    if (!email || !amount) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    let attempts = 0;
    const maxRetries = 3;

    // Retry logic when API fails temporarily
    while (attempts < maxRetries) {
      attempts++;
      try {
        const res = await mockApi({ email, amount });

        if (res.status === 200) {
          setSubmissions((prev) => {
            // Prevent duplicates in the submissions list
            const exists = prev.some(
              (item) => item.email === email && item.amount === amount,
            );
            return exists ? prev : [ { email, amount }, ...prev];
          });

          setStatus("success");
          setError("");
          setIsSubmitting(false);
          setEmail("");
          setAmount("");
          break;
        }
      } catch (err) {
        if (err.status === 503 && attempts < maxRetries) {
          setStatus(`retrying (${attempts})`);
          await new Promise((r) => setTimeout(r, 1000));
        } else {
          setStatus("error");
          break;
        }
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Submit Form</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          Email:
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </label>

        <label className={styles.label}>
          Amount:
          <input
            type="number"
            className={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
            placeholder="Enter amount"
          />
        </label>

        <button type="submit" className={styles.button}>
          {status === "pending" ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/*  Display submitted items */}
      {submissions.length > 0 && (
        <div className={styles.submissions}>
          <h3>Submitted Items:</h3>

          <ul>
            {submissions.map((item, index) => (
              <li key={index}>
                <p>Email: {item.email}</p>
                <p>Amount: ₹{item.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventuallyConsistentForm;
