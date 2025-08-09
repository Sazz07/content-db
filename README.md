## Content Admin Dashboard

A responsive, modern admin dashboard for managing and analyzing content (e.g., blog posts). It demonstrates component-driven UI, state management with React Context, form validation, and data visualization with Recharts. Built with Next.js App Router and TypeScript.

### Live Demo

- Live URL: REPLACE_WITH_YOUR_DEPLOYED_LINK (e.g., `https://content-db.vercel.app`)

If you need help deploying, see the Deployment section below.

### Tech Stack

- Framework: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4, Radix UI primitives, shadcn-style UI components
- Forms & Validation: react-hook-form, zod
- Charts: Recharts
- Date utilities: date-fns
- Icons: lucide-react

### Features (Meets the Brief)

- Articles Table
  - Displays Title, Author, Published Date, Views, Likes, Comments, Status
  - Sort by Views, Likes, Comments, or Published Date (asc/desc)
  - Pagination for large datasets
  - Inline role-based Actions (Edit) visible to Admin/Editor only
- Filtering & Search
  - Filter by Author
  - Filter by Date Range (from/to)
  - Case-insensitive Search by Title
  - Debounced search for better performance
- Performance Graph
  - Area chart of article views over time (Recharts)
  - Toggle between Daily and Monthly views
  - Graph reacts to current dashboard filters
- Edit Article Modal
  - Edit Title, Content, Status (Published/Draft)
  - Form validation with zod
  - Simulated save (mock API delay) with success message
- Auth & Roles (Bonus)
  - Fake login with token in localStorage
  - Roles: admin, editor (controls UI like edit actions)

### Demo Accounts

- Admin: `admin@example.com` / `admin123`
- Editor: `editor@example.com` / `editor123`

### Project Structure

- `app/` – Next.js App Router entry, layout, and page
- `components/` – UI and feature components (table, filters, chart, modal, etc.)
- `components/ui/` – Reusable, accessible UI primitives
- `contexts/` – `AuthProvider` and `DashboardProvider` for app state
- `lib/` – Mock data, utilities, and zod validations
- `public/` – Static assets

### Scripts

- `pnpm dev` – Start dev server with Turbopack
- `pnpm build` – Build for production
- `pnpm start` – Run built app
- `pnpm lint` – Lint the codebase

### Requirements Mapping

- React + TypeScript: Implemented
- Mock data/API: Implemented in `lib/mock-data.ts`
- Dashboard table: Implemented in `components/articles-table.tsx`
- Filters (author, date), search, sorting, pagination: Implemented in `components/dashboard-filters.tsx` and context logic
- Performance chart with daily/monthly toggle: Implemented in `components/performance-chart.tsx`
- Edit modal with validation and success: Implemented in `components/edit-article-modal.tsx`
- Bonus: Context API state, debounced inputs, fake login with roles

---

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- pnpm (recommended) or npm/yarn

### 1) Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn
```

### 2) Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open `http://localhost:3000` in your browser.

### 3) Sign in with demo credentials

- Admin: `admin@example.com` / `admin123`
- Editor: `editor@example.com` / `editor123`

### Production build

```bash
pnpm build
pnpm start

# or with npm
npm run build
npm start
```

### Linting

```bash
pnpm lint
```

---

## Deployment

The project is optimized for hosting on Vercel.

### One-click deploy

1. Push your repository to GitHub.
2. In Vercel, import your repo and select the Next.js framework.
3. Use default settings (no env vars required). Build command: `next build`.
4. Deploy. Replace the Live URL at the top of this README with your Vercel URL.

### Vercel CLI (optional)

```bash
npm i -g vercel
vercel
vercel --prod
```

No environment variables are required for this project.

---

## Notes & Design Choices

- State is managed with React Context (`DashboardProvider`, `AuthProvider`) to keep the example lightweight.
- Mock data is stored in `lib/mock-data.ts` and mutated locally to simulate API updates.
- Validation handled by zod, integrated via `@hookform/resolvers` + `react-hook-form`.
- Recharts used for performant, responsive charts. The chart consumes filtered data.
- Tailwind CSS v4 powers the design system; Radix primitives provide accessible interactions.

---

## License

No license specified. Add one if you plan to open-source.
