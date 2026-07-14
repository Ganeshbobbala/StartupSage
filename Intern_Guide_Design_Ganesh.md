# Design Developer Guide - Ganesh
**Role:** You own everything the student sees. You will build out the UI/UX in Figma first, and later implement it in Flutter.

## Expected Outputs & Deliverables (Week 1)

### Day 1: Environment Setup
*   **Goal:** Get your design and development tools ready.
*   **Tasks:**
    *   Clone the GitHub repository and checkout the `ganesh/design` branch.
    *   Install Figma desktop app and create a "StartupSage — Design System" file.
    *   Install Flutter and resolve any `flutter doctor` issues.
    *   Read the StartupSage 3-phase plan and understand the flow.
*   **Deliverable:** Screenshot of `flutter --version`, screenshot of your blank Figma file, and update Notion.

### Day 2: Design System Foundation
*   **Goal:** Build a robust design system in Figma. Do not skip this; it's the foundation for all future screens.
*   **Tasks:**
    *   Define Colour Palette (BPT Orange, Neutrals, Semantic colors, Domain colours).
    *   Define Typography (Plus Jakarta Sans for headings, Inter for body).
    *   Create Reusable Components: Primary/Secondary Buttons, Domain Badges, Stage Badges, Content Cards, Bottom Navigation Bar, Input Fields, Progress Bar.
*   **Deliverable:** Figma link containing colours, typography, and all 8 core components. Screenshot of your Figma components panel.

### Day 3: Design Stage 0 (The Spark)
*   **Goal:** Design the opening flow where a student selects a problem domain.
*   **Tasks:** (Mobile dimensions: 390x844px)
    *   Frame 1: Splash / Opening Screen.
    *   Frame 2: Domain Selection (Default state - grid of 7 domains).
    *   Frame 3: Domain Selection (Selected state).
    *   Frame 4: Problem Discovery (3 scenario cards based on the selected domain).
    *   Frame 5: Problem Selected + Emotional Hook full-screen moment.
*   **Deliverable:** Share the updated Figma link with all 5 frames completed.

### Day 4: Design Stage 1 (The Idea) & Reusable Components
*   **Goal:** Design the idea generation phase and create essential reusable decision components.
*   **Tasks:**
    *   Frame 1: Idea Generation (3 idea cards with virtual customer reactions: Skeptical, Neutral, Interested).
    *   Frame 2: Idea Selected State.
    *   Design the Reusable Decision Component (used in every stage).
    *   Design the Reusable Emotional Check-in Component (used in Stages 3, 5, 6).
*   **Deliverable:** Stage 1 frames completed, Decision & Emotional Check-in components added to your library.

### Day 5: Design Stage 2 (The Plan) & Cleanup
*   **Goal:** Design the Business Model Canvas flow, clean up all files, and link a prototype.
*   **Tasks:**
    *   Frame 1: Business Model Canvas (Empty State with 6 input cards).
    *   Frame 2: Canvas Filled State.
    *   Frame 3: AI Reality Check (Animated slide-up card with challenge and 3 options).
    *   Frame 4: Stage 2 Complete (Lesson learned).
    *   Cleanup: Ensure all frames use design system components, correct 8px spacing, and typography.
    *   Create a simple click-through prototype linking Stage 0 -> Stage 1 -> Stage 2.
*   **Deliverable:** Cleaned up Figma file with all Stage 0-2 frames and a working click-through prototype.
