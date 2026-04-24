<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
  <img alt="Remotion" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif" width="400">
</picture>

# MyVideo

**Programmatic video compositions built with [Remotion](https://remotion.dev) & React**

[![Remotion](https://img.shields.io/badge/Remotion-4.0-5851DB?style=flat-square&logo=react)](https://remotion.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=flat-square)](LICENSE)

</div>

---

## 📖 About

MyVideo is a collection of high-quality, code-driven marketing & product videos rendered entirely in React using the Remotion framework. Each composition is designed as a standalone module—making it easy to customize, extend, and render pixel-perfect videos at any resolution.

### 🎬 Compositions

| Composition        | Description                             | Duration | Resolution  |
| ------------------ | --------------------------------------- | -------- | ----------- |
| **MarketingVideo** | Personal portfolio marketing showcase   | ~47 s    | 1920 × 1080 |
| **ExpenseIQ**      | Product promo for ExpenseIQ finance app | ~29 s    | 1920 × 1080 |
| **Clix**           | Product promo for Clix AI platform      | ~37 s    | 1920 × 1080 |
| **Ore**            | Product promo for Ore AI creative suite | ~4 s     | 1920 × 1080 |

---

## 🛠️ Tech Stack

- **[Remotion](https://remotion.dev)** — React-based video renderer
- **[React 19](https://react.dev)** — UI component framework
- **[TypeScript](https://www.typescriptlang.org)** — Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling
- **[Zod](https://zod.dev)** — Schema validation for composition props
- **[Lucide React](https://lucide.dev)** — Icon library

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Myvideo.git
cd Myvideo

# Install dependencies
npm install
```

### Development

```bash
# Launch the Remotion Studio preview
npm run dev
```

The Remotion Studio will open at `http://localhost:3000` where you can preview, scrub through, and live-edit all compositions.

### Rendering

```bash
# Render a specific composition
npx remotion render <CompositionId>

# Examples
npx remotion render MarketingVideo
npx remotion render ExpenseIQ
npx remotion render Clix
npx remotion render Ore
```

> **Tip:** Use `npx remotion render --help` to explore additional flags such as `--codec`, `--quality`, and `--output`.

---

## 📁 Project Structure

```
Myvideo/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── Clix/             # Clix AI video composition
│   ├── ExpenseIQ/        # ExpenseIQ video composition
│   ├── Ore/              # Ore AI video composition
│   ├── MarketingVideo.tsx # Portfolio marketing video
│   ├── Root.tsx          # Remotion composition registry
│   ├── index.css         # Global styles
│   └── index.ts          # Entry point
├── remotion.config.ts    # Remotion configuration
├── tsconfig.json         # TypeScript configuration
├── package.json
└── README.md
```

---

## 📜 Available Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Remotion Studio for live preview |
| `npm run build`   | Bundle the project for production          |
| `npm run lint`    | Run ESLint & TypeScript type-check         |
| `npm run upgrade` | Upgrade Remotion to the latest version     |

---

## 🔧 Configuration

Remotion settings are managed in [`remotion.config.ts`](remotion.config.ts). Refer to the [Remotion Configuration Docs](https://www.remotion.dev/docs/config) for all available options.

---

## 📚 Resources

- [Remotion Documentation](https://www.remotion.dev/docs/the-fundamentals) — Learn the fundamentals
- [Remotion GitHub](https://github.com/remotion-dev/remotion) — Source code & issues
- [Remotion Discord](https://discord.gg/6VzzNDwUwV) — Community support

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using <a href="https://remotion.dev">Remotion</a></sub>
</div>
