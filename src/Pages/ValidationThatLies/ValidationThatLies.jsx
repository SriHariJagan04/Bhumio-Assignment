import React, { useState } from "react";
import styles from "./ValidationThatLies.module.css";

const ValidationThatLies = () => {
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
  });

  const [clientErrors, setClientErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isStrict, setIsStrict] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Client-side validation that can be toggled to be more strict, but may not reflect actual server rules
  const validateClient = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (isStrict && !formData.email.endsWith("@company.com")) {
      errors.email = "Email must be @company.com";
    }

    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (Number(formData.amount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    }

    return errors;
  };


  // Simulated server submission that has its own validation rules, which may differ from client-side validation
  const mockServerSubmit = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Number(formData.amount) > 1000) {
          reject("Server rejected: Amount exceeds allowed limit");
        } else {
          resolve("Success");
        }
      }, 1000);
    });


// Handles form submission, performs client-side validation, and simulates server-side submission and error handling. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setServerError("");
    const errors = validateClient();

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});

    try {
      await mockServerSubmit();
      alert("Form submitted successfully");
      setIsSubmitting(false);
    } catch (err) {
      setServerError(err);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Validation That Lies</h2>

      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={isStrict}
          onChange={() => setIsStrict(!isStrict)}
        />
        Enable Strict Email Validation
      </label>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {clientErrors.email && (
            <span className={styles.error}>{clientErrors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          {clientErrors.amount && (
            <span className={styles.error}>{clientErrors.amount}</span>
          )}
        </div>

        {serverError && (
          <div className={styles.serverError}>{serverError}</div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ValidationThatLies;
