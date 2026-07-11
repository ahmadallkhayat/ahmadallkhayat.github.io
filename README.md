# Developer Portfolio Website

A high-end, responsive, single-page developer portfolio website presenting engineering projects, skills, and experience. It is optimized for zero-dependency static deployment to GitHub Pages.

---

## 🛠️ Tech Stack & Design Aesthetics

* **Core Structure:** Vanilla HTML5 (semantic layout).
* **Styling:** Custom HSL variables, fluid typography, glassmorphism containers, responsive grids, and linear/gradient accent borders.
* **Interactivity:**
  * Dynamic project card filter grid.
  * Cursor-following mouse glow effect on skill cards using inline CSS custom properties mapping.
  * Interactive retro command-line interface (CLI) terminal simulator where visitors can query your profile.
* **Typography:** `Outfit` (headings & body) and `Fira Code` (terminal commands) imported from Google Fonts.

---

## 🚀 How to Run Locally

You can serve this static directory using any simple HTTP server:

### Option A: Python (Fastest)
Run the following in the portfolio directory:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

### Option B: Node.js (http-server)
Install and run `http-server` globally:
```bash
npm install -g http-server
http-server -p 8000
```
Then visit `http://localhost:8000`.

---

## 🌍 GitHub Pages Deployment

1. Create a new public repository on GitHub named `portfolio` (or make it the user's root repository `<username>.github.io`).
2. Push this local directory to the repository:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: portfolio launch"
   git remote add origin https://github.com/ahmadallkhayat/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository:
   * Go to **Settings** -> **Pages**.
   * Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and `/root`.
   * Click **Save**.
4. The portfolio will be live at `https://ahmadallkhayat.github.io/portfolio/`.

---

## 🛡️ License

All rights reserved — Portfolio © 2026.
