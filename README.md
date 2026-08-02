# 🚀 StartupSage — Interactive Student Entrepreneurship Simulation Platform

**Official Live Web Application**: **[https://startupsage.vercel.app/](https://startupsage.vercel.app/)**  
**GitHub Repository**: [https://github.com/Ganeshbobbala/StartupSage](https://github.com/Ganeshbobbala/StartupSage)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ganeshbobbala/StartupSage)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganeshbobbala/StartupSage)

StartupSage is an interactive entrepreneurship simulation and startup-learning platform designed specifically for school students (Classes 6 to 12).

---

## 🌟 Key Phase 1 Master Features

- **8 Founder Simulation Stages (20–25 Min Playtime Target)**:
  - **Stage 0 • Spark**: Domain discovery & AI target customer persona mapping across 6 sectors (HealthTech, EdTech, FinTech, AgriTech, D2C, SaaS).
  - **Stage 1 • Idea**: 3 simulated WhatsApp chats (Skeptical Customer 🧐, Domain Expert 🎓, Supportive Friend 🤝) + 1-line idea definition.
  - **Stage 2 • Plan**: 6-Block Lean Canvas + Customer Acquisition Cost (CAC) vs Pricing AI reality check (**Guest Login Wall**).
  - **Stage 3 • Team**: 3 Co-founder profiles + Equity split negotiation slider (e.g. 60% Founder / 40% Team) + **Emotional Check-in #1**.
  - **Stage 4 • Build**: Seed budget allocation engine (₹5,00,000) across Product, Marketing, Hiring, Operations.
  - **Stage 5 • Wall (The Most Important Stage)**: Dark tone shift ("*Something has gone wrong*") + 1 of 8 major crises + **Emotional Check-in #2** + **Embedded Real BPT Founder Voice Note** (*Srushti* on "CTO quitting 2 weeks before launch") + **Freemium Gate ₹299**.
  - **Stage 6 • Growth Grind**: 6-Month user acquisition decision & event engine.
  - **Stage 7 • Crossroads**: Decide startup fate (Raise Funding, Bootstrap, Sell, or Shut Down).
  - **Stage 8 • Outcome**: Debrief metrics, Founder Type (Builder, Hustler, Strategist, Visionary, Survivor), Emotional Resilience Score (0–100), BPT Community bridge.

- **Founder Passport**:
  - Visually beautiful 1080x1080px shareable square image containing Name, Domain, Founder Type, Resilience Score, and Key Decisions.

- **Unified Multi-Role Auth System**:
  - **Student Founder Space**: Interactive 8-stage learning roadmap.
  - **School Admin / Educator Portal**: Grade student Lean Canvases & track cohort metrics (`SAGE-ADMIN-2026`).

---

## 🌐 Live Deployment Links & Guides

### 🚀 Live App
**[https://startupsage.vercel.app/](https://startupsage.vercel.app/)** — The official live deployment of StartupSage is hosted on **Vercel**.

---

### ⚡ 1-Click Netlify Deployment
Click the badge below to deploy directly from your GitHub repository:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ganeshbobbala/StartupSage)

**Manual Netlify Setup**:
1. Open [Netlify Dashboard](https://app.netlify.com) and click **Add new site** -> **Import an existing project**.
2. Select **GitHub** and authorize **`Ganeshbobbala/StartupSage`**.
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. The repository includes `netlify.toml` and `public/_redirects` for single-page application (SPA) client routing.

---

### ⚡ 1-Click Vercel Deployment
Click the badge below to deploy directly from your GitHub repository:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganeshbobbala/StartupSage)

**Manual Vercel Setup**:
1. Open [Vercel Dashboard](https://vercel.com/new).
2. Select **`Ganeshbobbala/StartupSage`** and click **Import**.
3. Framework Preset: **Vite**.
4. The repository includes `vercel.json` for SPA rewrites.

---

## 🛠️ Local Development

### React Web Application (Laptop / Desktop Layout)
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Flutter Mobile Application (Mobile Phone Shell)
```bash
cd mobile
flutter pub get
flutter run -d chrome --web-port 5174
```
Open [http://localhost:5174/](http://localhost:5174/) in your browser.
