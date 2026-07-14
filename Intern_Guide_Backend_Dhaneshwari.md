# Backend Developer Guide - Dhaneshwari
**Role:** You own the Flask backend and the Supabase database integration. Every API endpoint is yours.

## Expected Outputs & Deliverables (Week 1)

### Day 1: Environment Setup
*   **Goal:** Get your Python/Flask environment running and push the initial skeleton.
*   **Tasks:**
    *   Clone the repository and checkout the `dhanesh/backend` branch.
    *   Set up a Python virtual environment in the `backend/` folder.
    *   Install `flask`, `flask-cors`, `supabase`, `python-dotenv`, `pytest`.
    *   Create the basic Flask app skeleton in `backend/app/__init__.py` and `backend/run.py`.
    *   Build a simple `/health` GET endpoint.
*   **Deliverable:** Screenshot of `http://localhost:5000/health` working in browser, `requirements.txt` file contents, and code pushed to your branch.

### Day 2: Supabase Connection & Admin API
*   **Goal:** Connect Flask to Supabase and create the first API to register schools.
*   **Tasks:**
    *   Create `backend/app/utils/supabase_client.py` and test the connection.
    *   Build `POST /api/admin/schools` to register schools and auto-generate school codes (e.g., BPT-DPS-2026).
    *   Handle errors properly (e.g., missing fields, duplicate names).
    *   Write 3 unit tests in `backend/tests/test_admin.py`.
*   **Deliverable:** Screenshot of `POST /api/admin/schools` working in Postman, screenshot of pytest passing, and code pushed.

### Day 3: Student Registration & Session API
*   **Goal:** Allow students to register and start a simulation session.
*   **Tasks:**
    *   Build `POST /api/students/register` (validates school code, checks for duplicates, creates student record).
    *   Build `POST /api/sessions/start` (validates student, checks for active sessions, creates `simulation_sessions` row).
    *   Write tests covering valid and invalid registrations and sessions.
*   **Deliverable:** Postman screenshots of both APIs succeeding, pytest screenshots showing all tests passing, and code pushed.

### Day 4: Save Stage Decisions & Progress APIs
*   **Goal:** Build the core engine APIs that save decisions as the student plays, and fetch their progress.
*   **Tasks:**
    *   Build `GET /api/sessions/:sessionId/progress` to return the current state of a session.
    *   Build `POST /api/sessions/:sessionId/save-stage` (merges new decisions into JSONB, updates current stage, handles completion).
    *   Build `POST /api/scenarios/assign` which imports and triggers Srushti's AI scenario engine module to get the Wall crisis.
*   **Deliverable:** Postman screenshots showing `GET /progress` and `POST /scenarios/assign` working, and code pushed.

### Day 5: Offline Challenge API & PR Cleanup
*   **Goal:** Build the challenge submission endpoint, clean up the codebase, and open a Pull Request.
*   **Tasks:**
    *   Build `POST /api/challenges/submit` to record offline challenge submissions (Supabase storage URL + notes).
    *   Code Cleanup: Replace all `print()` statements with standard Python `logging`.
    *   Add docstrings to all functions (what it does, args, returns).
    *   Ensure all API error responses follow a consistent format: `{ "error": "...", "code": "..." }`.
    *   Raise a Pull Request from `dhanesh/backend` to `dev` with a clear description and instructions on how to test.
*   **Deliverable:** Code pushed, PR raised, and Postman collection exported as JSON and shared.
