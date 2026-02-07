
# Multi‑Assignment React Application

## Overview
This is a single React application that contains multiple assignments, each available on its own page using routing.
The goal is to demonstrate handling of async behavior, data consistency, validation, and edge cases in real‑world systems.

Assignments included:
- Eventually Consistent Form
- Out of Order Events
- Validation That Lies

---

## 1. Eventually Consistent Form

### State Transitions
- Idle: Initial state before submission
- Pending: Shown immediately after submit
- Retrying: API failed temporarily (503), retry in progress
- Success: Submission completed successfully
- Error: Retries exhausted or non‑recoverable error

### Retry Logic
- Retries only on temporary failures (503)
- Maximum of 3 retry attempts
- 1 second delay between retries
- Prevents infinite retry loops

### Duplicate Prevention
- Submit button disabled while request is in progress
- Existing submissions checked using email + amount
- Duplicate records are never added to the UI

### Edge Cases Handled
- Temporary API failures
- Delayed success responses
- Rapid or double submissions
- Duplicate API responses

---

## 2. Out of Order Events

### Core Logic
- Events are processed in arrival order
- Latest timestamp per item is tracked
- Older or duplicate events are ignored

### Edge Cases Handled
- Out‑of‑order events
- Duplicate events
- Late updates after deletion
- Deleted items never reappear

---

## 3. Validation That Lies

### Validation Flow
- Client‑side validation runs first
- Validation rules change dynamically
- Server performs final validation independently

### Error Handling
- Client errors shown near fields
- Server errors shown separately
- User input preserved on errors

### Edge Cases Handled
- Client validation passes but server rejects
- Dynamic validation rule changes
- Preventing duplicate submissions
- Maintaining form state on failure

---

## Tech Stack
- React
- React Router
- CSS Modules
- JavaScript (async/await)

---

## How to Run
npm install  
npm start
