# 🌐 Bibek Thandar — Full Stack ePortfolio

> **CET-138 Full Stack Development — Assignment 1**
> An interactive, single-page ePortfolio showcasing the fundamentals of full-stack web development through live, hands-on demos.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-✓-10b981?style=for-the-badge)

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Sections Walkthrough](#-sections-walkthrough)
7. [Interactive Demos](#-interactive-demos)
8. [Keyboard Shortcuts](#-keyboard-shortcuts)
9. [Theming](#-theming)
10. [Accessibility & Performance](#-accessibility--performance)
11. [Browser Support](#-browser-support)
12. [Author](#-author)
13. [License](#-license)

---

## 🎯 Overview

This ePortfolio is a **dashboard-style single-page application** built to demonstrate practical understanding of front-end and full-stack web development concepts. Each section combines an explanation of a core web technology with a **live, working demo** so visitors can interact with the concepts rather than just read about them.

The project uses an **Emerald & Charcoal** colour theme, a collapsible sidebar with scroll-spy navigation, and a fully responsive layout that works on mobile, tablet, and desktop.

---

## ✨ Features

### 🎨 UI / UX
- 🌓 **Dark / Light theme toggle** with `localStorage` persistence
- 📊 **Scroll progress bar** at the top of the page
- 🧭 **Scroll-spy sidebar** that highlights the current section
- 📱 **Mobile-first responsive design** with a slide-in sidebar + backdrop
- ⌨️ **Keyboard shortcuts** for power users
- 🔔 **Toast notifications** for user feedback
- 🪄 **Animated counters** that count up when scrolled into view
- 📈 **Skill bars** that fill on viewport entry
- ✍️ **Typewriter effect** in the hero section
- 🎬 **Full-stack flow animation** (Client → Front-End → Back-End → Database)

### 🧪 Interactive Demos
- 🎨 **Color Palette Generator** — random HSL palette with one-click hex copy
- 🔀 **Layout Switcher** — toggle between Flexbox and CSS Grid live
- 🧮 **Calculator** — fully functional JavaScript calculator
- 😂 **Programming Jokes API** — fetches live jokes from a public REST API
- ✅ **To-Do List** — full CRUD with `localStorage`, bulk actions, and suggested tasks
- 📋 **Copy-to-clipboard** buttons on every code snippet
- 📝 **HTML5 form validation** demo with custom feedback
- 📬 **Contact form** with client-side validation

### 🎯 Code Showcase
- Syntax-highlighted code snippets via **Prism.js**
- Live demos sitting side-by-side with their source code
- Bootstrap 5 components: accordion, cards, grid system

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (semantic elements, ARIA labels) |
| **Styling** | CSS3 (Custom Properties, Flexbox, Grid, animations) |
| **Framework** | Bootstrap 5.3.2 |
| **Logic** | Vanilla JavaScript (ES6+, IIFE pattern, no build step) |
| **Icons** | Bootstrap Icons 1.11.1 |
| **Fonts** | Google Fonts — Poppins + Fira Code |
| **Code Highlighting** | Prism.js |
| **Storage** | `localStorage` (theme + to-do list) |
| **External API** | [official-joke-api.appspot.com](https://official-joke-api.appspot.com) |

---

## 📁 Project Structure

```
ePortfolio/
├── index.html          # Main HTML structure (all sections + demos)
├── style.css           # Emerald & Charcoal theme + responsive layout
├── script.js           # All interactive features (IIFE pattern)
└── README.md           # You are here
```

**No build tools required** — open `index.html` in a browser and everything works.

---

## 🚀 Getting Started

### Option 1 — Just open the file
```bash
# Clone or download the project, then:
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 2 — Run a local server (recommended for the Jokes API)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve .

# Then visit:
# http://localhost:8000
```

> 💡 A local server is recommended because some browsers restrict `fetch()` requests when the page is opened directly via `file://`.

---

## 📚 Sections Walkthrough

| # | Section | What it shows |
|---|---|---|
| 1 | **Overview** | Hero card with typewriter intro + animated stat counters |
| 2 | **About Me** | Personal introduction and learning journey |
| 3 | **Full Stack Development** | Explanation + animated Client → Front-End → Back-End → Database flow |
| 4 | **HTML** | Semantic markup explanation + live form-validation demo |
| 5 | **CSS** | Theming, palette generator, Flex ↔ Grid switcher |
| 6 | **Bootstrap 5** | Accordion explaining grid, components and utilities |
| 7 | **JavaScript** | Calculator + Jokes API + To-Do List trio |
| 8 | **Contact** | Validated contact form |

---

## 🎮 Interactive Demos

### 🎨 Color Palette Generator
Generates 5 harmonious colours using HSL math. Click any swatch to copy the hex code to your clipboard.

### 🔀 Flex ↔ Grid Switcher
Toggles the same set of boxes between `display: flex` and `display: grid` so you can see the layout difference live.

### 🧮 Calculator
A complete arithmetic calculator supporting `+`, `−`, `×`, `÷`, decimals, clear and equals.

### 😂 Jokes API
Fetches a random programming joke from a public REST endpoint — demonstrates `async/await` and the Fetch API.

### ✅ To-Do List
- Add, complete, edit, and delete tasks
- Persists in `localStorage` (survives reloads)
- **Bulk actions:** Complete all · Clear done · Remove all
- **Smart suggestions:** one-click chips to add common tasks
- Live counters for Total / Done / Left

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `T` | Toggle dark / light theme |
| `Esc` | Close mobile sidebar / modal |
| `Enter` | Submit forms · add to-do item |

---

## 🎨 Theming

The whole colour system is driven by **CSS Custom Properties** declared in `:root` and overridden by `[data-theme="light"]`.

```css
:root {
  --brand:      #10b981;   /* Emerald */
  --brand-dark: #059669;
  --bg-page:    #0f172a;   /* Charcoal */
  --bg-card:    #1e293b;
  --text-main:  #f1f5f9;
  /* ...and more */
}
```

Swap any of these variables to instantly re-skin the whole site — no hunting through CSS files.

The chosen theme uses **Poppins** for UI text and **Fira Code** for code snippets, giving a clean modern look with a developer-friendly mono font.

---

## ♿ Accessibility & Performance

- ✅ Semantic HTML5 landmarks (`<header>`, `<aside>`, `<main>`, `<section>`)
- ✅ ARIA labels on icon-only buttons
- ✅ Visible focus styles for keyboard navigation
- ✅ Sufficient colour contrast on both themes
- ✅ `prefers-reduced-motion` respected for animations *(where applicable)*
- ✅ External fonts pre-connected for faster load
- ✅ No build step, no bundler, no framework runtime — pure vanilla speed

---

## 🌐 Browser Support

Tested and working on the latest versions of:

- ✅ Google Chrome / Edge (Chromium)
- ✅ Mozilla Firefox
- ✅ Apple Safari
- ✅ Mobile Chrome & Safari (iOS / Android)

> ES6+ features are used throughout (arrow functions, `async/await`, template literals, `IntersectionObserver`). IE11 is **not** supported.

---

## 👨‍💻 Author

**Bibek Thandar**
Junior Full Stack Developer · CET-138 Student

> *"Built from scratch with HTML, CSS, JavaScript and a lot of curiosity."*

---

## 📄 License

This project was created as an academic submission for **CET-138 Full Stack Development**. Feel free to use it as a learning reference — please credit the author if you re-use significant portions.

```
© 2025 Bibek Thandar — Educational use encouraged.
```

---

<p align="center">
  Made with 💚 using <strong>HTML</strong> · <strong>CSS</strong> · <strong>JavaScript</strong> · <strong>Bootstrap 5</strong>
</p>
