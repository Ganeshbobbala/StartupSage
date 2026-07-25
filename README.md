# 🚀 StartupSage — Interactive Student Entrepreneurship Simulation Platform

**GitHub Repository**: [https://github.com/Ganeshbobbala/StartupSage](https://github.com/Ganeshbobbala/StartupSage)

StartupSage is an interactive entrepreneurship simulation and startup-learning platform designed specifically for school students (Classes 6 to 12).

---

## 🌟 Key Features

- **8 Founder Simulation Stages**:
  - **Stage 0 • Spark**: Domain discovery & persona problem mapping across 7 sectors.
  - **Stage 1 • Idea**: Problem-solution fit rating and idea scorecard.
  - **Stage 2 • Plan**: 6-Block Sticky Note Lean Canvas Board.
  - **Stage 3 • Team**: Co-founder recruitment matrix & chemistry builder.
  - **Stage 4 • Build**: Seed budget allocation engine (₹5,00,000).
  - **Stage 5 • Wall**: Crisis simulation & pivot strategy exercise.
  - **Stage 6 • Growth Grind**: 6-Month user acquisition decision engine.
  - **Stage 7 • Strategic Choice**: Founder path decision (Bootstrapped, VC, Social Enterprise, Acquisition).
  - **Stage 8 • Founder Passport**: Digital founder passport badge & printable certificate.

- **Unified Multi-Role Auth System**:
  - **Student Founder Space**: Interactive 8-stage learning roadmap.
  - **School Admin / Educator Portal**: Grade student Lean Canvases & track cohort metrics (`SAGE-ADMIN-2026`).

- **Handcrafted Micro-Interactions**:
  - 180ms tactile button press (`scale(0.97)`).
  - 300ms domain selection lift & checkmark stamp.
  - Customer Reaction Simulator (Skeptical 🧐 -> Thinking 🤔 -> Interested 😊 -> Smiling 😄).
  - StartupSage Wax Seal Milestone Stamp completion overlay.

- **Dual Platform Support**:
  - **React Web App**: Full-width desktop & laptop dashboard layout (`max-w-7xl`).
  - **Flutter Mobile App**: Realistic 390px x 812px Phone Frame Shell with status bar, dynamic island, and home indicator.

---

## 🛠️ Local Development & Running

### React Web Application
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Flutter Mobile Application
```bash
cd mobile
flutter pub get
flutter run -d chrome --web-port 5174
```
Open [http://localhost:5174/](http://localhost:5174/) in your browser.

---

## 🌐 Deployment Instructions

### Deploy to Netlify
1. Connect your GitHub repository: `https://github.com/Ganeshbobbala/StartupSage`
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. The repo includes pre-configured `netlify.toml` and `public/_redirects` for Vite SPA client routing.

### Deploy to Vercel
1. Import GitHub repository: `https://github.com/Ganeshbobbala/StartupSage`
2. Framework Preset: `Vite`
3. The repo includes pre-configured `vercel.json` for SPA rewrites.
