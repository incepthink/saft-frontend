# Lovable Design Prompt — ListingDetailPage (Left Column Redesign)

## Context

This is a SAFT (Simple Agreement for Future Tokens) marketplace called **SAFTY**, built on Canton Chain.
The listing detail page lets users understand a token deal, see their position, and buy tokens.

**Stack:** React 18 + TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Recharts (for the vesting chart).
**Theme:** Dark (near-black background `bg-background`), cyan primary accent, CSS variables via shadcn.

---

## Current Two-Column Layout (DO NOT CHANGE THIS STRUCTURE)

```
[ Left column — flex-1, space-y-8 ]   [ Right column — w-[380px] sticky ]
                                        SwapCard (buy/sell widget)
  Section A — Project Details
  Section B — Token Details
  Section C — Your Position (conditional)
  Section D — Token Holders
```

The right column (SwapCard) must not be touched. Only redesign the **left column sections**.

---

## Current Design — Section by Section

### Section A — Project Details

**Container:** `rounded-xl border border-border bg-card p-6`

**Header row** (`flex items-start gap-4 mb-4`):
- Left: `h-16 w-16 rounded-xl bg-secondary` box displaying a **text emoji** (e.g. "🎮")
- Right:
  - Row: `<h1>` project name (font-display, 2xl, bold) + two `<Badge variant="outline">` inline:
    - Status badge — colored green/cyan/muted depending on LIVE / UPCOMING / ENDED
    - Category badge — neutral secondary style
  - `<p>` short description text in `text-muted-foreground`
  - `<a>` website link with `ExternalLink` icon (lucide), `text-primary hover:underline`

**Stats grid** (`grid grid-cols-2 gap-3 mt-6`):
Each stat is a `rounded-lg bg-muted px-4 py-3 flex justify-between`:
- Label: `text-sm text-muted-foreground`
- Value: `text-sm font-medium text-foreground`

Current stats shown: **Token** (ticker), **TGE Date**

---

### Section B — Token Details

**Container:** `rounded-xl border border-border bg-card p-6`

**Header:** `font-display font-semibold text-lg mb-4` — "Token Details"

**Stats grid** (`grid grid-cols-2 gap-3 mb-6`):
Same muted pill style as Section A. Stats shown:
- **Token** (safty_ticker, e.g. "sSANIME") — plain text value
- **Token Price** — value in `text-sm font-semibold text-primary`
- **1 sSANIME** = "100 ANIME" — ratio label
- **Total Allocation** — e.g. "416,667 sSANIME"
- **Accepted** — shows a USDC token logo (`<img>` 20x20 rounded-full)

**Sale Progress Bar** (`mb-6`):
- Top row: label "Sale Progress" (muted) + "X / Y sSANIME" (font-medium) justified apart
- Bar: `h-3 rounded-full bg-secondary overflow-hidden` with inner `div` width % via inline style, cyan gradient fill `hsl(193,70%,35%) → hsl(193,100%,55%)`
- Below bar: "X% Filled" in `text-xs text-muted-foreground`

**VestingChart component** (Recharts AreaChart):
- Renders only when user holds tokens; otherwise shows the protocol-level vesting schedule
- X-axis: month labels (e.g. "Jul '25", "Jan '26") rotated 45°
- Y-axis: token amounts formatted as K/M
- Two reference lines: TGE (dashed, labeled "TGE X%") and Lock End (dashed)
- Area fill: green gradient (`hsl(142,71%,45%)` → transparent)
- Tooltip on hover showing date + tokens released
- No chart title or explanation text currently

---

### Section C — Your Position (only shown when wallet connected AND user holds tokens)

**Container:** `rounded-xl border border-border bg-card p-6`

**Header:** "Your Position in {safty_ticker}" (`font-display font-semibold text-lg mb-4`)

**Stats grid** (`grid grid-cols-2 gap-4 mb-6`):
Each card is `rounded-lg bg-muted p-4`:
- **Tokens Held** — label `text-xs text-muted-foreground mb-1`, value `font-display font-bold text-lg`
- **USD Value** — same style, prefixed with `$`

**Release Schedule table** (`h4` label "Your Release Schedule", then `overflow-x-auto`):
Currently only shows **one row** — the next upcoming release:
- Columns: Date | {safty_ticker} | {ticker} Released
- Row highlight: plain, no special style
- Only the `nextReleaseRow` is rendered (single row table)

---

### Section D — Token Holders

**Container:** `rounded-xl border border-border bg-card p-6`

**Header:** "Token Holders — {ticker} SAFT" + subtitle "Wallets holding SAFTY tokens for this deal" in muted text

**Table** (`w-full text-sm`):
- Columns: **Wallet** | **SAFTY Tokens**
- Each row: `border-b border-border/50`
- Current user's row: `bg-primary/10 ring-1 ring-inset ring-primary/30` highlight, with "(You)" label in `text-xs text-primary` after the truncated wallet address
- Wallet shown as truncated Canton party ID via `truncatePartyId()` in `font-mono`

---

## What Needs to Be Better

The current design is functional but feels flat and generic. Every section looks the same (white card, muted grid rows). The user has to read carefully to extract the key information. Improve the left column with these goals:

1. **Visual hierarchy** — the most important info (price, TGE date, raise progress, your holdings) must stand out at a glance without reading every label.

2. **Section A** — The emoji-in-a-box logo feels cheap. Give it better treatment. The stat grid (only 2 stats) wastes space — consider integrating key stats into the header area itself as a compact info strip.

3. **Section B** — The stats grid and progress bar feel disconnected from each other and from the vesting chart. Unify them. The progress bar should feel more impactful (it's the key commercial signal). The vesting chart needs a title/explainer so users understand what they're looking at.

4. **Section C** — This is the most personalized section and should feel special/premium. A flat muted card grid doesn't convey importance. The next unlock date is critical info — surface it prominently, not buried in a minimal table.

5. **Section D** — The holders table is fine structurally. Improve spacing, maybe add rank numbers, make the "(You)" highlight feel more polished.

**Do NOT:**
- Change any component logic or data fetching
- Modify the SwapCard or right column
- Change the overall two-column layout
- Remove any existing information
- Add new data fields that don't exist in the current props

**Only change:** Tailwind utility classes, layout/spacing within each card, and shadcn/ui component variants to make the existing information look better.
