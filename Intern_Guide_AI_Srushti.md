# AI Developer Guide - Srushti
**Role:** You own the AI brain of StartupSage. This includes scenario logic, scoring algorithms, and Claude API prompts.

## Expected Outputs & Deliverables (Week 1)

### Day 1: Setup & Simulation Deep Dive
*   **Goal:** Setup environment and understand the simulation logic end-to-end.
*   **Tasks:** 
    *   Set up Python environment in the `ai/` folder.
    *   Install packages: `anthropic`, `scikit-learn`, `numpy`, `pytest`, `python-dotenv`.
    *   Write a basic `test_connection.py` to ensure Claude API is working.
    *   Deep read the Phase 1 documentation.
*   **Deliverable:** Screenshot of `test_connection.py` running successfully, and a 1-page Google Doc summarizing your understanding of the simulation.

### Day 2: Scenario Assignment Engine (Stage 5)
*   **Goal:** Build the logic that decides which of the 8 "Wall" crises a student faces based on their Stage 0-4 decisions.
*   **Tasks:**
    *   Create `ai/scenario_engine/scenario_engine.py`.
    *   Define `DECISION_INPUT` and `SCENARIO_OUTPUT` structures.
    *   Define the 8 Wall scenarios as constants (e.g., CTO Quits, Marketing Channel Died).
    *   Write the `assign_wall_scenario(decisions)` function with priority logic (Domain triggers -> Co-founder triggers -> Budget triggers -> Default).
    *   Write 10 unit tests.
*   **Deliverable:** Code pushed to your branch, and a screenshot of all 10 tests passing.

### Day 3: Founder Archetype Classifier
*   **Goal:** Build the classifier that runs at Stage 8 to determine the student's founder type.
*   **Tasks:**
    *   Create `ai/scoring/archetype_classifier.py`.
    *   Define 5 archetypes: Visionary, Hustler, Strategist, Community Builder, Operator.
    *   Write `classify_archetype(decisions, emotional_checkins)` function.
    *   Score each archetype 0-100 based on decision patterns, and pick the highest.
    *   Write 5 unit tests (one clearly targeting each archetype).
*   **Deliverable:** Code pushed to your branch, and a screenshot of all 5 tests passing.

### Day 4: Entrepreneurial Skills Score (First 5 Dimensions)
*   **Goal:** Begin building the complex 10-dimension skill scoring module.
*   **Tasks:**
    *   Create `ai/scoring/skills_score.py` with `compute_skills_score()` function.
    *   Implement the first 5 dimensions: **Confidence, Leadership, Communication, Problem Solving, Creativity**.
    *   Write 3 tests covering different student profiles (e.g., confident creative, cautious operator).
*   **Deliverable:** Code pushed, screenshot of pytest passing for the first 5 dimensions.

### Day 5: Skills Score (Last 5 Dimensions & Integration)
*   **Goal:** Finish the scoring module and integrate everything.
*   **Tasks:**
    *   Implement the last 5 dimensions: **Innovation, Teamwork, Execution, Resilience, Decision Making**.
    *   Calculate the weighted overall score (execution, resilience, decision making weighted at 1.3x).
    *   Write 3 integration tests testing the overall score.
*   **Deliverable:** Complete `skills_score.py` pushed to your branch, screenshot of all tests passing, and a Pull Request raised to `dev`.
