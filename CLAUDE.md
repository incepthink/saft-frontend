# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:8080)
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # Run ESLint
npm run preview    # Preview production build
npm run test       # Run Vitest (single run)
npm run test:watch # Run Vitest in watch mode
```

## Architecture

**SAFTY** is a SAFT (Simple Agreement for Future Tokens) marketplace frontend built on the Canton Chain blockchain. Users can browse token deals, invest in listings, track portfolios, and view vesting schedules.

**Stack:** React 18 + TypeScript, Vite + SWC, React Router v6, React Query v5, shadcn/ui + Radix UI, Tailwind CSS.

### Routing

```
/                → ExplorePage         (public listing browser)
/listing/:id     → ListingDetailPage   (token details + vesting)
/portfolio       → PortfolioPage       (requires wallet connection)
/submit          → SubmitPage          (new listing form)
```

### State Management

- **`WalletContext`** (`src/contexts/WalletContext.tsx`) — global Canton wallet state (connection, party IDs). Access via `useWallet()`.
- **React Query** — QueryClient is configured in `App.tsx` for async data fetching. Currently the app uses static mock data in `src/data/listings.ts`.
- **Local `useState`** — UI-level state (filters, modals).

### Canton Blockchain Integration

The app integrates with `@canton-network/dapp-sdk` (v0.24):
- `src/hooks/useConnect.ts` — wraps Canton SDK wallet connection with `sdk.onStatusChanged()`
- `src/hooks/useAccounts.ts` — fetches user accounts via `sdk.onAccountsChanged()`
- `WalletContext` exposes `partyId`, `isConnected`, `connect()`, `disconnect()`

Portfolio page guards against unauthenticated access by checking `isConnected` from `useWallet()`.

### Data Layer

All data currently lives in `src/data/listings.ts` as static mock data:
- `listings[]` — token offerings with vesting parameters
- `userPositions[]` — mock portfolio holdings
- `generateReleaseSchedule()` / `generateUserReleaseSchedule()` — vesting timeline calculators
- `truncatePartyId()` — formats Canton party IDs for display

The `Listing` type includes: `tokenPrice`, `fdv`, `tgeDate`, `tgeUnlockPercent`, `lockPeriodMonths`, `releaseDurationMonths` — these drive vesting chart rendering in `ListingDetailPage`.

### Path Alias

`@` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### UI Components

shadcn/ui components live in `src/components/ui/`. Add new shadcn components with:
```bash
npx shadcn-ui@latest add <component>
```

The theme uses cyan as the primary color with a near-black dark background. CSS variables are defined in `src/index.css`.
